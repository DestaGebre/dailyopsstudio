import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const errors = []

function readMarkdown(directory) {
  return readdirSync(directory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({ name, text: readFileSync(join(directory, name), 'utf8') }))
}

function frontmatter(file) {
  const normalizedText = file.text.replace(/\r\n?/g, '\n')
  const match = normalizedText.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    errors.push(`${file.name}: missing frontmatter`)
    return new Map()
  }

  const values = new Map()
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z][\w]*):\s*(.*)$/)
    if (field) values.set(field[1], field[2].replace(/^['"]|['"]$/g, ''))
  }
  return values
}

function requireFields(file, values, fields) {
  for (const field of fields) {
    if (!values.get(field)) errors.push(`${file.name}: missing ${field}`)
  }
}

const productFiles = readMarkdown(join(root, 'content', 'products'))
const productIds = new Set()

for (const file of productFiles) {
  const values = frontmatter(file)
  requireFields(file, values, [
    'title',
    'description',
    'category',
    'collection',
    'documentType',
    'productId',
    'status',
    'price',
    'currency'
  ])

  const productId = values.get('productId')
  if (productIds.has(productId)) errors.push(`${file.name}: duplicate productId ${productId}`)
  productIds.add(productId)

  if (!['draft', 'published', 'archived'].includes(values.get('status'))) {
    errors.push(`${file.name}: invalid product status`)
  }

  const image = values.get('image')
  if (image?.startsWith('/') && !existsSync(join(root, 'public', image))) {
    errors.push(`${file.name}: image does not exist: ${image}`)
  }

  const etsyUrl = values.get('etsyUrl')
  if (etsyUrl && !/^https:\/\/(?:www\.)?etsy\.com\//i.test(etsyUrl)) {
    errors.push(`${file.name}: etsyUrl must be an HTTPS Etsy URL`)
  }
}

const blogFiles = readMarkdown(join(root, 'content', 'blog'))
let featuredPosts = 0

for (const file of blogFiles) {
  const values = frontmatter(file)
  requireFields(file, values, ['title', 'description', 'date', 'category', 'author', 'status'])

  if (!['draft', 'published', 'archived'].includes(values.get('status'))) {
    errors.push(`${file.name}: invalid blog status`)
  }
  if (values.get('featured') === 'true' && values.get('status') === 'published') featuredPosts += 1
  if (Number.isNaN(Date.parse(values.get('date')))) errors.push(`${file.name}: invalid publication date`)
  if (/^# /m.test(file.text.replace(/^---\n[\s\S]*?\n---/, ''))) {
    errors.push(`${file.name}: body must not duplicate the page H1`)
  }

  const relatedProductId = values.get('relatedProductId')
  if (relatedProductId && !/^P\d{3}$/.test(relatedProductId)) {
    errors.push(`${file.name}: invalid relatedProductId ${relatedProductId}`)
  }
}

if (featuredPosts !== 1) errors.push(`Expected exactly one published featured blog post; found ${featuredPosts}`)

if (errors.length) {
  console.error(`Content validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`Content valid: ${productFiles.length} products and ${blogFiles.length} blog posts.`)
