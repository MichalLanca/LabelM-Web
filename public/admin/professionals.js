const blocks = document.querySelectorAll(".content section");
const saveButton = document.getElementById("saveBtn");

let images = [];
let uploadedImages = [];
let children;

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
    const firtUpdated = updateFirstBlock(children[1], blocks[0], images);
    const secondUpdated = updateSecondBlock(children[2], blocks[1], images);

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firtUpdated);
    div.appendChild(secondUpdated);

    await sendHTML(div.innerHTML);
    await sentImage(uploadedImages);
    location.reload();
})

async function firstBlock(html){
    blocks[0].querySelector("img").src = html.querySelector("section img").src;
    blocks[0].querySelector(".text input").value = html.querySelector("section h1").textContent;
 }
 
 async function secondBlock(html){
     createNewBlock(html.querySelector("article"), blocks[1]);
 }

 function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages);
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages);

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
            }
        });
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

async function sendHTML(html){
    try {
        const response = await fetch('http://localhost:8080/api/html/professionals', {
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

    const buttons = document.querySelectorAll(".about_btns")
    const mainBtn = document.querySelector(".about")
    let clicked = false

    mainBtn.addEventListener("click", (e) => {
        if(!clicked){
            e.preventDefault()
            buttons.forEach((button) => {
                button.style.display = "flex"
                mainBtn.style.backgroundColor = "rgb(156 163 175)"
                clicked = true
            })
        }           
    })

    main.addEventListener("click", (e) => {
        if(clicked){
            buttons.forEach((button) => {
                button.style.display = "none"
                mainBtn.style.backgroundColor = "rgba(52, 63, 74, 1)"
                clicked = false
            })
        }
    })

    bg.addEventListener("click", () => {
        nav.style.display = "none"
        openNav = false
        main.removeChild(bg)
        buttons.forEach((button) => {
            button.style.display = "none"
            mainBtn.style.backgroundColor = "rgba(52, 63, 74, 1)"
            clicked = false
        })
    })

}