/** The public dictionary response fields used by the example. */
export interface DictionaryEntry {
  meanings?: {
    definitions?: { definition?: string }[]
  }[]
}
