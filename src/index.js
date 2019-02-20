"use strict";

(function () {
    
    //localStorage

    var app = {
        namespace: "mycolors_app",
        images: [],
        lang: "FR"

    }

    







    //string

    //var namespace = "mycolors_app";
    var urlImg = "assets/images";
    var dateUpload = "?";
    //var lang = "EN";
    var browser = "mobile";

    //number
    var maxFileSize = 10;
    var maxFileGallery = 24;
    var nightMode = false;

    //Array
    var imgExtentions = [];
    var userInfos = [];

    
    
    
    /* if(!images){
        images=[];
    }
*/
    //console.log(localStorage.getItem(namespace));


    var menuItems = [];



    //push des éléments dans les tableaux
    imgExtentions.unshift("jpg", "png", "gif");

 


    //traductions
    var titre = {
        FR: "Affichez vos couleurs",
        EN: "Display your colors"
    }


   var traduction = {

        titre: titre
    }


    var textButton = {
        FR: "Télécharger une image",
        EN: "Upload your image"
    }

    var textGalleryFull = {
        FR: "Ajout impossible, gallerie pleine",
        EN: "Impossible to add image, gallery is full"
    }

    var textBtLang = {
        FR: "Langue",
        EN: "Language"
    }

    var txtExtAllowed = {
        FR: "Extension acceptées",
        EN: "Allowed extensions"
    }


    var txtNbImages = {
        FR: "images dans votre gallerie",
        EN: "pictures in your gallery"
    }

    var txtNoImages = {
        FR: "Il n'y a pas d'image dans votre gallerie",
        EN: "No picture in your gallery"
    }

    var btSendUrl = {
        FR: "Envoyer l'url",
        EN: "Send the url"
    }

    var txtUrl = {
        FR: "Adresse url de votre image",
        EN: "Your picture url"
    }

    var infoClickImage = {
        FR: "Cliquez sur une image de votre gallerie ou téléchargez une nouvelle image",
        EN: "Click on gallery image or upload a new picture"
    }

    var colBackground = {
        FR: "Arrière Plan",
        EN: "Background"
    }

    var colForground = {
        FR: "Premier Plan",
        EN: "Forground"
    }

    //Elements du node que l'on veut récupérer
    var menu = window.document.querySelector(".navbar-nav.ml-auto");
    var gallery = window.document.querySelector("#gallery");
    var langue = window.document.querySelector("header .langue");
    var message = window.document.querySelector("main .message");
    var uploadBt = window.document.getElementById("upload");
    var footer = window.document.querySelector("footer.bottom");
    var infoImg = window.document.querySelector("#infoGallery");
    var btLang = window.document.getElementById("btLang");
    var preview = window.document.getElementById("preview");
    var file = window.document.getElementById("file");
    var uploadUrl = window.document.getElementById("url");
    var divColors = window.document.getElementById("colors");
    var langFr = window.document.getElementById("langFr");
    var langEn  = window.document.getElementById("langEn");
    



    //Récupération du contenu du stockage
    function checkSpace(lang){
        
        myRemoveChild(colors);
        
        var loadSpace = JSON.parse(window.localStorage.getItem(app.namespace));
        if (loadSpace === null) {
            app.images = [];
            app.lang = lang;
    
        } else {
            app.images = loadSpace.images;
            app.lang = loadSpace.lang;
        }
        var textInColors = textInElement("div", infoClickImage[app.lang], colors);
        
        textInColors.setAttribute("class", "alert alert-primary font-weight-bold text-center");
        textInColors.style.width = "100%";
    }
    checkSpace(app.lang);




   
    function selectLang(lang){
        

        if ("undefined" != typeof lang) {
            app.lang = lang;
            window.localStorage.setItem(app.namespace, JSON.stringify(app));
        }
        myRemoveChild(btLang);
        var textInBtLang = window.document.createTextNode(translate(textBtLang) + " (" + app.lang + ")");
        btLang.appendChild(textInBtLang); 
        
        if ("undefined" != typeof lang) {
        location.reload();  
        }
        
    }


    selectLang();
   
   
    langFr.onclick = function (event) {
        selectLang("FR");
    };

    langEn.onclick = function (event) {
        selectLang("EN");
    };
 


console.log(app);
    

    //window.localStorage.setItem("foo", pushImage);


    //fonctions

    /**
     * Traduction dans la bonne langue
     * On récupère l'objet à traduire et on retrouve la propriété correspondant à la variable lang pour retourner la phrase dans la bonne langue
     * @param {Variable} itemToTranslate 
     */
    function translate(itemToTranslate) {
        if ("object" !== typeof itemToTranslate) {
            throw new Error("Un type objet est attendu dans la fonction 'translate'");
        }
        for (var prop in itemToTranslate) {
            if (app.lang === prop) {
                var translation = itemToTranslate[prop];
                return (itemToTranslate[prop]);
            }
        }

    }

    /**
     * Ajout des Items au menu
     * On ajoute une variable de type objet à l'array "menuItems"
     * @param {variable} lang
     * @param {String} nom 
     * @param {String} url 
     */
    function pushItems(lang, nom, url) {

        menuItems.push({
            lang: lang,
            nom: nom,
            url: url
        });
    }
    pushItems("FR", "Accueil", "index.php");
    pushItems("EN", "Home", "index.php");
    pushItems("FR", "Gallerie", "gallerie.php");
    pushItems("EN", "Gallery", "gallerie.php");
    pushItems("FR", "Contact", "mait to :'s.opros@gmail.com'");
    pushItems("EN", "Contact", "mait to :'s.opros@gmail.com'");


    /**
     * On ajoute les images dans la variable "images"
     * On fait un push des images sous forme d'object dans le variable "images" qui est de type array
     * @param {String} url 
     * @param {String} nom 
     * @param {String} extension 
     */
    function pushImage(color, url, nom, extension) {
        
        app.images.push({
            url: url,
            nom: nom,
            color: color,
            extension: extension,
            alt: nom
        });
        
    }

    //pushImage("color", "assets/images/aventador.jpg", "nom", "jpg");
    //pushImage("color, assets/images/488pista.jpg", "488pista", "jpg");

    /**
     * Vérifie si la gallerie est pleine
     * La fonction retourne "true" si le nombre d'images est égal ou supérieur au max d'images définies dans la variable maxFileGallery
     */
    function isGalleryFull() {
        return app.images.length >= maxFileGallery;
    }

    /**
     * Vérification de l'extension de la photo uploadée
     * On vérifie que l'image porte une extension qui est déclarée dans le tableau "imgExtensions"
     * @param {Object} image 
     * @returns {Boolean}
     */
    function isExtensionValid(image) {
        for (var key in imgExtentions) {
            if (imgExtentions[key] === image.extension) {
                return true;
            }
        }
        return false;
    }


    /**
     * Ajout d'attributs après l'insertion d'un élément
     * La fonction récupère un élément du dom qu'on lui envoi et applique autant de setAttribute qu'il y a de propriétés dans l'objet "attributs"
     * @param {HTMLelement} element 
     * @param {Object} attributs 
     */
    function setMyAtt(element, attributs) {
        if (element instanceof HTMLElement === false) {
            throw new Error("Un élement HTML est attendu dans la première variable de la fonction 'setMyAtt'");
        }
        if ("object" !== typeof attributs) {
            throw new Error("Un type objet est attendu dans la deuxième variable de la fonction 'setMyAtt'");
        }
        for (var prop in attributs) {
            element.setAttribute(prop, attributs[prop]);
        }

    }


    /**
     * Création du menu de navigation
     * On récupère les éléments de menuItems (objets dans un tableau) et on cré les li et href uniquement si leur propriété correspond à langue en cours
     * 
     */
    function displayMenuItems() {

        for (var key in menuItems) {
            if (app.lang === menuItems[key].lang) {
                var itemLi = textInElement("li", "", menu);
                setMyAtt(itemLi, { class: "nav-item" })
                var ajoutMenu = textInElement("a", menuItems[key].nom, itemLi);
                setMyAtt(ajoutMenu, { class: "nav-link text-right pt-1 pb-1", href: menuItems[key].url, style: "font-family: 'Baloo Thambi', cursive; font-size: 1.3rem;" });


            }
        }
    }
    /**
     * Affichage du titre
     * On crée une balise "h1" dans laquelle on insert le titre puis on la place dans le div main qui a la classe message (var message)
     * On utilise pour cela notre fonction textInElement qui se charge de construire la balise et d'y ajouter le texte (traduit par la fonction translate)
     */
    function displayTitle() {
        var createBaliseMessage = textInElement("h1", titre[app.lang], message);
    }

    /**
     * 
     * @param {string} tagname 
     * @param {String} text 
     * @param {HTMLElement} target 
     * @return {HTMLElement}
     */
    function textInElement(tagname, text, target) {

        if ("string" !== typeof tagname) {
            throw new Error("La fonction textInElement demande un élément HTML dans le premier parametre");
        }
        var newElement = window.document.createElement(tagname);
        if ("undefined" != typeof text) {
            var createTextElement = window.document.createTextNode(text);
            newElement.appendChild(createTextElement);
        }
        if (target instanceof HTMLElement) {
            target.appendChild(newElement);
        }
        return newElement;

    }

    /**
     * Affichage du bouton d'ajout d'images
     * On vérifie que le nombre d'images dans la gallerie ne dépasse pas la valeur max. On affiche ensuite le bouton d'upload si le nombre est inférieur oubien un texte si il est supérieur ou égal
     */
    function displayButton() {
        if (!isGalleryFull()) {
            var btUpload = textInElement("button", textButton[app.lang], uploadBt);
            btUpload.setAttribute("class", "btn btn-info");           
           var formUrl = textInElement("form", "", uploadUrl);
            formUrl.setAttribute("action", "");
            formUrl.setAttribute("method", "GET");
           var formGroup = textInElement("div", "", formUrl);
           formGroup.setAttribute("class", "input-group mb-3");
            var inputUrl = textInElement("input", "", formGroup);
            inputUrl.setAttribute("type", "url");
            inputUrl.setAttribute("required", "required");
           inputUrl.setAttribute("class", "form-control")
            inputUrl.setAttribute("name", "inputNameUrl");
            inputUrl.setAttribute("id", "inputNameUrl");
            inputUrl.setAttribute("placeholder", txtUrl[app.lang]);
           var formGroup2 = textInElement("div", "", formGroup);
           formGroup2.setAttribute("class", "input-group-append");
           var inputSubmit = textInElement("button", btSendUrl[app.lang], formGroup2);
           inputSubmit.setAttribute("type", "submit");
           inputSubmit.setAttribute("class", "btn btn-info");
            
           //Bouton envoyer de l'image donnée en URL
          /*
           formUrl.addEventListener("submit", function (event) {
                onSubmitForm(event, this);
                //onSubmitForm.call(this, event);

            });
            */
           formUrl.addEventListener("submit", onSubmitForm);


            //On simule le clique sur le input avec le div btUpload
            btUpload.addEventListener("click", function (e) {
                file.click();
                console.log(this);
            });
            //On declenche la fonction de l'api POST lorsque le input est click
            
            /*
            file.addEventListener("change", function (event) {
                onChangeFile(event, this.files[0], this.files[0].name);
            });
            */
            file.addEventListener("change", onChangeFile);

            return;

            //si la condition est vérifié le return fait sortir de la fonction
        }
        //si le return n'est pas fait dans le if, la fonction continue
        textInElement("b", textGalleryFull[app.lang], uploadBt);

    }

    /**
     * 
     * @param {Event} event 
     * @param {Variable} formUrl 
     */
    function onSubmitForm(event) {
        this['inputNameUrl'].disabled = true;
        
        event.preventDefault();
        //console.log(inputUrl.value);
        //var urlImage = console.log(formUrl['inputNameUrl'].value);
        var xhr = new XMLHttpRequest;
        // Ouvrir une connection
        xhr.open("GET", "https://api.imagga.com/v2/colors?image_url=" + this['inputNameUrl'].value);
        // Enregistrer des events handlers
        var formUrl = this;

        xhr.onload = function (event) {

            var colorObject = JSON.parse(this.responseText);

            if (200 === this.status) {
                //pushImage("assets/images/488pista.jpg", "488pista", "jpg");
                
                pushImage(
                    colorObject.result.colors,
                    formUrl['inputNameUrl'].value,
                    formUrl['inputNameUrl'].value,
                    null
                );
                formUrl['inputNameUrl'].value="";
                formUrl['inputNameUrl'].disabled = false;
                displayImages();
                infoNbImages()
                //onClickImage("click", gallery.lastChild);
                onClickImage.call(gallery.lastChild);
                window.localStorage.setItem(app.namespace, JSON.stringify(app));
                //gallery.lastChild.click();               
                return;
            }
            alert("format");
        };
        //Customize headers
        xhr.setRequestHeader("Authorization", "Basic YWNjX2ZlMWVkNmU4MjFmYzkzOTo0ZmIyYjc4NGIzYzlkYzkxOWRhMDFlNGJmMTRmOGVlYg==");
        xhr.send();
    }

    /**
     * 
     * @param {Event} event 
     * @param {File} uploadedFile 
     */
    function onChangeFile(event) {

        //Avoir le client
        var xhr = new XMLHttpRequest;
        // Ouvrir une connection
        xhr.open("POST", "https://api.imagga.com/v2/colors");
        // Enregistrer des events handlers
        var uploadedFile = this.files[0];

        xhr.onload = function (event) {

            if (200 === this.status) {
                var colorObject = JSON.parse(this.responseText);
                var reader = new FileReader;
                reader.onload = function () {
                    pushImage(
                        colorObject.result.colors,
                        reader.result,
                        name,
                        null
                    );
                    displayImages();
                    infoNbImages()
                    //onClickImage("click", gallery.lastChild);
                    //gallery.lastChild.onclick();
                    onClickImage.call(gallery.lastChild);
                    window.localStorage.setItem(app.namespace, JSON.stringify(app));
                };
                reader.onerror = function (event) {
                    alert("Fonction readAsDataURL en erreur");
                };
                reader.readAsDataURL(uploadedFile);
                return;
            }
            alert("Le statut xhr n'est pas à 200");
        };

        //Customize headers
        xhr.setRequestHeader("Authorization", "Basic YWNjX2ZlMWVkNmU4MjFmYzkzOTo0ZmIyYjc4NGIzYzlkYzkxOWRhMDFlNGJmMTRmOGVlYg==");

        var body = new FormData;
        body.append("image", uploadedFile);
        // envoyer la requette
        xhr.send(body);


    }



    /**
     * Affichage des infos sur le bandeau gallery
     * On test si des images sont présentes dans la gallerie, puis en fonction, on affiche le nombre d'images ou on informe que la gallerie est vide
     */
    function infoNbImages() {
        myRemoveChild(infoImg);
        var informeNbImages = translate(txtNoImages);
        supBouton.style.display="none";
        if (app.images.length) {
           
            var informeNbImages =  app.images.length + " " + translate(txtNbImages) + " (" + maxFileGallery + " max)";
            
           // supBouton.addEventListener("click", clearImages);
            supBouton.style.display="block";
        }
        textInElement("h6", informeNbImages, infoImg);
    }



    /**
     * Affichage des images de la gallerie
     */
    function displayImages() {
        myRemoveChild(gallery);

        for (var key in app.images) {
            var itemCol = window.document.createElement("div");
            itemCol.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-3 p-1 border border-white");

            if (null === app.images[key].extension || isExtensionValid(app.images[key])) {
                itemCol.setAttribute("style", "background-image: url('" + app.images[key].url + "'); background-size: cover; background-repeat:no-repeat; background-position:center; height:12rem; cursor: pointer");
                registerEvent(itemCol);

            } else {
                itemCol.appendChild(document.createTextNode("Image : " + app.images[key].nom + "| le format de l'image n'est pas accepté"));
                itemCol.setAttribute("class", "alert alert-danger");
            }
            gallery.appendChild(itemCol);
        }
    }

    function registerEvent(key) {
        //key.addEventListener("click", function (e) {
        // onClickImage(e, key)
        //});
        key.addEventListener("click", onClickImage);
    }

    /**
     * Affichage de la liste des extensions acceptées dans le footer
     * On cré dans un premier temps le h6 que l'on ajoute au footer
     */
    function displayExtension() {
        
        textInElement("h6", translate(txtExtAllowed), footer);
        var ulExtensions = textInElement("ul", "", footer)
        setMyAtt(ulExtensions, { class: "m-0 p-0" })

        for (var key in imgExtentions) {
            var liExtension = textInElement("li", imgExtentions[key], ulExtensions);
            setMyAtt(liExtension, { class: "d-inline pl-2 pr-2 pb-1 m-2 bg-secondary text-white" });
        }
    }

    /**
     * 
     * @param {HTMLelement} node 
     */
    function myRemoveChild(node) {
        if (node instanceof HTMLElement === false) {
            throw new Error("Un élement HTML est attendu dans la première variable de la fonction 'myRemoveChild'");
        }
        while (node.childNodes.length) {
            node.removeChild(node.childNodes[0]);
        }
    }

    /**
     * 
     * @param {*} event 
     * @param {*} key 
     */
    function onClickImage(event) {
       var key = this;
        myRemoveChild(colors);
        myRemoveChild(preview);
        var result = app.images.find(function (elem) {
            //si cela avait été une image, on aurait fait un getAttribute
            // return elem.url === images.key.getAttribute("src");         
            return (key.style.backgroundImage === 'url("' + elem.url + '")');
        });    
        displayColors("image", result.color.image_colors);
        displayColors(colBackground[app.lang], result.color.background_colors);
        displayColors(colForground[app.lang], result.color.foreground_colors); 
        //Si l'élément est une image
        //preview.style.backgroundImage = "url(" + key.getAttribute("src") + ")";   
        //Si l'élément est un div avec un background
        preview.style.backgroundImage = key.style.backgroundImage;
        //key.style.display = "none";
        //si l'élement envoyé est un objet :
        //preview.style.backgroundImage = "url('" + key.url + "')";    
        var btSup = textInElement("button", "supprimer", preview);
        btSup.style.marginTop = "1em";
        btSup.setAttribute("class", "btn btn-danger btn-sm")
        btSup.addEventListener("click", function (event) {
        onClickDelete(event, key)
        });
    }

    function displayColors (category, imgColors){
        //console.log(imgColors);
        var divColorImg = textInElement("div", category, colors);
        divColorImg.setAttribute("class", "col-4 text-white bg-info mt-2 ml-1 p-1 text-center rounded-top font-weight-bold");
        for (var key in imgColors) {
            var monDiv = window.document.createElement("div");
            var monDivText = window.document.createTextNode(
                imgColors[key].closest_palette_color
                + " [ " + imgColors[key].html_code  + " ]"
                + " [ " + Math.round(imgColors[key].percent) + "% ]"
            );
            monDiv.appendChild(monDivText);
            monDiv.setAttribute("class", "col-12 text-white p-2");
            monDiv.style.backgroundColor = imgColors[key].html_code;
            monDiv.style.minHeight = "30px";
            monDiv.style.textShadow = "#000000 2px 0px 2px";
            divColors.appendChild(monDiv);
        }
    }
    

    /**
     * 
     * @param {Event} event 
     * @param {Variable} key 
     */
    function onClickDelete(event, key) {
        myRemoveChild(colors);
        var result = app.images.find(function (elem) {
            //si cela avait été une image, on aurait fait un getAttribute
            // return elem.url === images.key.getAttribute("src");         
            return (key.style.backgroundImage === 'url("' + elem.url + '")');
        })
        app.images.splice(app.images.indexOf(result), 1);
        myRemoveChild(infoImg);
        window.localStorage.setItem(app.namespace, JSON.stringify(app));
        infoNbImages();
        displayImages();

        preview.style.backgroundImage = "url('assets/image.png')";
        myRemoveChild(preview);
    }

    var supBouton = textInElement("button", "Tout supprimer", supGallery);
    supBouton.setAttribute("class", "btn btn-secondary btn-sm");

    supBouton.addEventListener("click", eraseSpace);


    
        //insertion des élements dans le DOM

        displayTitle();
        displayMenuItems();
        displayButton();
        infoNbImages();
        displayImages();
        displayExtension();
        

        function eraseSpace(event){
            localStorage.clear();
            checkSpace(app.lang);
            //myRemoveChild(infoImg);
            
            infoNbImages();
            myRemoveChild(preview);
            preview.style.backgroundImage = "url('assets/image.png')";
            displayImages();
        }


})();