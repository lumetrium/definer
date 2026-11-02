import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { CatalogService } from '../scripts/catalog.service.ts'
import { ScriptHarnessService } from './script-harness.service.ts'

const files = await new CatalogService(fileURLToPath(new URL('../', import.meta.url))).generate()
const code = (name: string): string => JSON.parse(files.get(`sources/definer-source-${name}.json`)!).sources[0].source.options.code

test('compiled Unit Converter handles supported, incompatible and malformed queries', async () => {
  for (const [query, expected] of [
    ['10 km to mi', '6.213712 mi'], ['72 f to c', '22.222222 °C'],
    ['5 lb to kg', '2.267962 kg'], ['0 c to k', '273.15 k'],
    ['10 km to kg', 'Those units cannot be converted to each other.'],
    ['hello', 'No supported conversion found.'],
  ]) {
    const runtime = new ScriptHarnessService()
    runtime.query = query
    await runtime.run(code('unit-converter'))
    assert.equal(runtime.element('.converter__result').textContent, expected)
  }
})

test('compiled Lookup Notes restores and saves a note', async () => {
  const runtime = new ScriptHarnessService()
  runtime.data = { note: 'Remember this word' }
  await runtime.run(code('lookup-notes'))
  const textarea = runtime.element('.lookup-notes textarea')
  assert.equal(textarea.value, 'Remember this word')
  textarea.value = 'A revised note'
  runtime.element('.lookup-notes button').click!()
  assert.equal(runtime.data.note, 'A revised note')
  assert.match(String(runtime.data.updatedAt), /^\d{4}-\d{2}-\d{2}T/)
  assert.equal(runtime.element('.lookup-notes [role="status"]').textContent, 'Saved with this lookup.')
})

test('compiled Page Citation formats metadata and switches to Markdown', async () => {
  const runtime = new ScriptHarnessService()
  runtime.variables = { page_title: 'An [example]', url: 'https://example.com/article', page_og_site_name: 'Example', page_last_modified: '2026-01-01' }
  await runtime.run(code('page-citation'))
  const output = runtime.element('.citation-builder pre')
  assert.equal(output.textContent, 'An [example]. Example. Last modified 2026-01-01. https://example.com/article')
  runtime.element('.citation-builder button:markdown').click!()
  assert.equal(output.textContent, '[An \\[example\\]](https://example.com/article)')
})

test('compiled Dictionary API uses saved entries and fetches missing definitions', async () => {
  const entries = [{ meanings: [{ definitions: [{ definition: 'A desire to learn.' }] }] }]
  const saved = new ScriptHarnessService()
  saved.data = { query: saved.query, entries }
  await saved.run(code('dictionary-api'))
  assert.equal(saved.element('.dictionary-result__definition').textContent, 'A desire to learn.')
  assert.equal(saved.element('.dictionary-result__status').textContent, 'Loaded from saved data')
  const fresh = new ScriptHarnessService()
  let calls = 0
  fresh.request = async url => { calls += 1; assert.equal(url, 'https://api.dictionaryapi.dev/api/v2/entries/en/curiosity'); return Response.json(entries) }
  await fresh.run(code('dictionary-api'))
  assert.equal(calls, 1)
  assert.deepEqual(fresh.data.entries, entries)
  assert.equal(fresh.element('.dictionary-result__definition').textContent, 'A desire to learn.')
})

test('compiled Dictionary API shows an unsuccessful request', async () => {
  const runtime = new ScriptHarnessService()
  runtime.request = async () => new Response('', { status: 404 })
  await runtime.run(code('dictionary-api'))
  assert.equal(runtime.element('.dictionary-result__status').textContent, 'Could not load this definition.')
  assert.equal(runtime.element('.dictionary-result__definition').textContent, 'Dictionary request failed (404)')
})

test('compiled Context Inspector includes available variables and limits the page preview', async () => {
  const runtime = new ScriptHarnessService()
  runtime.variables = { page_text: 'x'.repeat(800), sentence: 'A sentence.' }
  await runtime.run(code('context-inspector'))
  const context = JSON.parse(runtime.element('.context-inspector pre').textContent)
  assert.equal(context.query, 'curiosity')
  assert.equal(context.sentence, 'A sentence.')
  assert.equal(context.url, null)
  assert.equal(context.pageTextPreview.length, 500)
})
