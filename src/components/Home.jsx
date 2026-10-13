import { useEffect, useState } from 'react'

// Angles en degrés : -90 = haut, 0 = droite, 90 = bas, 180 = gauche
const LIENS = [
    { page: 'wiki', label: 'Wiki', sub: 'Wiki', angle: -90 },
    { page: 'learn', label: 'Apprendre', sub: 'Apprendre', angle: 0 },
    { page: 'translate', label: 'Traducteur', sub: 'Traducteur', angle: 90 },
    { page: 'reading', label: 'Entrainement', sub: 'Entraînement', angle: 180 },
]

// Petites billes qui tournent sur le cercle
const ORBS = Array.from({ length: 8 }, (_, i) => i * 45)

const LETTRES = "abcdefghijklmnopqrstuvwxyz"
const INTERVALLE_PARTICULE = 420
// Sans survol, quelques lettres seulement, plus espacées
const INTERVALLE_PARTICULE_REPOS = 2400

export default function Home({ onNavigate }) {
    const [survol, setSurvol] = useState(false)
    const [particules, setParticules] = useState([])

    // Une lettre galactique apparaît à intervalles réguliers : plus souvent quand la table est survolée
    useEffect(() => {
        const intervalle = survol ? INTERVALLE_PARTICULE : INTERVALLE_PARTICULE_REPOS
        const t = setInterval(() => {
            const id = Math.random()
            const particule = {
                id,
                angle: Math.random() * 360,
                lettre: LETTRES[Math.floor(Math.random() * LETTRES.length)],
            }
            setParticules((p) => [...p, particule])
        }, intervalle)
        return () => clearInterval(t)
    }, [survol])

    function retirerParticule(id) {
        setParticules((p) => p.filter((x) => x.id !== id))
    }

    return (
        <div className="home">
            <div className="ring">
                <div className="glow" />
                <div className="ring-orbit" />
                <div className="orbs">
                    {ORBS.map((angle) => (
                        <span key={angle} className="orb" style={{ '--a': `${angle}deg` }} />
                    ))}
                </div>
                <div className="table-wrap">
                    <img
                        className="table"
                        src={`${import.meta.env.BASE_URL}enchanting-table-245203281.png`}
                        alt="Table d'enchantement"
                        onMouseEnter={() => setSurvol(true)}
                        onMouseLeave={() => setSurvol(false)}
                    />
                </div>
                {particules.map((p) => (
                    <span
                        key={p.id}
                        className="particule"
                        style={{ '--a': `${p.angle}deg` }}
                        onAnimationEnd={() => retirerParticule(p.id)}
                    >
                        {p.lettre}
                    </span>
                ))}
                {LIENS.map((lien) => (
                    <button
                        key={lien.page}
                        className="orbit-btn"
                        style={{ '--a': `${lien.angle}deg` }}
                        onClick={() => onNavigate(lien.page)}
                    >
                        <span className="orbit-label">{lien.label}</span>
                        <span className="orbit-sub">{lien.sub}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
