    /**
     * Ajout d'attributs après l'insertion d'un élément
     * La fonction récupère un élément du dom qu'on lui envoi et applique autant de setAttribute qu'il y a de propriétés dans l'objet "attributs"
     * @param {HTMLelement} element 
     * @param {Object} attributs 
     */
   export  function setMyAtt(element, attributs) {
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