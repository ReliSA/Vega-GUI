import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      <div className="landing__content">
        <h1 className="landing__title">Vega GUI</h1>
        <p className="landing__description">
          A modular, importable graphical interface for building and editing
          Vega grammar specifications. Compose visualizations through a
          structured, component-driven editor without writing JSON by hand.
        </p>
        <button className="landing__btn" onClick={() => navigate('/editor')}>
          Open Editor
        </button>
      </div>
    </main>
  )
}

