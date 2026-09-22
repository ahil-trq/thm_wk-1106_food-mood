const timeoutMs = 5000
const cache = new Map()

function getConfig() {
  return {
    overpassUrl: process.env.OVERPASS_API_URL || 'https://overpass-api.de/api/interpreter',
    nominatimUrl: process.env.NOMINATIM_API_URL || 'https://nominatim.openstreetmap.org',
  }
}

async function request(url, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, headers: { 'User-Agent': 'Food-Mood/1.0 (THM project)', ...(options.headers || {}) } })
    if (!response.ok) throw new Error(`OSM request failed with ${response.status}`)
    return response.json()
  } finally {
    clearTimeout(timeout)
  }
}

export async function geocode(label) {
  const { nominatimUrl } = getConfig()
  const key = `geocode:${label.trim().toLowerCase()}`
  const cached = cache.get(key)
  if (cached && cached.expiresAt > Date.now()) return cached.value
  const url = new URL('/search', nominatimUrl)
  url.searchParams.set('q', label)
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('limit', '1')
  const results = await request(url)
  if (!results[0]) throw new Error('Location not found')
  const value = { latitude: Number(results[0].lat), longitude: Number(results[0].lon), label: results[0].display_name }
  cache.set(key, { value, expiresAt: Date.now() + 10 * 60 * 1000 })
  return value
}

function distanceMeters(origin, latitude, longitude) {
  const earthRadius = 6371000
  const toRadians = (value) => value * Math.PI / 180
  const dLat = toRadians(latitude - origin.latitude)
  const dLon = toRadians(longitude - origin.longitude)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(origin.latitude)) * Math.cos(toRadians(latitude)) * Math.sin(dLon / 2) ** 2
  return Math.round(2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}

function openingState(openingHours) {
  if (!openingHours) return null
  const day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][new Date().getDay()]
  const match = openingHours.match(new RegExp(`${day}[^;]*?([0-9]{1,2}:[0-9]{2})-([0-9]{1,2}:[0-9]{2})`))
  if (!match) return null
  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()
  const parse = (value) => { const [hours, minutes] = value.split(':').map(Number); return hours * 60 + minutes }
  return current >= parse(match[1]) && current <= parse(match[2])
}

function normalizeElement(element, origin) {
  const tags = element.tags || {}
  const latitude = element.lat ?? element.center?.lat
  const longitude = element.lon ?? element.center?.lon
  if (!element.id || !tags.name || latitude == null || longitude == null) return null
  const amenity = tags.amenity === 'fast_food' ? 'FAST_FOOD' : tags.amenity === 'cafe' ? 'CAFE' : 'RESTAURANT'
  const cuisines = (tags.cuisine || '').split(';').map((value) => value.trim().toLowerCase()).filter(Boolean)
  return {
    id: `${String(element.type).toUpperCase()}:${element.id}`,
    name: tags.name,
    address: [tags['addr:street'], tags['addr:housenumber'], tags['addr:city']].filter(Boolean).join(' ') || null,
    cuisine: cuisines[0] || null,
    cuisines,
    amenity,
    open: openingState(tags.opening_hours),
    openingHours: tags.opening_hours || null,
    vegetarian: tags.diet_vegetarian === 'yes' ? 'YES' : 'UNKNOWN',
    vegan: tags.diet_vegan === 'yes' ? 'YES' : 'UNKNOWN',
    takeaway: tags.takeaway === 'yes' ? 'YES' : 'UNKNOWN',
    delivery: tags.delivery === 'yes' ? 'YES' : 'UNKNOWN',
    outdoorSeating: tags.outdoor_seating === 'yes' ? 'YES' : 'UNKNOWN',
    website: tags.website || null,
    phone: tags.phone || null,
    latitude,
    longitude,
    distance: distanceMeters(origin, latitude, longitude),
    rating: null,
    count: 0,
  }
}

export async function getRestaurants(latitude, longitude, radiusMeters = 5000) {
  const coordinates = { latitude, longitude }
  const { overpassUrl } = getConfig()
  const cacheKey = `restaurants:${coordinates.latitude}:${coordinates.longitude}:${radiusMeters}`
  const cached = cache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) return cached.value
  const query = `[out:json][timeout:5];(nwr[amenity~"^(restaurant|fast_food|cafe)$"](around:${radiusMeters},${coordinates.latitude},${coordinates.longitude}););out center tags;`
  const data = await request(overpassUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: query })
  const restaurants = data.elements.map((element) => normalizeElement(element, coordinates)).filter(Boolean)
  cache.set(cacheKey, { value: restaurants, expiresAt: Date.now() + 10 * 60 * 1000 })
  return restaurants
}
