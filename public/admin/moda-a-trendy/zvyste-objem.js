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
    const response = await fetch("http://localhost:8080/api/html/fashion_trends/volume");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    await firstBlock(children[1]);
    await secondBlock(children[2]);

    openBlock();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firstUpdated = updateFirstBlock(children[1], blocks[0], updatedImg[0])
    const secondUpdated = updateSecondBlock(children[2], blocks[1], updatedImg[1])

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firstUpdated);
    div.appendChild(secondUpdated);

    await sendHTML(div.innerHTML, "http://localhost:8080/api/html/fashion_trends/volume");
    await sentImage();
    location.reload();
})

async function firstBlock(html){
    blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("h1").textContent);

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

    updatedImg[0] = updateChangedImages(imgArray[0], blocks[0], 1)
 }

async function secondBlock(html){
    const paragraph = html.querySelectorAll("p");
    const textarea = blocks[1].querySelectorAll("textarea");
    let i = 0

    paragraph.forEach((p) => {
        const hasA = p.querySelector("a") !== null;
        if(hasA){
            if(i === textarea.length){
                return
            }
            textarea[i].textContent = removeExtraSpaces(p.firstChild.textContent)
            i++
        } else if(p.children.length === 0){
            if(i === textarea.length){
                return
            }
            textarea[i].textContent = removeExtraSpaces(p.textContent)
            i++        
        }
    })

    const header = html.querySelectorAll("h2")
    const inputs = blocks[1].querySelectorAll("input[type='text']")

    let index = 0
    inputs.forEach((input) => {
        if(!input.id.includes("video") && !input.closest(".link")){
            input.value = header[index].textContent
            index++
        }
    })

    const iframe = html.querySelectorAll("iframe")
    const cmsIframe = blocks[1].querySelectorAll("iframe")

    cmsIframe.forEach((video, index) => {
        video.src = iframe[index].src
    })

    const buttons = html.querySelectorAll("a")
    const links = blocks[1].querySelectorAll(".link input[type='text']")

    buttons.forEach((b, index) => {
        links[index * 2].value = b.textContent
        links[index * 2 + 1].value = b.href
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


function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages)
    const oldH1 = oldHtml.querySelectorAll("h2");
    const newTexts = cmsHtml.querySelectorAll("input[type='text']");
    const oldIframe = oldHtml.querySelectorAll("iframe")
    const newIframe = cmsHtml.querySelectorAll("iframe")
    const textarea = cmsHtml.querySelectorAll("textarea")
    const paragraph = oldHtml.querySelectorAll("p")
    const button = oldHtml.querySelectorAll("a")
    const links = cmsHtml.querySelectorAll(".link input[type='text']")

    let index = 0
    newTexts.forEach((input) => {
        if(!input.id.includes("video") && !input.closest(".link")){
            input.value = oldH1[index].textContent
            index++
        }
    })

    oldIframe.forEach((v, index) => {
        v.src = newIframe[index].src
    })

    let i = 0
    paragraph.forEach((p) => {
        const hasA = p.querySelector("a") !== null;
        if(hasA){
            if(i === textarea.length){
                return
            }
            p.firstChild.textContent = textarea[i].textContent
            i++
        } else if(p.children.length === 0){
            if(i === textarea.length){
                return
            }
            p.textContent = textarea[i].textContent
            i++        
        }
    })

    button.forEach((b, index) => {
        b.textContent = links[index * 2].value
        b.href = links[index * 2 + 1].value
    })

    return oldHtml;
}
