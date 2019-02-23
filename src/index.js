import 'bootstrap';
import  $ from 'jquery';
import {displayMenuItems, pushItems} from "./menu";
import { displayTitle } from './title';
import { displayImages } from './displayImages';
import { selectLang } from './selectlang';
import {space} from "./app";
import { displayButton } from './displayUpload';
import { displayExtension } from './displayfooter';
import { infoClick } from './features';
import { infoNbImages } from './infonbimages';

$(function () {
    /*équivalent en javascript natif : 
    document.onreadystatechange = function(e){
        if(document.readystate === "interactive"){
        job():
    }
}
*/

    const app = space();

// pushItems("FR", "Accueil", "index.php");
// pushItems("EN", "Home", "index.php");
// pushItems("FR", "Gallerie", "gallerie.php");
// pushItems("EN", "Gallery", "gallerie.php");
pushItems("FR", "Contact", "mailto:s.opros@gmail.com");
pushItems("EN", "Contact", "mailto:s.opros@gmail.com");

let langFr = window.document.getElementById("langFr");
let langEn  = window.document.getElementById("langEn");

langFr.onclick = function (event) {
    selectLang("FR");  
};
langEn.onclick = function (event) {
    selectLang("EN");
};

displayMenuItems();
displayTitle();
displayImages();
selectLang();
displayButton();
displayExtension();
infoClick();
infoNbImages();

});