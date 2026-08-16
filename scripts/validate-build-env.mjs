import { existsSync, readFileSync } from 'node:fs'

const required = ['NUXT_PUBLIC_SUPABASE_URL', 'NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY']

const localEnv = {}

if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/u)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/u)
    if (!match || match[1] in localEnv) continue

    const value = match[2].trim()
    localEnv[match[1]] = value.replace(/^(['"])(.*)\1$/u, '$2')
  }
}

const missing = required.filter((name) => !(process.env[name]?.trim() || localEnv[name]?.trim()))

if (missing.length) {
  console.error(`Missing required build environment variables: ${missing.join(', ')}`)
  console.error('Configure them for the matching Cloudflare Pages Production and Preview environments, then rebuild.')
  process.exit(1)
}

console.log('Required DailyOps public build environment is configured.')
