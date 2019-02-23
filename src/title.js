import  $ from "jquery";
import { space } from "./app";
import { textInElement } from "./textinelement";
const app = space();

/**
  * Affichage du titre
  * On crée une balise "h1" dans laquelle on insert le titre puis on la place dans le div main qui a la classe message (var message)
  * On utilise pour cela notre fonction textInElement qui se charge de construire la balise et d'y ajouter le texte (traduit par la fonction translate)
  */
const titre = {
    FR: "Affichez vos couleurs",
    EN: "Display your colors"
};
export let displayTitle = () => $("<h1>").text(titre[app.lang]).insertBefore($("main>div>div>input"));

