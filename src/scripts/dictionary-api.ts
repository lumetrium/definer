import type { DictionaryEntry } from './dictionary-api.types.ts'

const query = definer.lookup.query.trim()
const saved = definer.result.getData()

definer.output.setHtml(`
	<article class="dictionary-result">
		<h1></h1>
		<p class="dictionary-result__status">Loading definition…</p>
		<p class="dictionary-result__definition"></p>
	</article>
`)
definer.output.setCss(`
	.dictionary-result { padding: 18px; }
	.dictionary-result h1 { margin: 0 0 8px; }
	.dictionary-result__status { opacity: 0.65; }
	.dictionary-result__definition { line-height: 1.55; }
`)

const heading = document.querySelector<HTMLElement>('.dictionary-result h1')!
const status = document.querySelector<HTMLElement>('.dictionary-result__status')!
const definition = document.querySelector<HTMLElement>('.dictionary-result__definition')!
heading.textContent = query

try {
	const loadedFromSaved = saved.query === query && Array.isArray(saved.entries)
	let entries = loadedFromSaved ? saved.entries as DictionaryEntry[] : null
	if (!Array.isArray(entries)) {
		const endpoint =
			`https://api.dictionaryapi.dev/api/v2/entries/en/` +
			encodeURIComponent(query)
		const response = await fetch(endpoint)
		if (!response.ok) {
			throw new Error(`Dictionary request failed (${response.status})`)
		}

		entries = await response.json() as DictionaryEntry[]
		definer.result.setData({ query, entries })
	}

	const firstDefinition = entries?.[0]?.meanings?.[0]?.definitions?.[0]?.definition
	status.textContent = loadedFromSaved ? 'Loaded from saved data' : ''
	definition.textContent = firstDefinition ?? 'No definition was returned.'
} catch (error) {
	status.textContent = 'Could not load this definition.'
	definition.textContent =
		error instanceof Error ? error.message : String(error)
}
