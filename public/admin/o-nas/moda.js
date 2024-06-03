import { updateImagesSource, updateChangedImages, sentImage } from "../functions/update-images.js";
import { openBlock, removeExtraSpaces, responsiveMenu } from "../functions/menu-blocks-spaces.js";
import { sendHTML } from "../functions/send-updated-HTML.js";

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
    const response = await fetch("http://localhost:8080/api/html/about_us/fashion");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    await firstBlock(children[1]);
    await secondBlock(children[2]);
    await thirdBlock(children[3])

    openBlock();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firstUpdated = updateFirstBlock(children[1], blocks[0], updatedImg[0])
    const secondUpdated = updateSecondBlock(children[2], blocks[1], updatedImg[1])
    const thirdUpdated = updateThirdBlock(children[3], blocks[2], updatedImg[2])

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firstUpdated);
    div.appendChild(secondUpdated);
    div.appendChild(thirdUpdated);


    await sendHTML(div.innerHTML, "http://localhost:8080/api/html/about_us/fashion");
    await sentImage();
    location.reload();
})

async function firstBlock(html){
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[0].querySelectorAll("img");

    images.forEach((image, index) => {
        const relativeSrc = image.getAttribute('data-relative-src');
        if(relativeSrc){
            imagesCMS[index].src = "../" + relativeSrc
            imagesCMS[index].setAttribute("data-relative-src", "../" + relativeSrc)
        } else {
            imagesCMS[index].src = image.src;
        }
    })

    blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("section h1").textContent);
    blocks[0].querySelector("textarea").textContent= html.querySelector("section p").textContent;

    updatedImg[0] = updateChangedImages(imgArray[0], blocks[0], 1)
 }

async function secondBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const inputs = blocks[1].querySelectorAll("textarea");

    paragpraphs.forEach((p, index) => {
        inputs[index].textContent = removeExtraSpaces(p.textContent)
    })

    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[1].querySelectorAll("img");

    images.forEach((image, index) => {
        const relativeSrc = image.getAttribute('data-relative-src');
        if(relativeSrc){
            imagesCMS[index].src = "../" + relativeSrc
            imagesCMS[index].setAttribute("data-relative-src", "../" + relativeSrc)
        } else {
            imagesCMS[index].src = image.src;
        }
    })

    updatedImg[1] = updateChangedImages(imgArray[1], blocks[1], 1)
} 

async function thirdBlock(html){
    const titles = html.querySelectorAll("h2");
    const paragpraphs = html.querySelectorAll("p");
    const hrefs = html.querySelectorAll(".leading-snug.underline");
    const titlesCMS = blocks[2].querySelectorAll("input[type='text']");
    const textAreas = blocks[2].querySelectorAll("textarea");
    let indexT = 0;
    let indexA = 0;

    textAreas.forEach((t, index) => {
        if(paragpraphs[index]){
            t.textContent = removeExtraSpaces(paragpraphs[index].textContent);
        }
    })  

    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[2].querySelectorAll("img");

    images.forEach((image, index) => {
        const relativeSrc = image.getAttribute('data-relative-src');
        if(relativeSrc){
            imagesCMS[index].src = "../" + relativeSrc
            imagesCMS[index].setAttribute("data-relative-src", "../" + relativeSrc)
        } else {
            imagesCMS[index].src = image.src;
        }
    })

    titlesCMS.forEach((title, index) => {
        if(index % 2 === 0){
            title.value = titles[indexT].textContent;
            indexT++
        } else {
            title.value = hrefs[indexA].href
            indexA++
        }
    });

    updatedImg[2] = updateChangedImages(imgArray[2], blocks[2], 1)
}

function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages);
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;
    oldHtml.querySelector("p").textContent = cmsHtml.querySelector("textarea").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldP = oldHtml.querySelectorAll("p");
    const newP = cmsHtml.querySelectorAll("textarea");
    oldP.forEach((p, index) => {
        p.textContent = newP[index].value;
    })

    return oldHtml;
}

function updateThirdBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
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
