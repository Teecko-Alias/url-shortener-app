import { useMemo, useState } from 'react'
import './App.css'

const initialLinks = [
  { id: 1, longUrl: 'https://example.com/product-launch-campaign', slug: 'launch', clicks: 128 },
  { id: 2, longUrl: 'https://example.com/react-dashboard-case-study', slug: 'case', clicks: 76 },
]

function App() {
  const [links, setLinks] = useState(initialLinks)
  const [url, setUrl] = useState('')

  const totalClicks = useMemo(() => links.reduce((total, link) => total + link.clicks, 0), [links])

  function createLink(event) {
    event.preventDefault()
    if (!url.trim()) return
    const slug = Math.random().toString(36).slice(2, 7)
    setLinks([{ id: Date.now(), longUrl: url, slug, clicks: 0 }, ...links])
    setUrl('')
  }

  async function copyLink(slug) {
    await navigator.clipboard.writeText(`${window.location.origin}/${slug}`)
  }

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">URL Shortener</p>
          <h1>Short links dengan click analytics dan copy button.</h1>
        </div>
        <div className="analytics">
          <strong>{totalClicks}</strong>
          <span>Total Clicks</span>
        </div>
      </section>

      <form onSubmit={createLink}>
        <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Paste a long URL" />
        <button>Shorten</button>
      </form>

      <section className="links">
        {links.map((link) => (
          <article key={link.id}>
            <div>
              <a href={link.longUrl} target="_blank" rel="noreferrer">/{link.slug}</a>
              <p>{link.longUrl}</p>
            </div>
            <strong>{link.clicks} clicks</strong>
            <button onClick={() => copyLink(link.slug)}>Copy</button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
