import $ from "jquery";
import { space } from "./app";
import { displayButton } from "./displayUpload";

const app = space();

let txtNbImages = { 
    FR: "image dans votre gallerie",
    EN: "picture in your gallery"     
}
if (app.images.length > 1){
    txtNbImages = {
        FR: "images dans votre gallerie",
        EN: "pictures in your gallery"     
    }
}
let txtNoImages = {
    FR: "Il n'y a pas d'image dans votre gallerie",
    EN: "No picture in your gallery"
}
let txtSupAll = {
    FR: "Tout supprimer",
    EN: "Erase all"
}

function eraseSpace(event) {
    localStorage.clear();
    window.location.reload();
}

let supBouton = $("<button>").text(txtSupAll[app.lang]).attr("class", "btn btn-secondary btn-sm align-self-center");
$("#supGallery").append(supBouton);
supBouton.bind("click", eraseSpace);
/**
 * Affichage des infos sur le bandeau gallery
 * On test si des images sont présentes dans la gallerie, puis en fonction, on affiche le nombre d'images ou on informe que la gallerie est vide
 */
export function infoNbImages() {
    $("#infoGallery").empty();

    let noImageDisplay = () => {
        $("#infoGallery").append($("<h6>").text(txtNoImages[app.lang]));
        supBouton.css("display", "none");
    };
    let isImageDisplay = () => {
        $("#infoGallery").append($("<h6>").text(`${app.images.length} ${txtNbImages[app.lang]} ( ${app.imgMax} max)`));
        supBouton.css("display", "inline");
    };
    app.images.length ? isImageDisplay() : noImageDisplay();   
}