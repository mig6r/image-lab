import $ from "jquery";
import { space } from "./app";
import { displayColors } from "./displaycolors";
import { onClickDelete } from "./displaycolors";
import { isExtensionValid } from "./check.js";

const colBackground = {
    FR: "Arrière Plan",
    EN: "Background"
}
const colForground = {
    FR: "Premier Plan",
    EN: "Forground"
}
const app = space();




/**
 * 
 * @param {*} event 
 * @param {*} key 
 */
export const onClickImage = (event) => {
    $("#colors").empty();
    $("#preview").empty().append($("<button>").text("supprimer").attr("class", "btn btn-danger btn-sm").css("margin-top", "1rem"))
        .css({
            "margin-top": "1rem",
            "background-image": event.data.image.css("background-image")
        });
    var result = app.images.find(function (elem) {
        return (event.data.image.css("background-image") === 'url("' + elem.url + '")');
    });

    displayColors("image", result.color.image_colors);
    displayColors(colBackground[app.lang], result.color.background_colors);
    displayColors(colForground[app.lang], result.color.foreground_colors);

    let image=event.data.image;
    
    $("#preview button").bind("click", () => {
        onClickDelete(event, image);
        displayImages();
   
    })
};

/**
 * Affichage des images de la gallerie
 */

export const displayImages = () => {
    $("#gallery").empty();
    for (let key in app.images) {

        let noImageDisplay = () => {
            $("#gallery").append($("<div>")
                .text(`Image ${app.images[key].nom} | le format de l'image n'est pas accepté`)
                .attr("class", "col-6 col-md-4 col-lg-3 col-xl-3 p-1 border border-white alert alert-danger"))
                .css("height", "12rem");

        }
        let isImageDisplay = () => {

            $("#gallery").append($("<div>")
                .attr("class", "col-6 col-md-4 col-lg-3 col-xl-3 p-1 border border-white")
                .css({
                    "background-image": `url('${app.images[key].url}')`,
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                    "background-position": "center",
                    "height": "12rem",
                    "cursor": "pointer"

                }));
            let itemCol = $("#gallery div:last-child");
            itemCol.bind("click", { "image": itemCol }, onClickImage);

        }
        isExtensionValid(app.images[key].extension) ? isImageDisplay() : noImageDisplay();
    }
};