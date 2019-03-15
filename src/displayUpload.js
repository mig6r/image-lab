import $ from "jquery";
import { isGalleryFull } from "./check.js";
import { pushImage } from "./gallery";
import { displayImages, onClickImage } from "./displayImages";
import { space } from "./app";
import { infoNbImages } from "./infonbimages";

const app = space();

let textButton = {
    FR: "Télécharger une image",
    EN: "Upload your image"
}

let txtUrl = {
    FR: "Adresse url de votre image",
    EN: "Your picture url"
}

let btSendUrl = {
    FR: "Envoyer l'url",
    EN: "Send the url"
}

let textGalleryFull = {
    FR: "Ajout impossible, gallerie pleine",
    EN: "Impossible to add image, gallery is full"
}
let textEnvoi = {
    FR: "Envoi en cours",
    EN: "Uploaod in progress"
}


/**
     * Affichage du bouton d'ajout d'images
     * On vérifie que le nombre d'images dans la gallerie ne dépasse pas la valeur max. On affiche ensuite le bouton d'upload si le nombre est inférieur oubien un texte si il est supérieur ou égal
     */
export const displayButton = () => {
    $("#url").empty();
    $("#upload").empty();
    if (!isGalleryFull()) {

        $("#upload").append($("<button>").text(textButton[app.lang]).attr("class", "btn btn-info"));


        $("#url").append($("<form>").attr({ "action": "", "method": "GET" })
            .append($("<div>").attr("class", "input-group mb-3")
                .append($("<input>").attr({
                    "type": "url",
                    "required": "required",
                    "class": "form-control",
                    "name": "inputNameUrl",
                    "id": "inputNameUrl",
                    "placeholder": txtUrl[app.lang]
                }))
                .append($("<div>").attr("class", "input-group-append")
                    .append($("<button>").text(btSendUrl[app.lang]).attr({ "type": "submit", "class": "btn btn-info" }))
                )
            ));

        $("form").bind("submit", onSubmitForm);

    
        $("#file")[0].value="";

        $("#file").bind("change", onChangeFile);

        $("#upload > button:first-child").bind("click", function (e) {
            $("#file").trigger("click");
        }
        );
        return;
        // //si le return n'est pas fait dans le if, la fonction continue 
    }
    $("#upload").append($("<b>").text(textGalleryFull[app.lang]));
    
}


export const spinner = () => {
    $("#upload").empty();
    $("#url").empty();
    $("#url").append($("<div>").attr("class", "col-12 text-center").append($("<div>").attr({ "class": "spinner-border text-info", "role": "statuts" }))
        .append($("<span>").attr("class", "sr-only").text("loading")).append($("<div>").attr("class", "col-12 text-center").text(textEnvoi[app.lang])));
}


/**
* 
* @param {Event} event 
* @param {Variable} formUrl 
*/
const onSubmitForm = (event) => {
    let fichierImage = $("form input[type=\"url\"]").val();
    $("#file").unbind("change");
    spinner();
    
    event.preventDefault();
    
    $.ajax({
        url: "https://api.imagga.com/v2/colors?image_url=" + fichierImage,
        method: "GET",
        headers: {
            "Authorization": "Basic YWNjX2ZlMWVkNmU4MjFmYzkzOTo0ZmIyYjc4NGIzYzlkYzkxOWRhMDFlNGJmMTRmOGVlYg=="
        },


        success: (data) => {
            let str = fichierImage;
            let strSplit = str.split(".");
            var extension =  strSplit[strSplit.length - 1];
            pushImage(
                data.result.colors,
                fichierImage,
                fichierImage,
                extension
            );
            displayButton();
            displayImages();
            infoNbImages();
           
            $("#gallery div:last-child").trigger("click");
            
            
            window.localStorage.setItem(app.namespace, JSON.stringify(app));
        },

        error: () => {
            alert("format non pris en charge");
        },

    });
};

/**
 * 
 * @param {Event} event 
 * @param {File} uploadedFile 
 */

function onChangeFile(event) {
    
    $("#file").unbind("change");
    spinner();
    
    var uploadedFile = new FormData;
    let myFile = event. target. files[0];
    uploadedFile.append("image", myFile);
    let strSplit = myFile.name.split(".");
    var extension =  strSplit[strSplit.length - 1];
    $.ajax({
        url: "https://api.imagga.com/v2/colors",
        method: "POST",
        data: (uploadedFile),
        contentType: false,
        processData: false,
        headers: {
            "Authorization": "Basic YWNjX2ZlMWVkNmU4MjFmYzkzOTo0ZmIyYjc4NGIzYzlkYzkxOWRhMDFlNGJmMTRmOGVlYg=="
        },

        success: (data) => {
            var reader = new FileReader;
            reader.onload = function () {
                pushImage(
                    data.result.colors,
                    reader.result,
                    myFile.name,
                    extension
                );
               
                displayButton();
                displayImages();
                infoNbImages();
                $("#gallery div:last-child").trigger("click");
                window.localStorage.setItem(app.namespace, JSON.stringify(app));
            };
            reader.onerror = function (event) {
                alert("Fonction readAsDataURL en erreur");
            };
            reader.readAsDataURL(event. target. files[0]);
        },

        error: () => {
            alert("format non pris en charge");
        },

    });
}