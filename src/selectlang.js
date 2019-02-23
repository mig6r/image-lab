import {myRemoveChild} from "./myremovechild";
import {space} from "./app";
var app = space();

var btLang = window.document.getElementById("btLang");
var textBtLang = {
    FR: "Langue",
    EN: "Language"
};


export function selectLang(lang){
        

    if ("undefined" != typeof lang) {
        app.lang = lang;
        window.localStorage.setItem(app.namespace, JSON.stringify(app));
        
    }
    myRemoveChild(btLang);
    var textInBtLang = window.document.createTextNode(textBtLang[app.lang] + " (" + app.lang + ")");
    btLang.appendChild(textInBtLang); 
    
    if ("undefined" != typeof lang) {
    window.location.reload();  
    }
    
    
}