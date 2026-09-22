import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import crypto from 'node:crypto'
import { Pool } from 'pg'
import { geocode, getRestaurants } from './osm.js'

const app = express()
const port = Number(process.env.PORT || 3000)
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "false"
        ? false
        : { rejectUnauthorized: false },
      family: 4
    })
  : null
const memory = { users: new Map(), favorites: new Map(), visits: new Map(), reviews: new Map() }
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '32kb' }))

function sendError(response, status, errorCode, message) { response.status(status).json({ errorCode, message }) }
function requiredHash(request, response) { const value = request.body?.userIdHash; if (!value || typeof value !== 'string') { sendError(response, 400, 'USER_ID_REQUIRED', 'Ein aktives Profil ist erforderlich.'); return null } return value }
function restaurantKey(restaurant) { return `${restaurant.externalKey.osmType}:${restaurant.externalKey.osmId}` }
function hashUserId(userId) { return crypto.createHash('sha256').update(userId).digest('hex') }
function normalizeRestaurantKey(value) { return String(value).includes(':') ? String(value) : `NODE:${value}` }
async function ensureRestaurantReference(restaurant) {
  if (!pool || !restaurant?.id) return
  const [osmType, osmId] = restaurant.id.split(':')
  await pool.query(`INSERT INTO restaurant_references (restaurant_key, osm_type, osm_id, name, address, cuisines) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (restaurant_key) DO UPDATE SET name = EXCLUDED.name, address = EXCLUDED.address, cuisines = EXCLUDED.cuisines, updated_at = NOW()`, [restaurant.id, osmType, Number(osmId), restaurant.name, restaurant.address, restaurant.cuisine ? [restaurant.cuisine] : []])
}


app.post('/api/v1/profiles', async (request, response) => {
  const { name, userId } = request.body || {}
  if (!name || typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 80) return sendError(response, 400, 'INVALID_NAME', 'Bitte gib einen gültigen Namen ein.')
  const generatedUserId = userId || `FM${crypto.randomBytes(5).toString('hex').toUpperCase()}`
  const userIdHash = hashUserId(generatedUserId)
  if (pool) await pool.query('INSERT INTO users (user_id_hash, name) VALUES ($1, $2) ON CONFLICT (user_id_hash) DO UPDATE SET name = EXCLUDED.name', [userIdHash, name.trim()])
  else memory.users.set(userIdHash, { userIdHash, name: name.trim() })
  response.status(201).json({ userId: generatedUserId, userIdHash, name: name.trim() })
})

app.post('/api/v1/profiles/load', async (request, response) => {
  const { userId } = request.body || {}
  if (!userId || !/^[A-Z0-9]{12}$/.test(userId)) return sendError(response, 400, 'INVALID_USER_ID', 'Die UserID ist ungültig.')
  const userIdHash = hashUserId(userId)
  const user = pool ? (await pool.query('SELECT user_id_hash AS "userIdHash", name FROM users WHERE user_id_hash = $1', [userIdHash])).rows[0] : memory.users.get(userIdHash)
  if (!user) return sendError(response, 404, 'USER_NOT_FOUND', 'UserID nicht gefunden.')
  response.json({ ...user, userIdHash })
})

app.get('/api/v1/restaurants', async (request, response) => {
  const latitude = Number(request.query.latitude)
  const longitude = Number(request.query.longitude)
  const radius = Number(request.query.radius || 5000)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return sendError(response, 400, 'LOCATION_REQUIRED', 'latitude und longitude sind erforderlich.')
  if (!Number.isFinite(radius) || radius < 100 || radius > 10000) return sendError(response, 400, 'INVALID_RADIUS', 'Der Radius muss zwischen 100 und 10000 Metern liegen.')
  try {
    const restaurants = await getRestaurants(latitude, longitude, radius)
    for (const restaurant of restaurants) await ensureRestaurantReference(restaurant)
    response.json(restaurants)
  } catch (error) {
    console.error('Restaurant search failed:', error.message)
    sendError(response, 502, 'OSM_UNAVAILABLE', 'Restaurantdaten konnten momentan nicht geladen werden.')
  }
})

app.post('/api/v1/recommendations', async (request, response) => {
  const userIdHash = requiredHash(request, response); if (!userIdHash) return
  const { mood, occasion, location = {}, filters = {} } = request.body || {}
  if (!mood && !occasion) return sendError(response, 400, 'SEARCH_CRITERIA_REQUIRED', 'Bitte wähle eine Stimmung oder einen Anlass.')
  if (!location.coordinates && !location.label) return sendError(response, 400, 'LOCATION_REQUIRED', 'Ein Standort ist erforderlich.')
  try {
    const coordinates = location.coordinates || await geocode(location.label)
    let restaurants = await getRestaurants(coordinates.latitude, coordinates.longitude, Number(filters.radius || 5000))
    if (Array.isArray(filters.cuisines) && filters.cuisines.length) restaurants = restaurants.filter((restaurant) => filters.cuisines.some((cuisine) => restaurant.cuisine === cuisine || restaurant.name.toLowerCase().includes(cuisine)))
    if (filters.onlyOpen) restaurants = restaurants.filter((restaurant) => restaurant.open === true)
    for (const restaurant of restaurants) await ensureRestaurantReference(restaurant)
    const recommendations = restaurants.map((restaurant, index) => ({ restaurant, score: Math.max(0, 100 - index), distance: restaurant.distance, reasons: [mood ? `passt zur Stimmung ${mood}` : `passt zum Anlass ${occasion}`] })).slice(0, 50)
    response.json({ recommendations, userIdHash })
  }   catch (error) {
    console.error('Restaurant search failed:', error)

    sendError(
      response,
      502,
      'OSM_UNAVAILABLE',
      error.message || 'Restaurantdaten konnten momentan nicht geladen werden.'
    )
  }
})
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      database: true
    });

  } catch (error) {
    
    res.status(500).json({
      status: "ok",
      database: false
    });
  }
});
app.post('/api/v1/favorites', async (request, response) => { const userIdHash = requiredHash(request, response); if (!userIdHash) return; const rawKey = request.body?.restaurantKey; if (!rawKey) return sendError(response, 400, 'RESTAURANT_REQUIRED', 'Ein Restaurant ist erforderlich.'); const key = await ensureRestaurantReference(rawKey) || normalizeRestaurantKey(rawKey); if (pool) { const existing = await pool.query('SELECT id FROM favorites WHERE user_id_hash = $1 AND restaurant_key = $2', [userIdHash, key]); if (existing.rowCount) { await pool.query('DELETE FROM favorites WHERE user_id_hash = $1 AND restaurant_key = $2', [userIdHash, key]); return response.json({ favorite: false, restaurantKey: key }) } await pool.query('INSERT INTO favorites (user_id_hash, restaurant_key) VALUES ($1, $2)', [userIdHash, key]); return response.json({ favorite: true, restaurantKey: key }) } const current = memory.favorites.get(userIdHash) || new Set(); current.has(key) ? current.delete(key) : current.add(key); memory.favorites.set(userIdHash, current); response.json({ favorite: current.has(key), restaurantKey: key }) })
app.get('/api/v1/favorites', async (request, response) => { const userIdHash = request.query.userIdHash; if (pool) return response.json({ favorites: (await pool.query('SELECT restaurant_key AS "restaurantKey" FROM favorites WHERE user_id_hash = $1 ORDER BY created_at DESC', [userIdHash])).rows.map((row) => row.restaurantKey) }); response.json({ favorites: [...(memory.favorites.get(userIdHash) || [])] }) })
app.post('/api/v1/visits', async (request, response) => { const userIdHash = requiredHash(request, response); if (!userIdHash) return; const rawKey = request.body?.restaurantKey; if (!rawKey) return sendError(response, 400, 'RESTAURANT_REQUIRED', 'Ein Restaurant ist erforderlich.'); const key = await ensureRestaurantReference(rawKey) || normalizeRestaurantKey(rawKey); const visitedAt = new Date().toISOString(); if (pool) { await pool.query('INSERT INTO visits (user_id_hash, restaurant_key, visited_at) VALUES ($1, $2, $3)', [userIdHash, key, visitedAt]); return response.status(201).json({ visited: true, restaurantKey: key, visitedAt }) } const current = memory.visits.get(userIdHash) || new Set(); current.add(key); memory.visits.set(userIdHash, current); response.status(201).json({ visited: true, restaurantKey: key, visitedAt }) })
app.get('/api/v1/visits', async (request, response) => { const userIdHash = request.query.userIdHash; if (pool) return response.json({ visits: (await pool.query('SELECT DISTINCT ON (restaurant_key) restaurant_key AS "restaurantKey" FROM visits WHERE user_id_hash = $1 ORDER BY restaurant_key, visited_at DESC', [userIdHash])).rows.map((row) => row.restaurantKey) }); response.json({ visits: [...(memory.visits.get(userIdHash) || [])] }) })
app.post('/api/v1/reviews', async (request, response) => { const userIdHash = requiredHash(request, response); if (!userIdHash) return; const rawKey = request.body?.restaurantKey; const { rating, comment = null } = request.body || {}; if (!rawKey) return sendError(response, 400, 'RESTAURANT_REQUIRED', 'Ein Restaurant ist erforderlich.'); if (!Number.isInteger(rating) || rating < 1 || rating > 5) return sendError(response, 400, 'INVALID_RATING', 'Die Bewertung muss zwischen 1 und 5 Sternen liegen.'); const key = await ensureRestaurantReference(rawKey) || normalizeRestaurantKey(rawKey); if (pool) { const visit = await pool.query('SELECT id FROM visits WHERE user_id_hash = $1 AND restaurant_key = $2 LIMIT 1', [userIdHash, key]); if (!visit.rowCount) return sendError(response, 409, 'VISIT_REQUIRED', 'Bewertungen sind erst nach einem Besuch möglich.'); const result = await pool.query('INSERT INTO reviews (user_id_hash, restaurant_key, rating, comment) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id_hash, restaurant_key) DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, updated_at = NOW() RETURNING rating, comment, updated_at AS "updatedAt"', [userIdHash, key, rating, comment?.trim() || null]); return response.status(201).json(result.rows[0]) } if (!(memory.visits.get(userIdHash) || new Set()).has(key)) return sendError(response, 409, 'VISIT_REQUIRED', 'Bewertungen sind erst nach einem Besuch möglich.'); const review = { rating, comment: comment?.trim() || null, updatedAt: new Date().toISOString() }; const current = memory.reviews.get(userIdHash) || new Map(); current.set(key, review); memory.reviews.set(userIdHash, current); response.status(201).json(review) })

app.use((_request, response) => sendError(response, 404, 'NOT_FOUND', 'Die angeforderte Route wurde nicht gefunden.'))
app.use((error, _request, response, _next) => { console.error(error); sendError(response, 500, 'INTERNAL_ERROR', 'Ein unerwarteter Fehler ist aufgetreten.') })

app.listen(port, () => console.log(`Food-Mood API listening on http://localhost:${port}`))
