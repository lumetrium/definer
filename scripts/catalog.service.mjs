import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { SOURCE_BUNDLE_SCHEMA, AI_PROMPT_SCHEMA, TEXT_SOURCE_ROLE, LUMETRIUM_PROVIDER, LUMETRIUM_MODEL } from './catalog.constants.mjs'

/** Assembles native Definer files from the readable catalog sources. */
export class CatalogService {
  root

  constructor(root) { this.root = path.resolve(root) }

  /** Resolves a catalog path without leaving the public package. */
  resolve(value) {
    if (typeof value !== 'string' || !/^[a-zA-Z0-9./_-]+$/.test(value) || value.split('/').some(part => !part || part === '.' || part === '..')) throw new Error('Invalid catalog path')
    const target = path.resolve(this.root, value)
    if (path.relative(this.root, target).startsWith('..') || path.isAbsolute(path.relative(this.root, target))) throw new Error('Catalog path escapes the package')
    return target
  }

  /** Produces deterministic native source and prompt files without writing. */
  async generate() {
    const catalog = JSON.parse(await readFile(path.join(this.root, 'catalog.json'), 'utf8'))
    if (catalog.version !== 1 || !Array.isArray(catalog.items)) throw new Error('Unsupported catalog')
    const files = new Map()
    const ids = new Set()
    for (const item of catalog.items) {
      if (!/^[a-z][a-z0-9-]+$/.test(item.id) || ids.has(item.id)) throw new Error('Invalid or duplicate catalog ID')
      ids.add(item.id)
      this.resolve(item.file)
      if (files.has(item.file)) throw new Error('Duplicate catalog output')
      const code = await readFile(this.resolve(item.source), 'utf8')
      const manifest = { schema: '', version: 1, appId: 'definer', appVersion: catalog.testedVersion, exportedAt: '2026-11-01T00:00:00.000Z' }
      let bundle
      if (item.kind === 'script') {
        if (!item.source.startsWith('src/scripts/') || !item.file.startsWith('sources/')) throw new Error('Invalid Script destination')
        const recipes = item.recipe ? [JSON.parse(await readFile(this.resolve(item.recipe), 'utf8'))] : []
        manifest.schema = SOURCE_BUNDLE_SCHEMA
        bundle = { manifest, sources: [{ source: { type: 'script', role: TEXT_SOURCE_ROLE, disabled: true, behavior: { prefetch: false, untrusted: true }, display: { name: item.name, desc: item.description }, options: { code } }, routines: [], recipes }] }
      } else if (item.kind === 'prompt') {
        if (!item.source.startsWith('src/prompts/') || !item.file.startsWith('prompts/')) throw new Error('Invalid prompt destination')
        manifest.schema = AI_PROMPT_SCHEMA
        bundle = { manifest, prompt: { name: item.name, template: code, settings: { provider: LUMETRIUM_PROVIDER, model: LUMETRIUM_MODEL } } }
      } else throw new Error('Unsupported catalog item')
      files.set(item.file, JSON.stringify(bundle, null, 2) + '\n')
    }
    return files
  }

  /** Writes only the catalog's native distribution files. */
  async build() {
    const files = await this.generate()
    for (const [name, content] of files) {
      const target = this.resolve(name)
      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, content)
    }
    return files.size
  }

  /** Checks that distribution files exactly match their editable sources. */
  async check() {
    const files = await this.generate()
    for (const [name, expected] of files) {
      if (await readFile(this.resolve(name), 'utf8') !== expected) throw new Error(`Rebuild the catalog: ${name}`)
    }
    return files.size
  }
}
