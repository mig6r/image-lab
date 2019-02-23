import { space } from "./app";
const app = space();

/**
 * Vérifie si la gallerie est pleine
 * La fonction retourne "true" si le nombre d'images est égal ou supérieur au max d'images définies dans la variable maxFileGallery
 */
export const  isGalleryFull = () => {
    return app.images.length >= 10;
}

/**
 * Vérification de l'extension de la photo uploadée
 * On vérifie que l'image porte une extension qui est déclarée dans le tableau "imgExtensions"
 * @param {Object} image 
 * @returns {Boolean}
 */
export const isExtensionValid = (image) => {
    // imgExt.forEach(value => {
    //     if (value === image) {
    //         return true;
    //     }
    // })
    for (var key in app.imgExt){
        if (app.imgExt[key] === image) {
         return true;
        }
    }
    //return false;
}
