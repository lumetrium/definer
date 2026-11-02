# Sources

Ready-to-import Script sources for Definer. Each JSON file includes its JavaScript and source settings.

| Source | What it does |
| --- | --- |
| [Lookup Notes](definer-source-lookup-notes.json) | Keep a note with a lookup result and save it to a Collection with the included Recipe. |
| [Page Citation](definer-source-page-citation.json) | Prepare a plain-text or Markdown reference from page metadata. |
| [Unit Converter](definer-source-unit-converter.json) | Convert length, mass and temperature expressions. |
| [Dictionary API](definer-source-dictionary-api.json) | Look up English definitions through an external dictionary API. |
| [Context Inspector](definer-source-context-inspector.json) | Inspect the context available to a lookup when developing a source or reporting an issue. |

Download a JSON file, then open **Definer Options → Sources → New source → Constructor** and choose the file. Review the Script before enabling it; these sources are disabled by default. Script is experimental, and source and Recipe limits still apply.

For editing, see [the JavaScript files](../src/scripts/README.md). See the [source import guide](https://lumetrium.com/definer/wiki/sources/import-export/) for the full import flow.
