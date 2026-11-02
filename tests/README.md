# Catalog tests

These tests check that the customization import files contain the exact editable JavaScript or Liquid template, preserve the included Recipe, and select the intended source and AI settings. They also check that catalog paths stay inside the package.

Run them from the repository root with Node.js 22 or later:

```sh
npm test
```

Use `npm run check` to compare all generated import files with the [editable files](../src/README.md). The same checks run in [GitHub Actions](../.github/workflows/README.md).
