import { openBlock, removeExtraSpaces, responsiveMenu } from "./functions/menu-blocks-spaces";
import { sendHTML } from "./functions/send-updated-HTML";
import { updateChangedImages, updateImagesSource, sentImage } from "./functions/update-images";


const blocks = document.querySelectorAll(".content section");
const saveButton = document.getElementById("saveBtn");

let children;
let div;
let imgArray = []
let updatedImg = []
blocks.forEach((block) => {
    imgArray.push([])
    updatedImg.push([])
})


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:8080/api/html/my_labelm");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    openBlock();
    responsiveMenu();

    firstBlock(children[1]);
    secondBlock(children[2]);
    thirdBlock(children[3]);
    fourthBlock(children[4]);
})

saveButton.addEventListener("click", async () => {
    const firtUpdated = updateFirstBlock(children[1], blocks[0], updatedImg[0]);
    const secondUpdated = updateSecondBlock(children[2], blocks[1]);
    const thirdUpdated = updateThirdBlock(children[3], blocks[2], updatedImg[2]);
    const fourthUpdated = updateFourthBlock(children[4], blocks[3]);

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firtUpdated);
    div.appendChild(secondUpdated);
    div.appendChild(thirdUpdated);
    div.appendChild(fourthUpdated);

    await sendHTML(div.innerHTML, "http://localhost:8080/api/html/my_labelm");
    await sentImage();
    location.reload();
})



async function firstBlock(html){
    blocks[0].querySelector("img").src = html.querySelector("section img").src;
    blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("section h1").textContent);

    updatedImg[0] = updateChangedImages(imgArray[0], blocks[0], 0)
 }
 
 async function secondBlock(html){
    const texts = blocks[1].querySelectorAll("textarea");
    texts[0].textContent = removeExtraSpaces(html.querySelector("h2").textContent);
    texts[1].textContent = removeExtraSpaces(html.querySelector("p").textContent);
    texts[2].textContent = removeExtraSpaces(html.querySelector("h3").textContent);
 }
 
 async function thirdBlock(html){
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[2].querySelectorAll("img");
    const titles = html.querySelectorAll("h2");
    const paragpraphs = html.querySelectorAll("p");
    const hrefs = html.querySelectorAll("a");
    const titlesCMS = blocks[2].querySelectorAll("input[type='text']");
    const textAreas = blocks[2].querySelectorAll("textarea");
    let indexT = 0;

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
        textAreas[index].textContent = removeExtraSpaces(paragpraphs[index].textContent);
    })  
    titlesCMS.forEach((title, index) => {
        if (index % 2 === 0) {
            title.value = titles[indexT].textContent;
            indexT++;
        } else {
            title.value = hrefs[index].href;
        }
    });

    updatedImg[2] = updateChangedImages(imgArray[2], blocks[2], 0)
 }
 
 async function fourthBlock(html){

    const texts = blocks[3].querySelectorAll("textarea");
    texts[0].textContent = removeExtraSpaces(html.querySelector("p").textContent);
    texts[1].textContent = html.querySelector("h2").textContent;
    texts[2].textContent = html.querySelector("a").href;
    texts[3].textContent = html.querySelector("a").textContent;

    updatedImg[3] = updateChangedImages(imgArray[3], blocks[3], 0)
 }

function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages);
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml){
    const texts = cmsHtml.querySelectorAll("textarea");
    oldHtml.querySelector("h2").textContent = removeExtraSpaces(texts[0].value);
    oldHtml.querySelector("p").textContent = removeExtraSpaces(texts[1].value);
    oldHtml.querySelector("h3").textContent = removeExtraSpaces(texts[2].value);

    return oldHtml;
}

function updateThirdBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH2 = oldHtml.querySelectorAll("h2");
    const oldLinks = oldHtml.querySelectorAll("a");
    const oldP = oldHtml.querySelectorAll("p");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const newP = cmsHtml.querySelectorAll("textarea");

    let indexH = 0;
    let indexHref = 0

    newTexts.forEach((text, index) => {
        if(index % 2 === 0){
            oldH2[indexH].textContent = removeExtraSpaces(text.value);
            indexH++;
        } else {
            oldLinks[indexHref].href = removeExtraSpaces(text.value);
            oldLinks[indexHref + 1].href = removeExtraSpaces(text.value);
            indexHref += 2;
        }
    })
    

    oldP.forEach((p, index) => {
        p.textContent = removeExtraSpaces(newP[index].value);
    })

    return oldHtml;
}

function updateFourthBlock(oldHtml, cmsHtml){
    const texts = cmsHtml.querySelectorAll("textarea");
    oldHtml.querySelector("p").textContent = texts[0].value;
    const newHref = oldHtml.querySelector("a");
    newHref.href = texts[2].value;
    newHref.textContent = texts[3].value;
    oldHtml.querySelector("h2").textContent = texts[1].value;
    oldHtml.querySelector("h2").appendChild(newHref);

    return oldHtml
}
