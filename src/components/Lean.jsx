import './Learn.css'

export default function Learn({ setPage }) {

    return (
        <div className="learn">
            Le Standard Galactic Alphabet (SGA), ou « l'alphabet de la table d'enchantement de Minecraft », est une police d'écriture qui associe chaque lettre à un symbole.

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/Translation_Standard_Galactic_Alphabet.PNG"
                alt="Correspondance entre les lettres latines et les symboles du SGA"
            />

            Le SGA est un alphabet inventé par Tom Hall pour sa série de jeux vidéo Commander Keen. À l'origine, il a créé une illustration pour une pancarte indiquant « Sortie » à la fin de chaque niveau du premier jeu Keen.

            <button onClick={() => setPage('reading')}>M'entraîner !</button>
        </div>
    )
}
