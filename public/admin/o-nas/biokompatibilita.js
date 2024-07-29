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
    const response = await fetch("http://localhost:8080/api/html/about_us/biocompatibility");

    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    await firstBlock(children[1]);
    await secondBlock(children[2]);
    await thirdBlock(children[3])
    await fourthBlock(children[4])

    openBlock();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firstUpdated = updateFirstBlock(children[1], blocks[0], updatedImg[0])
    const secondUpdated = updateSecondBlock(children[2], blocks[1], updatedImg[1])
    const thirdUpdated = updateThirdBlock(children[3], blocks[2], updatedImg[2])
    const fourthUpdated = updateFourthBlock(children[4], blocks[3], updatedImg[3])

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firstUpdated);
    div.appendChild(secondUpdated);
    div.appendChild(thirdUpdated);
    div.appendChild(fourthUpdated);

    await sendHTML(div.innerHTML, "http://localhost:8080/api/html/about_us/biocompatibility");
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
    blocks[0].querySelector("textarea").textContent= removeExtraSpaces(html.querySelector("section p").textContent);


    updatedImg[0] = updateChangedImages(imgArray[0], blocks[0], 1)
 }

async function secondBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[1].querySelectorAll("textarea");
    const header = html.querySelectorAll("h3")
    const inputs = blocks[1].querySelectorAll("input[type='text']")
    const links = blocks[1].querySelectorAll(".link input")
    const hrefs = html.querySelectorAll("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
    })

    hrefs.forEach((a, index) => {
        links[index * 2].value = a.textContent
        links[index * 2 + 1].value = a.href
    })

    let index = 0
    inputs.forEach((i) => {
        if(!i.closest(".link")){
            i.value = header[index].textContent
            index++
        }
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
    const header = html.querySelector("h2")
    const cmdH = blocks[2].querySelector("input[type='text']")
    cmdH.value = header.textContent

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

    updatedImg[2] = updateChangedImages(imgArray[2], blocks[2], 1)
}

async function fourthBlock(html){
    const titles = html.querySelectorAll("h2");
    const paragpraphs = html.querySelectorAll("p");
    const hrefs = html.querySelectorAll(".leading-snug.underline");
    const titlesCMS = blocks[3].querySelectorAll("input[type='text']");
    const textAreas = blocks[3].querySelectorAll("textarea");
    let indexT = 0;
    let indexA = 0;

    textAreas.forEach((t, index) => {
        t.textContent = removeExtraSpaces(paragpraphs[index].textContent);
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

    titlesCMS.forEach((title, index) => {
        if(index % 2 === 0){
            title.value = titles[indexT].textContent;
            indexT++
        } else {
            title.value = hrefs[indexA].href
            indexA++
        }
    });

    updatedImg[3] = updateChangedImages(imgArray[3], blocks[3], 1)
}

function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages);
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;
    oldHtml.querySelector("p").textContent = cmsHtml.querySelector("textarea").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH2 = oldHtml.querySelectorAll("h3");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const links = cmsHtml.querySelectorAll(".link input")
    const textarea = cmsHtml.querySelectorAll("textarea")
    const p = oldHtml.querySelectorAll("p")

    let index = 0

    newTexts.forEach((text) => {
        if(!text.closest(".link")){
            oldH2[index].textContent = text.value
            index++
        }
    })

    let i = 0

    textarea.forEach((t, index) => {
        const hasAnchor = p[index].querySelector("a") !== null;
        if(hasAnchor){           
            p[index].querySelector("a").innerHTML = links[i * 2].value
            p[index].querySelector("a").href = links[i * 2 + 1].value
            i++
            p[index].firstChild.textContent = t.firstChild.textContent
        } else {
            p[index].textContent = t.textContent
        }
    })

    return oldHtml;
}

function updateThirdBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH2 = oldHtml.querySelectorAll("h2");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");

    newTexts.forEach((text, index) => {
        if(!text.closest(".link")){
            oldH2[index].textContent = text.value
        }
    })

    return oldHtml;
}

function updateFourthBlock(oldHtml, cmsHtml, updatedImages){
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


