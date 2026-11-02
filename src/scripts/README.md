# Script programs

Editable JavaScript for the [ready-to-import sources](../../sources/README.md).

| File | Purpose |
| --- | --- |
| [lookup-notes.js](lookup-notes.js) | Show and edit a note beside a lookup result. |
| [page-citation.js](page-citation.js) | Format a reference from available page metadata. |
| [unit-converter.js](unit-converter.js) | Convert length, mass and temperature expressions. |
| [dictionary-api.js](dictionary-api.js) | Demonstrate a small English dictionary API integration. |
| [context-inspector.js](context-inspector.js) | Display the lookup context available to a Script. |

Each file runs inside Definer's Script source environment. The import bundles include the surrounding source settings; Lookup Notes also includes its [Recipe](../recipes/README.md).

For the Script API and editor, see the [Script guide](https://lumetrium.com/definer/wiki/sources/script/). After editing, run `npm run build` and `npm run check` from the repository root.
