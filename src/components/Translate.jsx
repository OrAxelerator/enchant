import { useState } from "react"
import './Translate.css'

// La police Enchantment remplace chaque lettre par son glyphe galactique :
// il suffit donc d'afficher le texte saisi dans cette police pour le traduire
export default function Translate() {
    const [texte, setTexte] = useState("")

    return (
        <div className="translate">
            <h1>Traducteur</h1>
            <input
                className="bulle"
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="écris ton texte..."
                aria-label="Texte à traduire"
            />
            <span className="fleche" aria-hidden="true">↓</span>
            <input
                className="bulle bulle-galactic"
                value={texte}
                readOnly
                tabIndex={-1}
                aria-label="Texte en galactique"
            />
        </div>
    )
}
