import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { CatalogService } from '../scripts/catalog.service.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))

test('native files contain exactly the editable program or prompt', async () => {
  const service = new CatalogService(root)
  assert.equal(await service.check(), 8)
  const files = await service.generate()
  const catalog = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8'))
  for (const item of catalog.items) {
    const native = JSON.parse(files.get(item.file))
    const source = await readFile(service.resolve(item.source), 'utf8')
    if (item.kind === 'script') {
      assert.equal(native.sources[0].source.options.code, source)
      assert.equal(native.sources[0].source.disabled, true)
      assert.equal(native.sources[0].recipes.length, item.recipe ? 1 : 0)
    } else {
      assert.equal(native.prompt.template, source)
      assert.deepEqual(native.prompt.settings, { provider: 'lumetrium', model: 'fast' })
      assert.equal(native.prompt.fallbacks, undefined)
    }
  }
})

test('catalog paths cannot escape the package', () => {
  const service = new CatalogService(root)
  for (const candidate of ['../private.ts', '/etc/passwd', 'src/../../private.ts', 'src\\private.ts']) assert.throws(() => service.resolve(candidate))
})
