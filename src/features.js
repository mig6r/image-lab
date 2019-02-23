import $ from "jquery";
import {space} from "./app";
const app = space();

var infoClickImage = {
    FR: "Cliquez sur une image de votre gallerie ou téléchargez une nouvelle image",
    EN: "Click on gallery image or upload a new picture"
}

export const infoClick = () => {
$("#colors").append($("<div>").text(infoClickImage[app.lang])
.attr("class","alert alert-primary font-weight-bold text-center")
.css("width","100%"));
};

