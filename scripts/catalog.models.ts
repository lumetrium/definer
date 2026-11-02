/** One editable customization and its native import file. */
export interface CatalogItem {
  id: string
  kind: 'script' | 'prompt'
  name: string
  description: string
  source: string
  file: string
  recipe?: string
}

/** Versioned catalog of Script sources and AI prompts. */
export interface Catalog {
  version: number
  testedVersion: string
  items: CatalogItem[]
}
