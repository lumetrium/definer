import { fileURLToPath } from 'node:url'
import { CatalogService } from './catalog.service.ts'

const catalog = new CatalogService(fileURLToPath(new URL('../', import.meta.url)))
const command = process.argv[2]
if ((command !== 'build' && command !== 'check') || process.argv.length !== 3) throw new Error('Use: node scripts/catalog-cli.ts build|check')
console.log(`${command}: ${await catalog[command]()} native Definer files`)
