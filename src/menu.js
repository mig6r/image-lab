import  $ from "jquery";
import {space} from "./app";
const app = space();
const menuItems = [];

/**
* Ajout des Items au menu
* On ajoute une variable de type objet à l'array "menuItems"
* @param {variable} lang
* @param {String} nom 
* @param {String} url 
*/
export const pushItems = (lang, nom, url) => menuItems.push(
    {
        lang: lang,
        nom: nom,
        url: url
    });
/**
 * Création du menu de navigation
 * On récupère les éléments de menuItems (objets dans un tableau) et on cré les li et href uniquement si leur propriété correspond à langue en cours
 * 
 */
export const displayMenuItems = () => {
     let menu = $(".navbar-nav.ml-auto");  


    menuItems.forEach((value)  => {
        if (app.lang === value.lang) { 
        menu.append( 
            $("<li>").attr("class", "nav-item")
            .append($("<a>").text(value.nom).attr({
            "class":"nav-link text-right pt-0 pb-0",
            "href" : value.url,
            "style" : "font-family: 'north'; font-size: 1.8rem;"
            })
            )
        );
         
         }
        }
    );
};