import { useState } from 'react'
import './App.css'
import Reading from './components/Reading'
import Home from './components/Home'
import Placeholder from './components/Placeholder'
import Translate from './components/Translate'
import './components/Home.css'

function App() {
  const [page, setPage] = useState('home')

  function displayPage() {
    switch (page) {
      case 'home':
        return <Home onNavigate={setPage} />

      case 'reading':
        return (
          <main className="page">
            <h1>Entraînement</h1>
            <Reading></Reading>
          </main>
        )

      case 'wiki':
        return <Placeholder title="Wiki" onBack={() => setPage('home')} />

      case 'learn':
        return <Placeholder title="Apprendre" onBack={() => setPage('home')} />

      case 'translate':
        return (
          <main className="page">
            <Translate />
          </main>
        )

      default:
        return <Home onNavigate={setPage} />
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button>
          <button className={page === 'wiki' ? 'active' : ''} onClick={() => setPage('wiki')}>Wiki</button>
          <button className={page === 'learn' ? 'active' : ''} onClick={() => setPage('learn')}>Apprendre</button>
          <button className={page === 'translate' ? 'active' : ''} onClick={() => setPage('translate')}>Traducteur</button>
          <button className={page === 'reading' ? 'active' : ''} onClick={() => setPage('reading')}>Entraînement</button>
        </nav>
      </header>
      {displayPage()}
    </>
  )
}

export default App
