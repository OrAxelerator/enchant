import { useState } from "react"
import './Translate.css'

// La police Enchantment remplace chaque lettre par son glyphe galactique :
// il suffit donc d'afficher le texte saisi dans cette police pour le traduire
export default function Translate() {
    const [texte, setTexte] = useState("")

    return (
        <div className="translate">
            <h1>Traducteur</h1>

            <div className="langues">
                <span>Français</span>
                <span className="fleche" aria-hidden="true">⇄</span>
                <span>Galactique</span>
            </div>

            <div className="panneaux">
                <div className="panneau">
                    <textarea
                        className="zone"
                        value={texte}
                        onChange={(e) => setTexte(e.target.value)}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="écris ton texte..."
                        aria-label="Texte à traduire"
                    />
                    <div className="panneau-bas">
                        <span className="compteur">{texte.length}</span>
                        {texte && (
                            <button className="effacer" onClick={() => setTexte("")} aria-label="Effacer">
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <div className="panneau panneau-sortie">
                    <div className="zone zone-galactic" aria-label="Texte en galactique">
                        {texte || <span className="vide">traduction</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}
