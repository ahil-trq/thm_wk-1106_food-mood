import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const moods = [['GEMUETLICH', 'Gemütlich', 'Langsam, warm, entspannt'], ['ROMANTISCH', 'Romantisch', 'Ein besonderer Abend'], ['SCHNELL', 'Schnell', 'Wenig Zeit, viel Geschmack'], ['GESELLIG', 'Gesellig', 'Zusammen ist besser'], ['NEU', 'Etwas Neues', 'Lust auf Entdeckung']]
const occasions = ['Date', 'Familie', 'Freunde', 'Mittagspause', 'Uni']
const cuisines = ['italian', 'asian', 'indian', 'burger', 'cafe']

function App() {
  const [screen, setScreen] = useState(() => localStorage.getItem('foodmood-screen') || 'profile')
  const [name, setName] = useState(localStorage.getItem('foodmood-name') || '')
  const [userIdHash, setUserIdHash] = useState(localStorage.getItem('foodmood-user-hash') || '')
  const [userId, setUserId] = useState(localStorage.getItem('foodmood-user') || '')
  const [profileInput, setProfileInput] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [mood, setMood] = useState('')
  const [occasion, setOccasion] = useState('')
  const [radius, setRadius] = useState('5')
  const [selectedCuisine, setSelectedCuisine] = useState([])
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('foodmood-favorites') || '[]'))
  const [visited, setVisited] = useState(() => JSON.parse(localStorage.getItem('foodmood-visited') || '[]'))
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('foodmood-reviews') || '{}'))
  const [activeTab, setActiveTab] = useState('favorites')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { localStorage.setItem('foodmood-screen', screen) }, [screen])
  useEffect(() => { localStorage.setItem('foodmood-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('foodmood-visited', JSON.stringify(visited)) }, [visited])
  useEffect(() => { localStorage.setItem('foodmood-reviews', JSON.stringify(reviews)) }, [reviews])

  const profileReady = Boolean(userId && name)
  const personalRestaurants = useMemo(() => {
    const source = activeTab === 'favorites' ? favorites : visited
    return restaurants.filter((restaurant) => source.includes(restaurant.id))
  }, [activeTab, favorites, visited, restaurants])
  const visibleRestaurants = useMemo(
    () => restaurants.filter((restaurant) => !onlyOpen || restaurant.open === true),
    [restaurants, onlyOpen],
  )

  async function createProfile() {
    if (!name.trim()) return setError("Bitte gib deinen Namen ein.")
    const generated = "FM" + crypto.randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()
    let effectiveHash = generated
    try { const response = await fetch(API_BASE + "/profiles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), userId: generated }) }); if (response.ok) effectiveHash = (await response.json()).userIdHash } catch { /* lokaler Demo-Fallback */ }
    setUserId(generated); setUserIdHash(effectiveHash)
    localStorage.setItem("foodmood-user", generated); localStorage.setItem("foodmood-user-hash", effectiveHash); localStorage.setItem("foodmood-name", name.trim())
    setError(""); setScreen("start")
  }

  async function loadProfile() {
    if (!/^[A-Z0-9]{12}$/.test(profileInput.trim())) return setError('Die UserID muss aus 12 Buchstaben oder Ziffern bestehen.')
    let effectiveHash = profileInput.trim()
    try { const response = await fetch(API_BASE + "/profiles/load", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: profileInput.trim() }) }); if (response.ok) { const data = await response.json(); effectiveHash = data.userIdHash; setName(data.name) } } catch { /* lokaler Demo-Fallback */ }
    setUserId(profileInput.trim())
    setUserIdHash(effectiveHash)
    localStorage.setItem('foodmood-user', profileInput.trim())
    localStorage.setItem('foodmood-user-hash', effectiveHash)
    localStorage.setItem('foodmood-name', name.trim() || 'Food-Mood Nutzer')
    setName((current) => current.trim() || 'Food-Mood Nutzer')
    setError('')
    setScreen('start')
  }

  async function toggleFavorite(id) { const response = await fetch(API_BASE + "/favorites", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userIdHash: userIdHash || userId, restaurantKey: id }) }); if (!response.ok) return; const data = await response.json(); setFavorites((current) => data.favorite ? [...new Set([...current, id])] : current.filter((item) => item !== id)) }
  async function markVisited(id) { const response = await fetch(API_BASE + "/visits", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userIdHash: userIdHash || userId, restaurantKey: id }) }); if (response.ok) setVisited((current) => current.includes(id) ? current : [...current, id]) }
  async function saveReview(id, review) { const response = await fetch(API_BASE + "/reviews", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userIdHash: userIdHash || userId, restaurantKey: id, ...review }) }); if (response.ok) setReviews((current) => ({ ...current, [id]: review })) }

 async function getRecommendations() {

    if (!coordinates) {
    setError("Bitte zuerst Standort freigeben.")
    return
  }

  setLoading(true)
  setError('')

  try {
    const response = await fetch(
    `${API_BASE}/restaurants?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&radius=${Number(radius) * 1000}`
    )

    if (!response.ok) {
      throw new Error("Restaurant API unavailable")
    }

    const data = await response.json()
    const loadedRestaurants = Array.isArray(data) ? data : data.restaurants || []
    console.debug('Restaurant API response:', data)
    console.debug('Restaurants before filters:', loadedRestaurants.length)

    const mappedRestaurants = loadedRestaurants.map((item) => ({
        ...item,
        id: item.id,
        distance: item.distance ?? 0,
        rating: item.rating ?? null,
        count: item.count ?? 0,
        image: item.image ?? null,
        cuisine: item.cuisine || "restaurant",
        address: item.address || "Adresse unbekannt",
        open: item.open === true,
        reason: "passt zu deinem Mood",
        tone: "coral"
      }))
    console.debug('Restaurants after filters:', mappedRestaurants.filter((item) => !onlyOpen || item.open).length)
    setRestaurants(mappedRestaurants)

  } catch (error) {
    console.error(error)
    setRestaurants([])
    setError("Restaurants konnten nicht geladen werden.")
  }

  finally {
    setLoading(false)
    setScreen("results")
  }
}

  function resetProfile() { localStorage.removeItem('foodmood-screen'); setScreen('profile'); setError('') }
  const progress = { start: 1, location: 2, mood: 3, filters: 4, results: 5, details: 5, library: 1 }[screen] || 1

  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={() => profileReady && setScreen('start')} aria-label="Zur Startseite">food<span>·</span>mood</button>{profileReady && <nav className="topnav"><button onClick={() => setScreen('library')}>Meine Orte</button><button onClick={resetProfile}>Profil wechseln</button></nav>}</header>
    {screen !== 'profile' && <div className="progress"><span style={{ width: `${progress * 20}%` }} /></div>}
    <main className="main-content">
      {screen === 'profile' && <section className="welcome-screen split-screen"><div className="welcome-copy"><p className="eyebrow">DEIN MOOD, DEIN BISS</p><h1>Finde den Ort,<br /><em>der heute passt.</em></h1><p className="lede">Food-Mood hilft dir, aus deinem Moment eine gute Mahlzeit zu machen. Ohne Konto. Ohne endloses Suchen.</p><div className="profile-actions"><label>Name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Wie dürfen wir dich nennen?" /></label><button className="primary-button" onClick={createProfile}>Neues Profil starten <span>↗</span></button><div className="existing-profile"><input value={profileInput} onChange={(event) => setProfileInput(event.target.value.toUpperCase())} placeholder="12-stellige UserID" maxLength={12} /><button className="text-button" onClick={loadProfile}>Vorhandenes Profil laden</button></div></div>{error && <p className="error-message">{error}</p>}</div><div className="welcome-art"><div className="art-circle art-circle-one" /><div className="art-circle art-circle-two" /><div className="plate"><span>✦</span></div><div className="art-label">good food<br /><strong>good mood</strong></div></div></section>}
      {screen === 'start' && <section className="center-screen"><p className="eyebrow">SCHÖN, DASS DU DA BIST, {name.toUpperCase()}</p><h1>Was darf es<br /><em>heute sein?</em></h1><p className="lede">Ein paar kurze Fragen. Danach zeigen wir dir Orte, die zu deinem Moment passen.</p><button className="primary-button" onClick={() => setScreen('location')}>Los geht's <span>↗</span></button><button className="quiet-button" onClick={() => setScreen('library')}>Meine gespeicherten Orte ansehen</button></section>}
      {screen === 'location' && (
  <section className="form-screen">
    <StepHeading
      step="01"
      title="Wo bist du gerade?"
      copy="Damit wir dir Orte in deiner Nähe zeigen können."
    />

    <div className="location-options">
      <button
        className="location-card"
        onClick={() => {
          if (!navigator.geolocation) {
            setError("Standort wird von deinem Browser nicht unterstützt.")
            return
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })

              setError("")
              setScreen("mood")
            },
            () => {
              setError("Standort konnte nicht abgerufen werden.")
            }
          )
        }}
      >
        <span className="option-icon">◎</span>

        <span>
          <strong>Standort freigeben</strong>
          <small>Wir nutzen ihn nur für diese Suche.</small>
        </span>

        <span>→</span>
      </button>
    </div>

    {error && <p className="error-message">{error}</p>}
  </section>
)}
  {screen === 'mood' && <section className="form-screen"><StepHeading step="02" title="Was ist dein Mood?" copy="Wähle eine Stimmung. Der Anlass ist optional." /><div className="choice-grid">{moods.map(([value, label, copy]) => <button className={`choice-card ${mood === value ? 'selected' : ''}`} key={value} onClick={() => setMood(value)}><span className="choice-mark">{mood === value ? '✓' : '○'}</span><strong>{label}</strong><small>{copy}</small></button>)}</div><label className="select-label">Anlass <select value={occasion} onChange={(event) => setOccasion(event.target.value)}><option value="">Kein bestimmter Anlass</option>{occasions.map((item) => <option key={item}>{item}</option>)}</select></label><button className="primary-button" disabled={!mood && !occasion} onClick={() => setScreen('filters')}>Weiter <span>↗</span></button></section>}
      {screen === 'filters' && <section className="form-screen narrow"><StepHeading step="03" title="Noch ein paar Vorlieben?" copy="Alles optional. Du entscheidest, wie genau wir suchen." /><div className="filter-block"><label>Maximale Entfernung <select value={radius} onChange={(event) => setRadius(event.target.value)}><option value="1">1 km</option><option value="3">3 km</option><option value="5">5 km</option><option value="10">10 km</option></select></label></div><div className="filter-block"><p className="field-title">Küche</p><div className="chip-row">{cuisines.map((item) => <button className={`chip ${selectedCuisine.includes(item) ? 'selected' : ''}`} key={item} onClick={() => setSelectedCuisine((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}>{item}</button>)}</div></div><label className="toggle-row"><span><strong>Nur geöffnete Restaurants</strong><small>Zeige nur sicher geöffnete Orte</small></span><input type="checkbox" checked={onlyOpen} onChange={(event) => setOnlyOpen(event.target.checked)} /><span className="toggle" /></label><button className="primary-button" onClick={getRecommendations}>Empfehlungen anzeigen <span>↗</span></button></section>}
  {screen === 'results' && <section className="results-screen"><div className="section-heading"><div><p className="eyebrow">DEIN ERGEBNIS</p><h2>Orte für deinen<br /><em>{mood ? moods.find(([value]) => value === mood)?.[1].toLowerCase() : occasion.toLowerCase() || 'moment'}</em></h2></div><button className="filter-link" onClick={() => setScreen('filters')}>Filter ändern ↗</button></div>{error && <p className="error-message">{error}</p>}{loading ? <LoadingState /> : <div className="restaurant-list">{visibleRestaurants.map((restaurant, index) => <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} favorite={favorites.includes(restaurant.id)} onFavorite={() => toggleFavorite(restaurant.id)} onOpen={() => { setSelectedRestaurant(restaurant); setScreen('details') }} />)}</div>}{!loading && !visibleRestaurants.length && <EmptyState text="Keine Orte gefunden. Versuche einen größeren Radius oder ändere deine Filter." actionLabel="Filter ändern" action={() => setScreen('filters')} />}</section>}
      {screen === 'details' && selectedRestaurant && <DetailScreen restaurant={selectedRestaurant} favorite={favorites.includes(selectedRestaurant.id)} visited={visited.includes(selectedRestaurant.id)} review={reviews[selectedRestaurant.id]} onBack={() => setScreen('results')} onFavorite={() => toggleFavorite(selectedRestaurant.id)} onVisited={() => markVisited(selectedRestaurant.id)} onReview={(review) => saveReview(selectedRestaurant.id, review)} />}
      {screen === 'library' && <section className="results-screen"><div className="section-heading"><div><p className="eyebrow">DEINE SAMMLUNG</p><h2>Orte, die<br /><em>bleiben.</em></h2></div><button className="filter-link" onClick={() => setScreen('start')}>Neue Suche ↗</button></div><div className="tabs"><button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>Favoriten <span>{favorites.length}</span></button><button className={activeTab === 'visited' ? 'active' : ''} onClick={() => setActiveTab('visited')}>Besucht <span>{visited.length}</span></button></div><div className="restaurant-list">{personalRestaurants.map((restaurant, index) => <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} favorite={favorites.includes(restaurant.id)} onFavorite={() => toggleFavorite(restaurant.id)} onOpen={() => { setSelectedRestaurant(restaurant); setScreen('details') }} />)}</div>{!personalRestaurants.length && <EmptyState text={activeTab === 'favorites' ? 'Noch keine Favoriten gespeichert.' : 'Noch keine Besuche markiert.'} action={() => setScreen('start')} />}</section>}
    </main>
    {screen !== 'profile' && <footer className="footer"><span>food·mood</span><span>OpenStreetMap-Daten · Mit Sorgfalt ausgewählt</span></footer>}
  </div>
}

function StepHeading({ step, title, copy }) { return <div className="step-heading"><span className="step-number">{step}</span><div><p className="eyebrow">SCHRITT {step}</p><h2>{title}</h2><p>{copy}</p></div></div> }
function LoadingState() { return <div className="loading-state"><span className="loader" /><p>Wir suchen nach deinem nächsten guten Ort …</p></div> }
function EmptyState({ text, action, actionLabel = 'Neue Suche starten' }) { return <div className="empty-state"><span>✦</span><p>{text}</p><button className="secondary-button" onClick={action}>{actionLabel}</button></div> }
function RestaurantCard({ restaurant, favorite, onFavorite, onOpen, index }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(restaurant.image) && !imageFailed
  return <article className={`restaurant-card tone-${restaurant.tone || 'coral'}`} style={{ '--delay': `${index * 80}ms` }}><button className="card-main" onClick={onOpen}><div className="restaurant-photo">{showImage ? <img className="restaurant-photo-image" src={restaurant.image} alt={restaurant.name} onError={() => setImageFailed(true)} /> : <span>{restaurant.name.slice(0, 1)}</span>}</div><div className="restaurant-info"><div className="card-meta"><span>{restaurant.cuisine}</span><span>{formatDistance(restaurant.distance)}</span></div><h3>{restaurant.name}</h3><p>{restaurant.address}</p><div className="card-bottom"><span className="rating">★ {restaurant.rating ?? '—'} <small>({restaurant.count})</small></span><span className={restaurant.open ? 'open' : 'closed'}>{restaurant.open ? 'Geöffnet' : 'Geschlossen'}</span></div></div></button><button className={`favorite-button ${favorite ? 'active' : ''}`} onClick={onFavorite} aria-label={favorite ? 'Favorit entfernen' : 'Als Favorit speichern'}>{favorite ? '♥' : '♡'}</button><span className="reason">{restaurant.reason}</span></article>
}
function DetailScreen({ restaurant, favorite, visited, review, onBack, onFavorite, onVisited, onReview }) { const [rating, setRating] = useState(review?.rating || 0); const [comment, setComment] = useState(review?.comment || ''); return <section className="detail-screen"><button className="back-button" onClick={onBack}>← Zurück zur Liste</button><div className={`detail-hero tone-${restaurant.tone || 'coral'}`}><span>{restaurant.name.slice(0, 1)}</span></div><div className="detail-content"><p className="eyebrow">{restaurant.cuisine} · {formatDistance(restaurant.distance)}</p><h1>{restaurant.name}</h1><p className="detail-address">{restaurant.address}</p><div className="detail-stats"><span>★ {restaurant.rating ?? '—'} <small>({restaurant.count} Bewertungen)</small></span><span className={restaurant.open ? 'open' : 'closed'}>{restaurant.open ? 'Geöffnet' : 'Geschlossen'}</span></div><div className="detail-actions"><button className={`secondary-button ${favorite ? 'is-active' : ''}`} onClick={onFavorite}>{favorite ? '♥ Favorit' : '♡ Favorit'}</button><button className={`secondary-button ${visited ? 'is-active' : ''}`} onClick={onVisited}>{visited ? '✓ Besucht' : 'Als besucht markieren'}</button></div>{visited && <div className="review-box"><p className="eyebrow">DEINE BEWERTUNG</p><h3>Wie war es?</h3><div className="stars">{[1, 2, 3, 4, 5].map((value) => <button key={value} className={value <= rating ? 'selected' : ''} onClick={() => setRating(value)} aria-label={`${value} Sterne`}>★</button>)}</div><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Was möchtest du dir merken? (optional)" maxLength={280} /><button className="primary-button" disabled={!rating} onClick={() => onReview({ rating, comment })}>Bewertung speichern <span>↗</span></button></div>}</div></section> }
function formatDistance(meters) { return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km` }

export default App
