import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const publicRoot = join(root, '.output', 'public')
const errors = []

if (!existsSync(publicRoot)) {
  console.error('Generated site not found. Run npm run build before npm run check:links.')
  process.exit(1)
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function targetExists(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, '')
  const target = join(publicRoot, decoded)
  return existsSync(target) || existsSync(join(target, 'index.html')) || existsSync(`${target}.html`)
}

const htmlFiles = walk(publicRoot).filter((path) => path.endsWith('.html'))

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const attributes = html.matchAll(/(?:href|src)=["']([^"']+)["']/g)

  for (const [, rawTarget] of attributes) {
    if (!rawTarget || rawTarget.startsWith('#') || /^(?:mailto:|tel:|data:|https?:\/\/)/i.test(rawTarget)) continue

    const url = new URL(rawTarget, 'https://dailyopsstudio.com/')
    if (url.pathname.startsWith('/_ipx/')) continue

    if (!targetExists(url.pathname)) {
      errors.push(`${file.slice(publicRoot.length + 1)} -> ${rawTarget}`)
    }
  }
}

if (errors.length) {
  console.error(`Internal link check failed:\n- ${[...new Set(errors)].join('\n- ')}`)
  process.exit(1)
}

console.log(`Internal links valid across ${htmlFiles.length} generated HTML files.`)
