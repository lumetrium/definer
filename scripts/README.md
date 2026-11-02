# Catalog tools

Small Node.js tools that assemble and check the customization import files. They read [catalog.json](../catalog.json), the [editable files](../src/README.md), and the included Recipe.

Use Node.js 22.23.x. Building, checking and running tests use Node's built-in TypeScript support and need no installed dependencies. For type checking, install the pinned development dependencies. Run these commands from the repository root:

```sh
npm ci --ignore-scripts
npm run typecheck
npm run build
npm run check
npm test
```

- `build` regenerates the JSON files in [sources](../sources/README.md) and [prompts](../prompts/README.md).
- `typecheck` checks the tools, examples and tests with TypeScript.
- `check` verifies that those files match their editable programs and templates.
- `test` runs the [catalog tests](../tests/README.md).

[catalog-cli.ts](catalog-cli.ts) is the command entrypoint; [catalog.service.ts](catalog.service.ts) handles the native Definer formats. [script-compiler.service.ts](script-compiler.service.ts) removes type annotations from Script programs before packaging them. [catalog.models.ts](catalog.models.ts) defines catalog entries.
