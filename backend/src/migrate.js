import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Pool } from 'pg'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required for migrations.')
  process.exit(1)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../')
const migrations = [
  '001_initial.sql',
  '002_geoapify_external_id.sql',
]
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto')
for (const migrationFile of migrations) {
  const migration = await fs.readFile(path.join(root, 'database/migrations', migrationFile), 'utf8')
  await pool.query(migration)
}
await pool.end()
console.log('Database migrations applied.')
