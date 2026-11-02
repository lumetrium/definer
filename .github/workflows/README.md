# Catalog checks

[check.yml](check.yml) checks the customization catalog on pushes and pull requests. It uses Node.js 22 to compare the generated import files with their editable sources and run the catalog tests.

The workflow has read-only repository permissions and needs no secrets. To run the same checks locally, use these commands from the repository root:

```sh
npm run check
npm test
```

See the [catalog tools](../../scripts/README.md) for rebuilding the import files after an edit.
