// Page provisoire pour les sections pas encore codées
export default function Placeholder({ title, onBack }) {
    return (
        <div className="placeholder">
            <h1>{title}</h1>
            <p>en construction</p>
            <button onClick={onBack}>← Retour</button>
        </div>
    )
}
