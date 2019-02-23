    /**
     * 
     * @param {string} tagname 
     * @param {String} text 
     * @param {HTMLElement} target 
     * @return {HTMLElement}
     */
    export function textInElement(tagname, text, target) {

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