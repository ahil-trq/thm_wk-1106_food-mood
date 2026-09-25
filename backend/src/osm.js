const timeoutMs = 6000
const cache = new Map()

function getConfig() {
  return {
    overpassUrl: process.env.OVERPASS_API_URL || 'https://overpass-api.de/api/interpreter',
    nominatimUrl: process.env.NOMINATIM_API_URL || 'https://nominatim.openstreetmap.org',
    geoapifyApiKey: process.env.GEOAPIFY_API_KEY || '',
    geoapifyUrl: process.env.GEOAPIFY_API_URL || 'https://api.geoapify.com/v2/places',
  }
}

async function performRequest(url, options) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, headers: { 'User-Agent': 'Food-Mood/1.0 (THM project)', ...(options.headers || {}) } })
    if (!response.ok) {
      const errorText = await response.text()
      console.error("OSM ERROR STATUS:", response.status)
      console.error("OSM ERROR BODY:", errorText)
      const error = new Error(`OSM request failed with ${response.status}`)
      error.status = response.status
      throw error
    }
    return await response.json()
  } finally {
    clearTimeout(timeout)
  }
}

// Retry nur bei Timeouts/5xx (transiente Fehler); Rate-Limits und übrige 4xx werden gemäß S1/A08 nicht wiederholt.
function isTransientError(error) {
  if (error?.name === 'AbortError') return true
  if (typeof error?.status === 'number') return error.status >= 500
  return true
}

async function request(url, options = {}) {
  try {
    return await performRequest(url, options)
  } catch (error) {
    if (!isTransientError(error)) throw error
    console.error('OSM request failed, retrying once:', error.message)
    return await performRequest(url, options)
  }
}

// Overpass ist gelegentlich überlastet/rate-limited; bei diesen Fehlern lohnt sich ein anderer Endpunkt statt eines erneuten Versuchs auf demselben.
const FALLBACK_OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

function getOverpassUrls() {
  const primary = getConfig().overpassUrl
  return [...new Set([primary, ...FALLBACK_OVERPASS_URLS])].slice(0, 3)
}

function isFailoverEligible(error) {
  if (error?.name === 'AbortError') return true
  if (typeof error?.status === 'number') return [429, 502, 503].includes(error.status)
  return true
}

async function requestOverpass(buildUrl) {
  const urls = getOverpassUrls()
  let lastError
  for (const baseUrl of urls) {
    try {
      return await performRequest(buildUrl(baseUrl))
    } catch (error) {
      lastError = error
      if (!isFailoverEligible(error)) throw error
      console.error(`Overpass-Endpunkt fehlgeschlagen (${baseUrl}), versuche nächsten Endpunkt:`, error.message)
    }
  }
  throw lastError
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

function normalizeCuisines(value) {
  if (!value) return []
  return String(value)
    .split(/[;,]/)
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .filter((entry, index, list) => list.indexOf(entry) === index)
}

function getGeoapifyAmenity(feature) {
  const categories = Array.isArray(feature?.properties?.categories)
    ? feature.properties.categories
    : typeof feature?.properties?.categories === 'string'
      ? [feature.properties.categories]
      : []

  const category = categories.find((entry) => typeof entry === 'string' && entry.includes('cafe'))
    || categories.find((entry) => typeof entry === 'string' && entry.includes('fast_food'))
    || categories.find((entry) => typeof entry === 'string' && entry.includes('restaurant'))
    || 'catering.restaurant'

  if (category.includes('cafe')) return 'CAFE'
  if (category.includes('fast_food')) return 'FAST_FOOD'
  return 'RESTAURANT'
}

function normalizeGeoapifyFeature(feature, origin) {
  const properties = feature?.properties || {}
  const coordinates = feature?.geometry?.coordinates || []
  const latitude = properties.lat ?? coordinates[1]
  const longitude = properties.lon ?? coordinates[0]
  if (!properties.name || latitude == null || longitude == null) return null

  const categories = Array.isArray(properties.categories)
    ? properties.categories
    : typeof properties.categories === 'string'
      ? [properties.categories]
      : []

  const cuisineCandidates = [
    properties.cuisine,
    properties.shop,
    ...categories,
  ]

  const cuisines = cuisineCandidates
    .flatMap((value) => normalizeCuisines(value))
    .filter((value) => !value.includes('catering'))

  const amenity = getGeoapifyAmenity(feature)
  const address = [properties.street, properties.housenumber, properties.city].filter(Boolean).join(' ') || properties.formatted || null

  return {
    id: `GEOAPIFY:${properties.place_id || properties.datasource?.sourcename || feature?.id || `${latitude}:${longitude}`}`,
    name: properties.name,
    address,
    cuisine: cuisines[0] || null,
    cuisines,
    amenity,
    open: null,
    openingHours: properties.opening_hours || null,
    vegetarian: typeof properties.vegetarian === 'boolean' && properties.vegetarian ? 'YES' : 'UNKNOWN',
    vegan: typeof properties.vegan === 'boolean' && properties.vegan ? 'YES' : 'UNKNOWN',
    takeaway: typeof properties.takeaway === 'boolean' && properties.takeaway ? 'YES' : 'UNKNOWN',
    delivery: typeof properties.delivery === 'boolean' && properties.delivery ? 'YES' : 'UNKNOWN',
    outdoorSeating: typeof properties.outdoor_seating === 'boolean' && properties.outdoor_seating ? 'YES' : 'UNKNOWN',
    image: isValidImageUrl(properties.image) ? properties.image : null,
    wikimediaCommons: properties.wikimedia_commons || null,
    wikidata: properties.wikidata || null,
    website: properties.website || null,
    phone: properties.phone || null,
    latitude,
    longitude,
    distance: distanceMeters(origin, latitude, longitude),
    rating: null,
    count: 0,
  }
}

async function requestGeoapify(latitude, longitude, radiusMeters) {
  const { geoapifyApiKey, geoapifyUrl } = getConfig()
  if (!geoapifyApiKey) {
    throw new Error('GEOAPIFY_API_KEY is not configured')
  }

  const url = new URL(geoapifyUrl)
  url.searchParams.set('categories', 'catering.restaurant,catering.cafe,catering.fast_food')
  url.searchParams.set('filter', `circle:${longitude},${latitude},${radiusMeters}`)
  url.searchParams.set('limit', '20')
  url.searchParams.set('apiKey', geoapifyApiKey)
  url.searchParams.set('format', 'json')

  const data = await request(url.toString(), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
  return data
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

function isValidImageUrl(value) {
  if (typeof value !== 'string') return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const imageCache = new Map()
const IMAGE_CACHE_TTL = 24 * 60 * 60 * 1000
const IMAGE_LOOKUP_TIMEOUT_MS = 2500
const IMAGE_LOOKUP_CONCURRENCY = 5
const MAX_IMAGE_LOOKUPS_PER_REQUEST = 12

async function fetchWikimediaJson(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), IMAGE_LOOKUP_TIMEOUT_MS)
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'Food-Mood/1.0 (THM project)' } })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Wikimedia request failed:', error.message)
    return null
  } finally {
    clearTimeout(timeout)
  }
}

async function resolveCommonsFileUrl(fileTitle) {
  const title = fileTitle.startsWith('File:') ? fileTitle : `File:${fileTitle}`
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('titles', title)
  url.searchParams.set('prop', 'imageinfo')
  url.searchParams.set('iiprop', 'url')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')
  const data = await fetchWikimediaJson(url)
  const page = data?.query?.pages ? Object.values(data.query.pages)[0] : null
  return page?.imageinfo?.[0]?.url || null
}

async function resolveCommonsCategoryImage(categoryTitle) {
  const title = categoryTitle.startsWith('Category:') ? categoryTitle : `Category:${categoryTitle}`
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('list', 'categorymembers')
  url.searchParams.set('cmtitle', title)
  url.searchParams.set('cmtype', 'file')
  url.searchParams.set('cmlimit', '1')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')
  const data = await fetchWikimediaJson(url)
  const member = data?.query?.categorymembers?.[0]
  return member?.title ? resolveCommonsFileUrl(member.title) : null
}

async function resolveWikidataImage(wikidataId) {
  const url = new URL('https://www.wikidata.org/w/api.php')
  url.searchParams.set('action', 'wbgetclaims')
  url.searchParams.set('entity', wikidataId)
  url.searchParams.set('property', 'P18')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')
  const data = await fetchWikimediaJson(url)
  const filename = data?.claims?.P18?.[0]?.mainsnak?.datavalue?.value
  return filename ? resolveCommonsFileUrl(filename) : null
}

// Bild-Herkunft (Category vs. File vs. Wikidata-Entity) bestimmt den Lookup-Pfad; Ergebnis wird 24h gecacht.
async function resolveRestaurantImage(restaurant) {
  const cacheKey = restaurant.wikimediaCommons
    ? `commons:${restaurant.wikimediaCommons}`
    : restaurant.wikidata
      ? `wikidata:${restaurant.wikidata}`
      : null
  if (!cacheKey) return null
  const cached = imageCache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) return cached.value
  let imageUrl = null
  try {
    if (restaurant.wikimediaCommons?.startsWith('Category:')) {
      imageUrl = await resolveCommonsCategoryImage(restaurant.wikimediaCommons)
    } else if (restaurant.wikimediaCommons) {
      imageUrl = await resolveCommonsFileUrl(restaurant.wikimediaCommons)
    } else if (restaurant.wikidata) {
      imageUrl = await resolveWikidataImage(restaurant.wikidata)
    }
  } catch (error) {
    console.error('Wikimedia image lookup failed:', error.message)
    imageUrl = null
  }
  imageCache.set(cacheKey, { value: imageUrl, expiresAt: Date.now() + IMAGE_CACHE_TTL })
  return imageUrl
}

async function mapWithConcurrency(items, limit, mapper) {
  let index = 0
  async function worker() {
    while (index < items.length) {
      const current = index++
      await mapper(items[current])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
}

// Nur ein begrenztes Kontingent pro Suche anreichern, damit die Antwortzeit (NFA-01) nicht durch viele langsame Wikimedia-Aufrufe leidet.
async function resolveMissingImages(restaurants) {
  const candidates = restaurants
    .filter((restaurant) => !restaurant.image && (restaurant.wikimediaCommons || restaurant.wikidata))
    .slice(0, MAX_IMAGE_LOOKUPS_PER_REQUEST)
  if (!candidates.length) return
  await mapWithConcurrency(candidates, IMAGE_LOOKUP_CONCURRENCY, async (restaurant) => {
    restaurant.image = await resolveRestaurantImage(restaurant)
  })
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
    image: isValidImageUrl(tags.image) ? tags.image : null,
    wikimediaCommons: tags.wikimedia_commons || null,
    wikidata: tags.wikidata || null,
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
  const cacheKey = `restaurants:${coordinates.latitude}:${coordinates.longitude}:${radiusMeters}`
  const cached = cache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now()) return cached.value

  const { geoapifyApiKey } = getConfig()
  if (geoapifyApiKey) {
    try {
      const data = await requestGeoapify(latitude, longitude, radiusMeters)
      const restaurants = (data?.features || [])
        .map((feature) => normalizeGeoapifyFeature(feature, coordinates))
        .filter(Boolean)

      await resolveMissingImages(restaurants)
      cache.set(cacheKey, { value: restaurants, expiresAt: Date.now() + 10 * 60 * 1000 })
      return restaurants
    } catch (error) {
      console.error('Geoapify request failed, falling back to Overpass:', error.message)
    }
  }

  const query = `[out:json][timeout:5];(nwr[amenity~"^(restaurant|fast_food|cafe)$"](around:${radiusMeters},${coordinates.latitude},${coordinates.longitude}););out center tags;`
  console.log("Overpass Query:", query)
  const data = await requestOverpass((baseUrl) => {
    const url = new URL(baseUrl)
    url.searchParams.set('data', query)
    return url.toString()
  })
  const restaurants = data.elements.map((element) => normalizeElement(element, coordinates)).filter(Boolean)
  await resolveMissingImages(restaurants)
  cache.set(cacheKey, { value: restaurants, expiresAt: Date.now() + 10 * 60 * 1000 })
  return restaurants
}
