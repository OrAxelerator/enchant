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
    "cheval", "vache", "mouton", "cochon", "poule", "canard", "chien", "souris", "loup", "ours",
    "lion", "tigre", "singe", "poisson", "baleine", "abeille", "papillon", "fourmi", "serpent", "tortue",
    "cerise", "fraise", "banane", "raisin", "poire", "peche", "tomate", "carotte", "salade", "soupe",
    "beurre", "sucre", "sel", "poivre", "gateau", "biscuit", "chocolat", "confiture", "assiette", "verre",
    "couteau", "fourchette", "cuillere", "bouteille", "tasse", "lit", "armoire", "tapis", "lampe", "bougie",
    "toit", "mur", "escalier", "cave", "grenier", "ecole", "eglise", "hopital", "medecin", "boulanger",
    "facteur", "pompier", "fermier", "roi", "reine", "prince", "princesse", "chevalier", "sorcier", "geant",
    "fantome", "lune", "ciel", "terre", "feu", "eau", "herbe", "colline", "vallee", "ile",
    "falaise", "desert", "champ", "ferme", "moulin", "puits", "barque", "voile", "ancre", "phare",
    "robe", "manteau", "chaussure", "gant", "echarpe", "ceinture", "poche", "bouton", "aiguille", "fil",
    // Mots anglais transparents
    "animal", "hotel", "restaurant", "piano", "radio", "taxi", "police", "important", "possible", "information",
    "question", "nation", "action", "attention", "direction", "station", "situation", "natural", "central", "normal",
    "general", "final", "original", "minute", "moment", "document", "president", "accident", "garage", "chocolate",
    "banana", "tomato", "family", "history", "telephone", "television", "problem", "system", "example", "idea",
    "color", "center", "theater", "actor", "doctor", "science", "nature", "culture", "adventure", "danger",
]


export default function Reading  () {

    const [input, setInput] = useState("");



    const [currentWord, setcurrentWord] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState(0);
    const [correction, setCorrection] = useState("");

    useEffect(() => {
        getRandomWords()
    }, [])

    // Retire le flash vert/rouge après l'animation
    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(""), 600);
        return () => clearTimeout(t);
    }, [feedback])

    // Affiche la bonne réponse pendant 1.5s après une erreur
    useEffect(() => {
        if (!correction) return;
        const t = setTimeout(() => setCorrection(""), 1500);
        return () => clearTimeout(t);
    }, [correction])


    function handleError() {
        if (error >= 3) {
            setFeedback("ko")
            setCorrection(currentWord)
            getRandomWords()
            setInput("")
            setError(0)
        }else {
            setError(e => e + 1)
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
            setCorrection("")
            getRandomWords()
            setInput("")
	    setError(0)
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
            <div className="retour">
                <h5>{error > 0 ? error : ""}</h5>
                <p className="correction">{correction ? `Réponse : ${correction}` : ""}</p>
            </div>
        </div>
    )
}
