# Script programs

Editable TypeScript for the [ready-to-import sources](../../sources/README.md).

| File | Purpose |
| --- | --- |
| [lookup-notes.ts](lookup-notes.ts) | Show and edit a note beside a lookup result. |
| [page-citation.ts](page-citation.ts) | Format a reference from available page metadata. |
| [unit-converter.ts](unit-converter.ts) | Convert length, mass and temperature expressions. |
| [dictionary-api.ts](dictionary-api.ts) | Demonstrate a small English dictionary API integration. |
| [context-inspector.ts](context-inspector.ts) | Display the lookup context available to a Script. |

The build removes type annotations and embeds executable JavaScript in the import bundles. Those bundles include the surrounding source settings; Lookup Notes also includes its [Recipe](../recipes/README.md). Use a bundle to import an example into Definer.

[definer.d.ts](definer.d.ts) describes the Script APIs used here; [dictionary-api.types.ts](dictionary-api.types.ts) describes the dictionary response fields used by that example.

For the Script API and editor, see the [Script guide](https://lumetrium.com/definer/wiki/sources/script/). After editing, run `npm run typecheck`, `npm run build` and `npm test` from the repository root. See the [catalog tools](../../scripts/README.md) for the required Node.js version and development dependencies.
