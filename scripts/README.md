# Catalog tools

Small Node.js tools that assemble and check the customization import files. They read [catalog.json](../catalog.json), the [editable files](../src/README.md), and the included Recipe.

Use Node.js 22 or later. No dependencies need to be installed. Run these commands from the repository root:

```sh
npm run build
npm run check
npm test
```

- `build` regenerates the JSON files in [sources](../sources/README.md) and [prompts](../prompts/README.md).
- `check` verifies that those files match their editable programs and templates.
- `test` runs the [catalog tests](../tests/README.md).

[catalog-cli.mjs](catalog-cli.mjs) is the command entrypoint; [catalog.service.mjs](catalog.service.mjs) handles the native Definer formats.
