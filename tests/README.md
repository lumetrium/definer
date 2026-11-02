# Catalog tests

These tests check that customization import files contain executable JavaScript built from the TypeScript examples or the exact Liquid template, preserve the included Recipe, and select the intended source and AI settings. They also check catalog paths and run all five Script programs with local lookup, DOM and network doubles.

Run them from the repository root with Node.js 22.23.x:

```sh
npm test
```

Use `npm run check` to compare all generated import files with the [editable files](../src/README.md). The same checks run in [GitHub Actions](../.github/workflows/README.md).
