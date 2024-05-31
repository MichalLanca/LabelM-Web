const blocks = document.querySelectorAll(".content section");
const saveButton = document.getElementById("saveBtn");

let images = [];
let uploadedImages = [];
let children;

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
    updateChangedImages();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firstUpdated = updateFirstBlock(children[1], blocks[0])
    const secondUpdated = updateSecondBlock(children[2], blocks[1], images)
    const thirdUpdated = updateThirdBlock(children[3], blocks[2], images)
    const fourthUpdated = updateFourthBlock(children[4], blocks[3], images)
    const fifthUpdated = updateFourthBlock(children[5], blocks[4], images)

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firstUpdated);
    div.appendChild(secondUpdated);
    div.appendChild(thirdUpdated);
    div.appendChild(fourthUpdated);
    div.appendChild(fifthUpdated);

    await sendHTML(div.innerHTML);
    await sentImage(uploadedImages);
    location.reload();
})

async function firstBlock(html){
    blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("h1").textContent);
    blocks[0].querySelector("textarea").textContent= removeExtraSpaces(html.querySelector("p").textContent);
 }

async function secondBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[1].querySelectorAll("textarea");
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[1].querySelectorAll("img");
    const header = html.querySelectorAll("h1")
    const inputs = blocks[1].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
    })

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
    })

    inputs[1].value = button.textContent
} 

async function thirdBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[2].querySelectorAll("textarea");
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[2].querySelectorAll("img");
    const header = html.querySelectorAll("h1")
    const inputs = blocks[2].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
    })

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
    })

    inputs[1].value = button.textContent

}

async function fourthBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[3].querySelectorAll("textarea");
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[3].querySelectorAll("img");
    const header = html.querySelectorAll("h1")
    const inputs = blocks[3].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
    })

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
    })

    inputs[1].value = button.textContent
}

async function fifthBlock(html){
    const paragpraphs = html.querySelectorAll("p");
    const text = blocks[4].querySelectorAll("textarea");
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[4].querySelectorAll("img");
    const header = html.querySelectorAll("h1")
    const inputs = blocks[4].querySelectorAll("input[type='text']")
    const button = html.querySelector("a")

    paragpraphs.forEach((p, index) => {
        text[index].textContent = removeExtraSpaces(p.textContent)
        inputs[index].value = removeExtraSpaces(header[index].textContent)
    })

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
    })

    inputs[1].value = button.textContent
}

function updateFirstBlock(oldHtml, cmsHtml){
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;
    oldHtml.querySelector("p").textContent = cmsHtml.querySelector("textarea").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
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
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
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
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
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
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
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

async function sendHTML(html){
    try {
        const response = await fetch('http://localhost:8080/api/html/fashion_trends', {
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
        }
    })
}

function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
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
    let clickedA = false

    mainBtn.addEventListener("click", (e) => {
        if(!clickedA){
            e.preventDefault()
            buttons.forEach((button) => {
                button.style.display = "flex"
                mainBtn.style.backgroundColor = "rgb(156 163 175)"
                clickedA = true
            })
        }           
    })

    const fashionButtons = document.querySelectorAll(".fashion_btns")
    const fashionMain = document.querySelector(".fashion")
    let clickedB = false

    fashionMain.addEventListener("click", (e) => {
        if(!clickedB){
            e.preventDefault()
            fashionButtons.forEach((button) => {
                button.style.display = "flex"
                fashionMain.style.backgroundColor = "rgb(156 163 175)"
                clickedB = true
            })
        }
    })

    main.addEventListener("click", (e) => {
        if(clickedA || clickedB){
            buttons.forEach((button) => {
                button.style.display = "none"
            })
            fashionButtons.forEach((button) => {
                button.style.display = "none"
            })
            mainBtn.style.backgroundColor = "rgba(52, 63, 74, 1)"
            fashionMain.style.backgroundColor = "rgba(52, 63, 74, 1)"
            clickedA = false
            clickedB = false
        }
    })

    bg.addEventListener("click", () => {
        nav.style.display = "none"
        openNav = false
        main.removeChild(bg)
        buttons.forEach((button) => {
            button.style.display = "none"
        })
        fashionButtons.forEach((button) => {
            button.style.display = "none"
        })
        mainBtn.style.backgroundColor = "rgba(52, 63, 74, 1)"
        fashionMain.style.backgroundColor = "rgba(52, 63, 74, 1)"
        clickedA = false
        clickedB = false
    })

 

}