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
    "nuageux", "vague", "rocher", "grotte", "caverne", "volcan", "glacier", "marais", "source", "ruisseau",
    "cristal", "diamant", "rubis", "saphir", "emeraude", "perle", "bijou", "couronne", "sceptre", "bouclier",
    "armure", "casque", "arc", "fleche", "lance", "hache", "potion", "grimoire", "parchemin", "baguette",
    "etable", "chariot", "lanterne", "coffre", "tonneau", "corde", "echelle", "marteau", "enclume", "forge",
    "licorne", "griffon", "sirene", "elfe", "nain", "gobelin", "troll", "vampire", "momie", "squelette",
    // Mots anglais transparents
    "animal", "hotel", "restaurant", "piano", "radio", "taxi", "police", "important", "possible", "information",
    "question", "nation", "action", "attention", "direction", "station", "situation", "natural", "central", "normal",
    "general", "final", "original", "minute", "moment", "document", "president", "accident", "garage", "chocolate",
    "banana", "tomato", "family", "history", "telephone", "television", "problem", "system", "example", "idea",
    "color", "center", "theater", "actor", "doctor", "science", "nature", "culture", "adventure", "danger",
]

const LETTRES = "abcdefghijklmnopqrstuvwxyz"

// Niveau 1 : 1 ou 2 lettres au hasard, niveau 2 : un mot de la liste
function tirerMot(niveau) {
    if (niveau === 1) {
        const longueur = 1 + Math.floor(Math.random() * 2)
        let mot = ""
        for (let i = 0; i < longueur; i++) {
            mot += LETTRES[Math.floor(Math.random() * LETTRES.length)]
        }
        return mot
    }
    // TODO niveau 3 : pour l'instant, même chose que le niveau 2
    return MOTS[Math.floor(Math.random() * MOTS.length)]
}

// Comparaison souple : ignore majuscules, accents et espaces autour
// (l'autocorrecteur du téléphone en rajoute souvent)
function normaliser(mot) {
    return mot.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export default function Reading  () {

    const [input, setInput] = useState("");



    const [currentWord, setcurrentWord] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState(0);
    const [correction, setCorrection] = useState("");
    const [niveau, setNiveau] = useState(2);

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

    function getRandomWords(n = niveau) {
        setcurrentWord(tirerMot(n))
    }

    // Changer de niveau : nouveau mot et on repart de zéro
    function changerNiveau(n) {
        setNiveau(n)
        getRandomWords(n)
        setInput("")
        setError(0)
        setCorrection("")
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
        if (normaliser(input) === normaliser(currentWord)) {
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
            <div className="niveaux">
                {[1, 2, 3].map((n) => (
                    <button
                        key={n}
                        type="button"
                        className={niveau === n ? "active" : ""}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => changerNiveau(n)}
                    >
                        Niveau {n}
                    </button>
                ))}
            </div>
            <h3 className="mot">{currentWord}</h3>
            <form
                className="saisie-ligne"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleResultat()
                }}
            >
                <input
                    className={`saisie ${feedback}`}
                    value={input}
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    enterKeyHint="done"
                    placeholder="tape le mot..."
                    onChange={(e) => handleInput(e)}
                />
                {/* preventDefault au mousedown : le champ garde le focus, le clavier mobile reste ouvert */}
                <button type="submit" className="valider" onMouseDown={(e) => e.preventDefault()}>
                    Valider
                </button>
            </form>
            <div className="retour">
                <h5>{error > 0 ? error : ""}</h5>
                <p className="correction">{correction ? `Réponse : ${correction}` : ""}</p>
            </div>
        </div>
    )
}
