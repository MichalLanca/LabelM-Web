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
    const response = await fetch("http://localhost:8080/api/html/professionals");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    openBlock();
    responsiveMenu();

    firstBlock(children[1]);
    secondBlock(children[2]);

    updateChangedImages();
})

saveButton.addEventListener("click", async () => {
    const firtUpdated = updateFirstBlock(children[1], blocks[0], updatedImg[0]);
    const secondUpdated = updateSecondBlock(children[2], blocks[1], updatedImg[1]);

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firtUpdated);
    div.appendChild(secondUpdated);

    await sendHTML(div.innerHTML, "http://localhost:8080/api/html/professionals");
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

    blocks[0].querySelector(".text input").value = html.querySelector("section h1").textContent;

    updatedImg[0] = updateChangedImages(imgArray[0], blocks[0], 0)
 }
 
 async function secondBlock(html){
     createNewBlock(html.querySelector("article"), blocks[1]);

     updatedImg[1] = updateChangedImages(imgArray[1], blocks[1], 0)
 }

 function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages);
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, updatedImages);

    const textareas = cmsHtml.querySelectorAll("textarea");
    const p = oldHtml.querySelectorAll("p");
    let arrayOfLinks = cmsHtml.querySelectorAll(".link");

    arrayOfLinks.forEach((link, index) => {
        let linkHref = link.value.trim();
        if (linkHref.startsWith('+')) {
            linkHref = 'tel:' + linkHref;
        } else if (linkHref.includes('@')) {
            linkHref = 'mailto:' + linkHref;
        }
        arrayOfLinks[index].value = linkHref;
    });

    let arrayOfBtns = cmsHtml.querySelectorAll(".btn");
    p.forEach((paragraph, index) => {
        const childElement = paragraph.querySelector("*");
        if(!childElement){
            paragraph.textContent = textareas[index].value;
        } else {
            if (paragraph.querySelectorAll("a").length === 1) {
                let text = textareas[index].value;
                const regex1 = new RegExp(`\\b${arrayOfBtns[0].value}\\b`, 'gi');
                const linkA = document.createElement("a");
                linkA.href = arrayOfLinks[0].value;
                linkA.target = "_blank";
                linkA.textContent = arrayOfBtns[0].value;
                arrayOfBtns = Array.from(arrayOfBtns).slice(1);
                arrayOfLinks = Array.from(arrayOfLinks).slice(1);
                text = text.replace(regex1, linkA.outerHTML);
                paragraph.innerHTML = text;

            } else if (paragraph.querySelectorAll("a").length === 2) {
                let text = textareas[index].value;
                const regex1 = new RegExp(`\\b${arrayOfBtns[0].value}\\b`, 'gi');
                const regex2 = new RegExp(`\\b${arrayOfBtns[1].value}\\b`, 'gi');
                const linkA = document.createElement("a");
                linkA.href = arrayOfLinks[0].value;
                linkA.target = "_blank";
                linkA.textContent = arrayOfBtns[0].value;
                const linkB = document.createElement("a");
                linkB.href = arrayOfLinks[1].value;
                linkB.target = "_blank";
                linkB.textContent = arrayOfBtns[1].value;
                text = text.replace(regex1, linkA.outerHTML);
                text = text.replace(regex2, linkB.outerHTML);
                arrayOfBtns = Array.from(arrayOfBtns).slice(1);
                arrayOfLinks = Array.from(arrayOfLinks).slice(1);
                arrayOfBtns = Array.from(arrayOfBtns).slice(1);
                arrayOfLinks = Array.from(arrayOfLinks).slice(1);
                paragraph.innerHTML = text;
            } 
        }
    })

    const inputs = cmsHtml.querySelectorAll("input[type='text']");
    const h = oldHtml.querySelectorAll("h1, h2, h3, h4");
    
    let index = 0;
    inputs.forEach((input) => {
        if(!input.classList.contains("link") && !input.classList.contains("btn")){
            if(index < h.length){
                h[index].textContent = input.value;
                index += 1;
            }
        }
    })

    return oldHtml;
}

function createNewBlock(html, block){
    tags = Array.from(html.children);
    const cmsBlock = block.querySelector(".tab_content");

    const newTextarea = `<textarea name="" id="" class="w-full max-w-[763px] p-2" rows="2"></textarea>`;

    const newInput = `<input type="text" class="w-full max-w-[510px] ml-1 h-12 pl-2 outline-none text-center" placeholder="">`;

    const labelInner = `<label class="w-48 h-12 bg-teal-900 p-2 text-white m-4 hover:bg-gray-400 cursor-pointer flex justify-center items-center mx-auto">
<span>nahrát obrázek</span>
<input type="file" style="display: none;">
</label>`;

    tags.forEach((child) => {
        const textDiv = document.createElement("div");
        textDiv.classList.add("text")
        textDiv.classList.add("flex")
        textDiv.classList.add("justify-center")
        textDiv.classList.add("mb-8")

        const newImgDiv = document.createElement("div");
        newImgDiv.classList.add("flex");
        newImgDiv.classList.add("items-center");
        newImgDiv.classList.add("justify-center");
        newImgDiv.classList.add("image");
        newImgDiv.style.height = "400px";

        if(child.tagName === "P"){
            if (child.querySelector("img")) {
                const newImg = document.createElement("img");
                newImg.style.maxHeight = "100%";
                newImg.src = child.querySelector("img").src;
                newImgDiv.appendChild(newImg);
                const labelDiv = document.createElement("div");
                labelDiv.innerHTML = labelInner;
                cmsBlock.appendChild(newImgDiv);
                cmsBlock.appendChild(labelDiv);
            } else if (child.querySelector("a")){
                const hrefs = child.querySelectorAll("a");
                const newP = textDiv;
                newP.innerHTML = newTextarea;
                newP.querySelector("textarea").textContent = removeExtraSpaces(child.textContent);
                cmsBlock.appendChild(newP);
                const div = document.createElement("div");
                div.classList.add("xl:flex");
                div.classList.add("xl:justify-center");
                div.classList.add("w-[80%]");
                div.classList.add("mx-auto");
                hrefs.forEach((href) => {
                    const div1 = document.createElement("div");
                    div1.classList.add("flex");
                    div1.classList.add("mb-8");
                    div1.classList.add("justify-center");
                    div1.classList.add("w-full");
                    div1.classList.add("max-w-[233px]");
                    div1.classList.add("xl:mx-2");
                    div1.classList.add("items-center");
                    div1.classList.add("mx-auto");

                    const div2 = document.createElement("div");
                    div2.classList.add("flex");
                    div2.classList.add("mb-8");
                    div2.classList.add("justify-center");
                    div1.classList.add("w-full");
                    div1.classList.add("max-w-[233px]");
                    div2.classList.add("xl:mx-2");
                    div2.classList.add("mx-auto");
                    div2.classList.add("items-center");

                    const p1 = document.createElement("p");
                    p1.textContent = "tlačítko:";
                    p1.classList.add("uppercase")
                    p1.classList.add("text-right");

                    const input1 = document.createElement("input");
                    input1.type = "text";
                    input1.classList.add("btn");
                    input1.classList.add("w-1/3");
                    input1.classList.add("ml-1");
                    input1.classList.add("h-12");
                    input1.classList.add("pl-2");
                    input1.classList.add("outline-none");
                    input1.classList.add("text-left");
                    input1.classList.add("w-full");
                    input1.value = href.textContent;

                    const p2 = document.createElement("p");
                    p2.textContent = "odkaz:";
                    p2.classList.add("uppercase")
                    p2.classList.add("text-right");

                    const input2 = document.createElement("input");
                    input2.type = "text";
                    input2.classList.add("link");
                    input2.classList.add("w-1/3");
                    input2.classList.add("ml-1");
                    input2.classList.add("h-12");
                    input2.classList.add("pl-2");
                    input2.classList.add("outline-none");
                    input2.classList.add("text-left");
                    input2.classList.add("w-full");
                    input2.value = removeTelOrMailto(href.href);

                    div1.append(p1);
                    div1.append(input1);
                    div2.append(p2);
                    div2.append(input2);

                    div.appendChild(div1);
                    div.appendChild(div2);
                })
                cmsBlock.appendChild(div);

            } else {
                const newP = textDiv;
                newP.innerHTML = newTextarea;
                newP.querySelector("textarea").textContent = removeExtraSpaces(child.textContent);
                cmsBlock.appendChild(newP);
            }
        } else if (child.tagName.startsWith("H")){
            const newH = textDiv;
            newH.innerHTML = newInput;
            const boolean = isSingleWord(child.textContent);
            if(boolean){
                newH.querySelector("input").style.marginTop = "60px";
            }
            newH.querySelector("input").value = child.textContent;
            cmsBlock.appendChild(newH);
        } else if (child.tagName === "IMG"){
            const newImg = document.createElement("img");
            newImg.style.maxHeight = "100%";
            newImg.src = child.src;
            newImgDiv.appendChild(newImg);
            const labelDiv = document.createElement("div");
            labelDiv.innerHTML = labelInner;
            cmsBlock.appendChild(newImgDiv);
            cmsBlock.appendChild(labelDiv);
        }
    })


    function removeExtraSpaces(text) {
        return text.replace(/\s+/g, ' ').trim();
    }
    
    function isSingleWord(text) {
        const regex = /^\S*$/;
        return regex.test(text);
    }

    function removeTelOrMailto(text) {
        const regex = /^(tel:|mailto:)/;
        return text.replace(regex, '');
    }
}
