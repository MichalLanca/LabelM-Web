const blocks = document.querySelectorAll(".content section");
const saveButton = document.getElementById("saveBtn");

let images = [];
let uploadedImages = [];
let children;


document.addEventListener("DOMContentLoaded", async () => {
    // const response = await fetch("https://my-labelm.cz/api/html/about_us");
    const response = await fetch("http://localhost:8080/api/html/about_us");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    openBlock();

    await firstBlock(children[1]);
    await secondBlock(children[2]);
    await thirdBlock(children[3]);
    await fourthBlock(children[4]);

    updateChangedImages();
    updateVideo();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firtUpdated = updateFirstBlock(children[1], blocks[0], images);
    const secondUpdated = updateSecondBlock(children[2], blocks[1]);
    const thirdUpdated = updateThirdBlock(children[3], blocks[2], images);
    const fourthUpdated = updateFourthBlock(children[4], blocks[3], images);

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firtUpdated);
    div.appendChild(secondUpdated);
    div.appendChild(thirdUpdated);
    div.appendChild(fourthUpdated);

    await sendHTML(div.innerHTML);
    await sentImage(uploadedImages);
    location.reload();
})

async function firstBlock(html){
   blocks[0].querySelector("img").src = html.querySelector("section img").src;
   blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("section h1").textContent);
   blocks[0].querySelector("textarea").textContent= html.querySelector("section p").textContent;
}

async function secondBlock(html){
    blocks[1].querySelector("iframe").src = html.querySelector("iframe").src;
}

async function thirdBlock(html){
    const images = html.querySelectorAll("img");
    const paragpraphs = html.querySelectorAll("p");
    const imagesCMS = blocks[2].querySelectorAll("img");
    const inputs = blocks[2].querySelectorAll("textarea");
    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
    })
    paragpraphs.forEach((p, index) => {
        inputs[index].textContent = removeExtraSpaces(p.textContent);
    })
}

async function fourthBlock(html){
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[3].querySelectorAll("img");
    const titles = html.querySelectorAll("h2");
    const paragpraphs = html.querySelectorAll("p");
    const hrefs = html.querySelectorAll(".leading-snug.underline");
    const titlesCMS = blocks[3].querySelectorAll("input[type='text']");
    const textAreas = blocks[3].querySelectorAll("textarea");
    let indexT = 0;
    let indexA = 0;

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
        textAreas[index].textContent = removeExtraSpaces(paragpraphs[index].textContent);
    })  

    titlesCMS.forEach((title, index) => {
        if(index % 2 === 0){
            title.value = titles[indexT].textContent;
            indexT++
        } else {
            const urlParts = hrefs[indexA].href.split("/");
            const lastPart = urlParts[urlParts.length - 1];
            title.value = lastPart
            indexA++
        }
    });
}

function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages);
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;
    oldHtml.querySelector("p").textContent = cmsHtml.querySelector("textarea").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml){
    oldHtml.querySelector("iframe").src = cmsHtml.querySelector("iframe").src;

    return oldHtml;
}

function updateThirdBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
    const oldP = oldHtml.querySelectorAll("p");
    const newP = cmsHtml.querySelectorAll("textarea");
    oldP.forEach((p, index) => {
        p.textContent = newP[index].value;
    })

    return oldHtml;
}

function updateFourthBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
    const oldH2 = oldHtml.querySelectorAll("h2");
    const oldLinks = oldHtml.querySelectorAll("a");
    const oldP = oldHtml.querySelectorAll("p");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const newP = cmsHtml.querySelectorAll("textarea");
    let booleanH = true;
    let index = 0;

    newTexts.forEach((text) => {
        if(booleanH){
            oldH2[index].textContent = removeExtraSpaces(text.value);
            oldP[index].textContent = removeExtraSpaces(newP[index].value);
            booleanH = false;
        } else {
            oldLinks[index * 2].href = removeExtraSpaces(text.value);
            oldLinks[index * 2 + 1].href = removeExtraSpaces(text.value);
            index++;
            booleanH = true;
        }
    })

    return oldHtml;
}
function updateChangedImages() {
    const inputs = document.querySelectorAll("input[type='file']");
    const image = document.querySelectorAll(".content img")
    const imageURLpath = "../images/";

    inputs.forEach((input, index) => {
        input.setAttribute("id", index);
        input.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if(file){
                let url = URL.createObjectURL(file);   
                image[input.id].src = url;
                images.push(imageURLpath + file.name);
                uploadedImages.push(file);
                console
            }
        });
    })
}

function updateVideo(){
    const button = blocks[1].querySelector("button");
    const input = blocks[1].querySelector("input");
    const iframe = blocks[1].querySelector("iframe");

    button.addEventListener("click", function(){
        if(input.value != ""){
            iframe.src = input.value;
            input.value = "";
        }
    })
}

function updateImagesSource(oldOne, newOne, updatedImages){
    const oldImages = oldOne.querySelectorAll("img");
    const cmsImages = newOne.querySelectorAll("img");

    oldImages.forEach((oldImage, index) => {
        if(oldImage.src != cmsImages[index].src){
            oldImage.setAttribute("src", updatedImages[0])
            updatedImages.shift();
            if(oldImage.hasAttribute("srcset")){
                oldImage.removeAttribute("srcset");
                oldImage.onload = null;
            }
            console.log(oldImage.src);
        }
    })
}

async function sendHTML(html){
    try {
        const response = await fetch('http://localhost:8080/api/html/about_us', {
            method: 'POST', 
            headers: {
                'Content-Type': 'text/html' 
            },
            body: html
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se odeslat HTML obsah na server.');
        }

    } catch (error) {
        console.error('Chyba při odesílání HTML obsahu:', error);
    }
}

async function sentImage(files) {
    if (files.length !== 0) {      
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("image", file);
        });

        try {
            const response = await fetch('http://localhost:8080/api/upload/image', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const imagePath = await response.text();

            } else {
                console.error('Nastala chyba p�i nahr�v�n� obr�zku:', response.statusText);
            }
        } catch (error) {
            console.error('Nastala chyba p�i komunikaci se serverem.', error);
        }
    }
}
function openBlock(){
    const sections = document.querySelectorAll(".content section");
    sections.forEach((section) => {
    const tab = section.querySelector(".tab");
    const content = section.querySelector(".tab_content");
    const openCloseButton = section.querySelector(".open_exit_button");
    let rotate = false;

    openCloseButton.addEventListener("click", function(){

        if(!rotate){
            content.style.transition = "opacity 0.1s ease-in-out";
            content.style.opacity = "0";
            if(section.querySelector(".buttons")){
                section.querySelector(".buttons").style.opacity = "0";
            }
            openCloseButton.style.transition = "transform 0.2s ease-in-out";
            openCloseButton.style.transform = "rotate(180deg)";
            setTimeout(function(){
                tab.style.transition = "max-height 0.2s ease-in-out";
                tab.style.maxHeight = "0px";
            }, 200)
            rotate = true;
        } else if(rotate) {
            content.style.transition = "opacity 0.2s ease-in-out";
            setTimeout(() => {
                content.style.opacity = "1";
            }, "200")
            if(section.querySelector(".buttons")){
                section.querySelector(".buttons").style.opacity = "1";
            }
            openCloseButton.style.transition = "transform 0.2s ease-in-out";
            openCloseButton.style.transform = "rotate(0deg)";
            setTimeout(function(){
                tab.style.transition = "max-height 0.2s ease-in-out";
                tab.style.maxHeight = content.scrollHeight + "px";
            }, 200)
            rotate = false;
        }
    })

})
}

function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function responsiveMenu(){
    const nav = document.querySelector("nav");
    const navBtn = document.getElementById("navBtn");
    const exitNav = document.getElementById("exitNav");
    let openNav = false;
    const bg = document.createElement("div");
    const main = document.querySelector("main");
    bg.classList.add("h-full");
    bg.classList.add("w-screen");
    bg.classList.add("bg-black");
    bg.classList.add("bg-opacity-80");
    bg.classList.add("top-0");

    bg.classList.add("fixed");
    bg.classList.add("z-40");

    navBtn.addEventListener("click", () => {
        nav.style.display = "block";
        openNav = true;
        main.appendChild(bg);
    })

    exitNav.addEventListener("click", () => {
        nav.style.display = "none";
        openNav = false;
        main.removeChild(bg);})

    window.addEventListener("resize", () => {
        if(window.innerWidth >= 1024){
            nav.style.display = "block";
            openNav = false;
        } else {
            if(openNav != true){
                nav.style.display = "none";
            }
        }
    })
}