import * as nodeModule from 'node:module'

/** Removes erasable TypeScript annotations for Definer's JavaScript runtime. */
export class ScriptCompilerService {
  /** Preserves the program while removing type-only syntax; emits no source maps. */
  compile(source: string): string {
    // The pinned Node 22.7 declarations predate this API, available since Node 22.13.
    // Remove this type bridge when upgrading @types/node to a version declaring it.
    const stripTypes = Reflect.get(nodeModule, 'stripTypeScriptTypes') as (code: string, options: { mode: 'strip' }) => string
    return stripTypes(source, { mode: 'strip' })
  }
}
