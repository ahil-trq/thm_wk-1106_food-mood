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

function normalizeElement(element) {
  const tags = element.tags || {}
  const latitude = element.lat ?? element.center?.lat
  const longitude = element.lon ?? element.center?.lon
  if (!element.id || !tags.name || latitude == null || longitude == null) return null
  const amenity = tags.amenity === 'fast_food' ? 'FAST_FOOD' : tags.amenity === 'cafe' ? 'CAFE' : 'RESTAURANT'
  const cuisines = (tags.cuisine || '').split(';').map((value) => value.trim().toLowerCase()).filter(Boolean)
  return {
    externalKey: { osmType: String(element.type).toUpperCase(), osmId: element.id },
    name: tags.name,
    address: [tags['addr:street'], tags['addr:housenumber'], tags['addr:city']].filter(Boolean).join(' ') || null,
    cuisines,
    amenity,
    openState: tags.opening_hours ? 'UNKNOWN' : 'UNKNOWN',
    openingHours: tags.opening_hours || null,
    vegetarian: tags.diet_vegetarian === 'yes' ? 'YES' : 'UNKNOWN',
    vegan: tags.diet_vegan === 'yes' ? 'YES' : 'UNKNOWN',
    takeaway: tags.takeaway === 'yes' ? 'YES' : 'UNKNOWN',
    delivery: tags.delivery === 'yes' ? 'YES' : 'UNKNOWN',
    outdoorSeating: tags.outdoor_seating === 'yes' ? 'YES' : 'UNKNOWN',
    website: tags.website || null,
    phone: tags.phone || null,
    coordinates: { latitude, longitude },
    averageRating: null,
    ratingCount: 0,
  }
}

export async function findRestaurants(coordinates, radiusMeters) {
  const { overpassUrl } = getConfig()
  const cacheKey = `restaurants:${coordinates.latitude}:${coordinates.longitude}:${radiusMeters}`
  const cached = cache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) return cached.value
  const query = `[out:json][timeout:5];(nwr[amenity~"^(restaurant|fast_food|cafe)$"](around:${radiusMeters},${coordinates.latitude},${coordinates.longitude}););out center tags;`
  const data = await request(overpassUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: query })
  const restaurants = data.elements.map(normalizeElement).filter(Boolean)
  cache.set(cacheKey, { value: restaurants, expiresAt: Date.now() + 10 * 60 * 1000 })
  return restaurants
}
