import {space} from "./app";
const app = space();
    /**
     * On ajoute les images dans la variable "images"
     * On fait un push des images sous forme d'object dans le variable "images" qui est de type array
     * @param {String} color
     * @param {String} url 
     * @param {String} nom 
     * @param {String} extension 
     */
    
   export const pushImage = (color, url, nom, extension) => {
        
        app.images.push({
            url: url,
            nom: nom,
            color: color,
            extension: extension,
            alt: nom
        });
        
    }
