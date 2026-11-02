import { fileURLToPath } from 'node:url'
import { CatalogService } from './catalog.service.mjs'

const catalog = new CatalogService(fileURLToPath(new URL('../', import.meta.url)))
const command = process.argv[2]
if (!['build', 'check'].includes(command) || process.argv.length !== 3) throw new Error('Use: node scripts/catalog-cli.mjs build|check')
console.log(`${command}: ${await catalog[command]()} native Definer files`)
