/** Runs catalog JavaScript with deterministic Script APIs and a small DOM double. */
export class ScriptHarnessService {
  elements = new Map<string, { value: string, textContent: string, dataset: Record<string, string>, click?: () => void, addEventListener(event: string, callback: () => void): void }>()
  variables: Record<string, string> = {}
  data: Record<string, unknown> = {}
  query = 'curiosity'
  request = async (url: string): Promise<Response> => { throw new Error(`Unexpected request: ${url}`) }

  /** Gets an element whose saved click callback can be invoked by a test. */
  element(selector: string) {
    if (!this.elements.has(selector)) this.elements.set(selector, { value: '', textContent: '', dataset: {}, addEventListener(event, callback) { if (event === 'click') this.click = callback } })
    return this.elements.get(selector)!
  }

  /** Executes the generated JavaScript, including its top-level asynchronous work. */
  async run(code: string): Promise<void> {
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
    const runtime = {
      lookup: { query: this.query, language: 'en', getVariable: (name: string) => this.variables[name] },
      result: { getData: () => this.data, setData: (data: Record<string, unknown>) => { this.data = data }, patchData: (data: Record<string, unknown>) => Object.assign(this.data, data) },
      output: { setHtml: () => {}, setCss: () => {} },
      theme: { rgba: () => 'rgba(0,0,0,0.1)' },
    }
    const document = {
      querySelector: (selector: string) => this.element(selector),
      querySelectorAll: (selector: string) => ['plain', 'markdown'].map(format => {
        const button = this.element(`${selector}:${format}`)
        button.dataset.format = format
        return button
      }),
    }
    await new AsyncFunction('definer', 'document', 'fetch', code)(runtime, document, this.request)
  }
}
