import { useState } from 'react'
import './App.css'
import Reading from './components/Reading'

function App() {
  const [page, setPage] = useState('home')

  function displayPage() {
    switch (page) {
      case 'home':
        return( 
        <>
        <h1>Home</h1>
        <p>petit projet pour apprendre le langage table d'enchant de mc (oui j'ai que ça a faire)</p>
        <p>site en construction</p>
        </>
      )

      case 'reading':
        return(
          <>
          <h1>Reading</h1>
          <Reading></Reading>
          </>
        ) 

      default:
        return <h1>Home</h1>
    }
  }

  return (
    <>
      <header className="header">
        <nav className="nav">
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('reading')}>Reading</button>
        </nav>
      </header>
      {displayPage()}
    </>
  )
}

export default App
