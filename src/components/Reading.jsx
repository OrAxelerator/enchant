import { useEffect, useState } from "react"

const MOTS = [
    "maison", "soleil", "chat", "livre", "fenetre", "riviere", "montagne", "pomme", "crayon", "voiture",
    "jardin", "etoile", "chemin", "bateau", "oiseau", "fromage", "chapeau", "foret", "nuage", "table",
    "chaise", "porte", "lumiere", "musique", "histoire", "silence", "voyage", "courage", "sourire", "hiver",
    "ete", "printemps", "automne", "matin", "soir", "nuit", "jour", "bonheur", "tristesse", "papier",
    "stylo", "cuisine", "chateau", "village", "ville", "pluie", "vent", "neige", "feuille", "arbre",
    "fleur", "pierre", "sable", "plage", "ocean", "lac", "pont", "route", "train", "gare",
    "horloge", "miroir", "cle", "lettre", "mot", "phrase", "dessin", "couleur", "rouge", "bleu",
    "vert", "jaune", "doux", "rapide", "lent", "grand", "petit", "ancien", "sombre", "chaud",
    "froid", "ami", "famille", "enfant", "voisin", "marche", "pain", "lait", "miel", "citron",
    "lapin", "renard", "hibou", "dragon", "epee", "tresor", "carte", "boussole", "tempete", "orage",
    "math", "nsi", "python", "algorithme", "variable", "fonction", "boucle", "tableau", "liste", "dictionnaire",
    "chaine", "entier", "flottant", "booleen", "condition", "recursion", "pile", "file", "graphe", "sommet",
    "arete", "matrice", "vecteur", "derivee", "integrale", "limite", "suite", "fraction", "nombre", "premier",
    "theoreme", "ensemble", "produit", "somme", "polynome", "equation", "inegalite", "triangle", "cercle", "carre",
    "rectangle", "pyramide", "cylindre", "sphere", "angle", "perimetre", "aire", "volume", "probabilite", "statistique",
    "moyenne", "mediane", "logique", "classe", "objet", "methode", "attribut", "module", "import", "script",
    "terminal", "compilateur", "interpreteur", "octet", "binaire", "hexadecimal", "processeur", "memoire", "reseau", "serveur",
    "protocole", "adresse", "routeur", "pointeur", "parametre", "iteration", "generateur", "decorateur", "exception", "erreur",
    "debogage", "commentaire", "syntaxe", "hachage", "requete", "index", "tuple", "chiffrement", "bit", "cache",
    "retour", "cosinus", "sinus", "tangente", "logarithme", "exponentielle", "modulo", "diviseur", "multiple", "factorielle",
]


export default function Reading() {

    const [input, setInput] = useState("");



    const [currentWord, setcurrentWord] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState(0);

    useEffect(() => {
        getRandomWords()
    }, [])

    // Retire le flash vert/rouge après l'animation
    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(""), 600);
        return () => clearTimeout(t);
    }, [feedback])


    function handleError() {
        if (error >= 3) {
            setFeedback("ko")
            getRandomWords()
            setInput("")
            setError(0)
        }else {
            setError(error +1)
        }
    }

    function getRandomWords() {
        const r = Math.floor((Math.random()* MOTS.length))
        console.log(r);
        setcurrentWord(MOTS[r])
    }

    function handleInput(e) {
        console.log(e.target.value);
        if (e.target.value == "Enter") {
            console.log("enter");
        } else {
            setInput(e.target.value);
        };
    };

    function handleResultat() {
        console.log("gandle res");
        if (input == currentWord) {
            setFeedback("ok")
            getRandomWords()
            setInput("")
        }else {
            setFeedback("ko")
            console.log("raté");
            handleError()
        }
    }


    return (
        <div className="writing">
            <h3 className="mot">{currentWord}</h3>
            <input
                className={`saisie ${feedback}`}
                value={input}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="tape le mot..."
                onChange={(e) => handleInput(e)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleResultat()
                    }
                }}
            />
            <h5>{error > 0 ? error : ""}</h5>
        </div>
    )
}
