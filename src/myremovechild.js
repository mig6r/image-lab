    /**
     * 
     * @param {HTMLelement} node 
     */
    export function myRemoveChild(node) {
        if (node instanceof HTMLElement === false) {
            throw new Error("Un élement HTML est attendu dans la première variable de la fonction 'myRemoveChild'");
        }
        while (node.childNodes.length) {
            node.removeChild(node.childNodes[0]);
        }
    }