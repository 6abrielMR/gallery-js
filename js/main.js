let mainClass = "galleryjs";
let imgToLoad = document.getElementById("imgToLoad");
imgToLoad.style.display = "none";

// Se obtienen todas las imagenes con la clase 'galleryjs'
let imgs = document.querySelectorAll(`.${mainClass}`);
let mc = CreateMainContent();
let df = document.createDocumentFragment();

let previewImage = document.createElement("img");
previewImage.style.position = "absolute";
previewImage.style.top = "0";
previewImage.style.left = "0";
previewImage.style.right = "0";
previewImage.style.bottom = "0";
previewImage.style.margin = "auto";

let contentCloseImage = document.createElement("div");
contentCloseImage.style.width = "100%";
contentCloseImage.style.height = "100%";
contentCloseImage.onclick = CloseImage;

let fade = document.createElement("div");
fade.style.display = "flex";
fade.style.flexDirection = "column";
fade.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
fade.style.position = "fixed";
fade.style.pointerEvents = "none";
fade.style.opacity = "0";
fade.style.top = "0";
fade.style.left = "0";
fade.style.height = "100vh";
fade.style.width = "100vw";
fade.style.transition = "opacity 0.3s ease";
fade.appendChild(previewImage);
fade.appendChild(contentCloseImage);

document.body.appendChild(fade);

function CreateMainContent() {
    let mainContent = document.createElement("div");
    mainContent.style.display = "grid";
    mainContent.style.gridTemplateColumns = "repeat(auto-fill, minmax(350px, 1fr))";
    mainContent.style.gridAutoRows = "minmax(350px, auto)";
    mainContent.style.gap = "20px";
    mainContent.style.padding = "20px";
    mainContent.style.gridAutoFlow = "dense";
    return mainContent;
}

function SelectImage(srcLength) {
    let min = 1;
    let max = srcLength;
    let firstRandomNumber = Math.round(Math.random()*(max-min)+min);
    max += firstRandomNumber;
    let magicRandomNumber = Math.round(Math.random()*(max-min)+min);
    if (magicRandomNumber >= srcLength && magicRandomNumber <= max) {
        if (magicRandomNumber % 2 == 0) {
            return 2;
        } else {
            return 1;
        }
    } else {
        return 0;
    }
}

function CloseImage(event) {
    imgToLoad.value = "";
    fade.style.pointerEvents = "none";
    fade.style.opacity = "0";
}

// Modificar el tamaño para todas las imagenes
imgs.forEach(img => {
    let ci = document.createElement("div");
    let selectImage = SelectImage(img.getAttribute("src").length);
    
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "20px";

    ci.appendChild(img);

    img.onclick = function (event) {
        imgToLoad.value = img.getAttribute("src");
        previewImage.src = imgToLoad.value;
        fade.style.pointerEvents = "auto";
        fade.style.opacity = "1";
    };

    if (selectImage == 1) {
        ci.style.gridColumn = "span 2";
    } else if (selectImage == 2){
        ci.style.gridRow = "span 2";
    }

    df.appendChild(ci);
});

mc.appendChild(df);
document.body.appendChild(mc);
