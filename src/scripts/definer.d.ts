/** Public Script APIs used by the examples in this folder. */
declare const definer: {
  lookup: {
    query: string
    language: string
    getVariable(name: string): string | null | undefined
  }
  output: {
    setHtml(html: string): void
    setCss(css: string): void
  }
  result: {
    getData(): Record<string, unknown>
    setData(data: Record<string, unknown>): void
    patchData(data: Record<string, unknown>): void
  }
  theme: {
    rgba(color: string, alpha: number): string
  }
}
