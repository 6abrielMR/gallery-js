let mainClass = "galleryjs";

// Se obtienen todas las imagenes con la clase 'galleryjs'
let imgs = document.querySelectorAll(`.${mainClass}`);
let mc = CreateMainContent();
let df = document.createDocumentFragment();

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
    console.log('Primer numero: ' + firstRandomNumber);
    max += firstRandomNumber;
    let magicRandomNumber = Math.round(Math.random()*(max-min)+min);
    console.log('Numero maximo: ' + max);
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

// Modificar el tamaño para todas las imagenes
imgs.forEach(img => {
    let ci = document.createElement("div");
    let selectImage = SelectImage(img.getAttribute("src").length);
    
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "20px";
    
    ci.appendChild(img);

    if (selectImage == 1) {
        ci.style.gridColumn = "span 2";
    } else if (selectImage == 2){
        ci.style.gridRow = "span 2";
    }

    df.appendChild(ci);
});

mc.appendChild(df);
document.body.appendChild(mc);
