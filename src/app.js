//localStorage

const app = {
    namespace: "mycolors_app",
    images: [],
    lang: "FR",
    imgExt : ["jpg", "png", "gif"],
    imgMax : "10"
};


export const space = () => {
    let loadSpace = JSON.parse(window.localStorage.getItem(app.namespace));

if (null !== loadSpace) {
    app.images = loadSpace.images;
    app.lang = loadSpace.lang;
}

    return app;
};

