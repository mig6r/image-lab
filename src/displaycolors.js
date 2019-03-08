import $ from "jquery";
import { infoNbImages } from "./infonbimages";
import { space } from "./app";
import { infoClick } from "./features";
let app = space();



export const displayColors = (category, imgColors) => {

    $("#colors").append($("<div>").text(category)
        .attr("class", "col-4 text-white bg-info mt-2 ml-1 p-1 text-center rounded-top font-weight-bold"));

    imgColors.forEach(value => {
        $("#colors").append($("<div>").text(`${value.closest_palette_color} [ ${value.html_code} ]
         [ ${Math.round(value.percent)}% ]`).attr("class", "col-12 text-white p-2").css({
            "background-color": value.html_code,
            //"font-weight" : "bold",
            "mine-height": "30px",
            //"text-shadow": "#000000 2px 0px",
            "text-shadow": "1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000, -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000"
            
            
        }));
    });

}

/**
     * 
     * @param {Event} event 
     * @param {Variable} key 
     */
export const onClickDelete = (event, image) => {
    $("#colors").empty();
    const result = app.images.find(function (elem) {
        //return (image.css("background-image") === 'url("' + elem.url + '")');
        return (image.css("background-image") === `url("{$elem.url}")`);
    });
    app.images.splice(app.images.indexOf(result), 1);
    window.localStorage.setItem(app.namespace, JSON.stringify(app));
    $("#preview").css("background-image", "");
    $("#preview").empty();
    $("#infoGallery").empty();
    infoNbImages();
    infoClick();

};
