import $ from 'jquery';
import {space} from "./app";

const app = space();
let txtExtAllowed = {
    FR: "Extension acceptées",
    EN: "Allowed extensions"
}
    
    /**
     * Affichage de la liste des extensions acceptées dans le footer
     * On cré dans un premier temps le h6 que l'on ajoute au footer
     */
    export const displayExtension = () => {
        
        var ulExtensions = $("<ul>").attr("class","m-0 p-0")
        
        for (var key in app.imgExt) {
            ulExtensions.append($("<li>").text(app.imgExt[key])
            .attr("class","d-inline pl-2 pr-2 pb-1 m-2 bg-secondary text-white"));
        }
        $("footer.bottom").append($("<h6>").text(txtExtAllowed[app.lang])).append(ulExtensions)
    }