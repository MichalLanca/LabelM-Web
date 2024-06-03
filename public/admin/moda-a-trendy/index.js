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
    const response = await fetch("http://localhost:8080/api/html/fashion_trends");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    await firstBlock(children[1]);
    await secondBlock(children[2]);
    await thirdBlock(children[3])
    await fourthBlock(children[4])
    await fifthBlock(children[5])

    openBlock();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firstUpdated = updateFirstBlock(children[1], blocks[0])
    const secondUpdated = updateSecondBlock(children[2], blocks[1], updatedImg[1])
    const thirdUpdated = updateThirdBlock(children[3], blocks[2], updatedImg[2])
    const fourthUpdated = updateFourthBlock(children[4], blocks[3], updatedImg[3])
    const fifthUpdated = updateFourthBlock(children[5], blocks[4], updatedImg[4])

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firstUpdated);
    div.appendChild(secondUpdated);
    div.appendChild(thirdUpdated);
    div.appendChild(fourthUpdated);
    div.appendChild(fifthUpdated);

    await sendHTML(div.innerHTML, "http://localhost:8080/api/html/fashion_trends");
    await sentImage();
    location.reload();
})

async function firstBlock(html){
    blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("h1").textContent);
    blocks[0].querySelector("textarea").textContent= removeExtraSpaces(html.querySelector("p").textContent);
 }

async function secondBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[1].querySelectorAll("textarea");

    const header = html.querySelectorAll("h1")
    const inputs = blocks[1].querySelectorAll("input[type='text']")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
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

    const button = html.querySelector("a")

    inputs[1].value = button.textContent

    updatedImg[1] = updateChangedImages(imgArray[1], blocks[1], 1)
} 

async function thirdBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[2].querySelectorAll("textarea");

    const header = html.querySelectorAll("h1")
    const inputs = blocks[2].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
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

    inputs[1].value = button.textContent

    updatedImg[2] = updateChangedImages(imgArray[2], blocks[2], 1)

}

async function fourthBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[3].querySelectorAll("textarea");

    const header = html.querySelectorAll("h1")
    const inputs = blocks[3].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
    })

    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[3].querySelectorAll("img");

    images.forEach((image, index) => {
        const relativeSrc = image.getAttribute('data-relative-src');
        if(relativeSrc){
            imagesCMS[index].src = "../" + relativeSrc
            imagesCMS[index].setAttribute("data-relative-src", "../" + relativeSrc)
        } else {
            imagesCMS[index].src = image.src;
        }
    })

    inputs[1].value = button.textContent

    updatedImg[3] = updateChangedImages(imgArray[3], blocks[3], 1)
}

async function fifthBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[4].querySelectorAll("textarea");

    const header = html.querySelectorAll("h1")
    const inputs = blocks[4].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
    })

    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[4].querySelectorAll("img");

    images.forEach((image, index) => {
        const relativeSrc = image.getAttribute('data-relative-src');
        if(relativeSrc){
            imagesCMS[index].src = "../" + relativeSrc
            imagesCMS[index].setAttribute("data-relative-src", "../" + relativeSrc)
        } else {
            imagesCMS[index].src = image.src;
        }
    })

    inputs[1].value = button.textContent

    updatedImg[4] = updateChangedImages(imgArray[4], blocks[4], 1)
}

function updateFirstBlock(oldHtml, cmsHtml){
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;
    oldHtml.querySelector("p").textContent = cmsHtml.querySelector("textarea").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH1 = oldHtml.querySelectorAll("h1");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const textarea = cmsHtml.querySelectorAll("textarea")
    const p = oldHtml.querySelectorAll("p")
    const button = oldHtml.querySelector("a")

    oldH1.textContent = newTexts[0].value
    button.textContent = newTexts[1].value
    p.textContent = textarea.textContent

    return oldHtml;
}

function updateThirdBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH1 = oldHtml.querySelectorAll("h1");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const textarea = cmsHtml.querySelectorAll("textarea")
    const p = oldHtml.querySelectorAll("p")
    const button = oldHtml.querySelector("a")

    oldH1.textContent = newTexts[0].value
    button.textContent = newTexts[1].value
    p.textContent = textarea.textContent
    
    return oldHtml;
}

function updateFourthBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH1 = oldHtml.querySelectorAll("h1");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const textarea = cmsHtml.querySelectorAll("textarea")
    const p = oldHtml.querySelectorAll("p")
    const button = oldHtml.querySelector("a")

    oldH1.textContent = newTexts[0].value
    button.textContent = newTexts[1].value
    p.textContent = textarea.textContent
    
    return oldHtml;
}

function updateFifthBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH1 = oldHtml.querySelectorAll("h1");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const textarea = cmsHtml.querySelectorAll("textarea")
    const p = oldHtml.querySelectorAll("p")
    const button = oldHtml.querySelector("a")

    oldH1.textContent = newTexts[0].value
    button.textContent = newTexts[1].value
    p.textContent = textarea.textContent
    
    return oldHtml;
}
