const blocks = document.querySelectorAll(".content section");
const saveButton = document.getElementById("saveBtn");

let images = [];
let uploadedImages = [];
let children;

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:8080/api/html/fashion_trends/slicked");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    children = Array.from(div.children);

    await firstBlock(children[1]);
    await secondBlock(children[2]);

    openBlock();
    updateChangedImages();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {
    const firstUpdated = updateFirstBlock(children[1], blocks[0], images)
    const secondUpdated = updateSecondBlock(children[2], blocks[1], images)

    div.innerHTML = "";
    div.appendChild(children[0]);
    div.appendChild(firstUpdated);
    div.appendChild(secondUpdated);

    await sendHTML(div.innerHTML);
    await sentImage(uploadedImages);
    location.reload();
})

async function firstBlock(html){
    blocks[0].querySelector(".text input").value = removeExtraSpaces(html.querySelector("h1").textContent);
    blocks[0].querySelector("img").src = html.querySelector("img").src
 }

async function secondBlock(html){
    const paragraph = html.querySelectorAll("p");
    const textarea = blocks[1].querySelectorAll("textarea");
    const images = html.querySelectorAll("img");
    const imagesCMS = blocks[1].querySelectorAll("img");
    const header = html.querySelectorAll("h2")
    const inputs = blocks[1].querySelectorAll("input[type='text']")
    const iframe = html.querySelectorAll("iframe")
    const cmsIframe = blocks[1].querySelectorAll("iframe")
    const buttons = html.querySelectorAll("a")
    const links = blocks[1].querySelectorAll(".link input[type='text']")

    let index = 0
    inputs.forEach((input) => {
        if(!input.id.includes("video") && !input.closest(".link")){
            input.value = header[index].textContent
            index++
        }
    })

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

    images.forEach((image, index) => {
        imagesCMS[index].src = image.src;
    })

    cmsIframe.forEach((video, index) => {
        video.src = iframe[index].src
    })

    buttons.forEach((b, index) => {
        links[index * 2].value = b.textContent
        links[index * 2 + 1].value = b.href
    })
} 


function updateFirstBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
    oldHtml.querySelector("h1").textContent = cmsHtml.querySelector("input[type='text']").value;

    return oldHtml;
}

function updateSecondBlock(oldHtml, cmsHtml, updatedImages){
    updateImagesSource(oldHtml, cmsHtml, updatedImages)
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

async function sendHTML(html){
    try {
        const response = await fetch('http://localhost:8080/api/html/fashion_trends/slicked', {
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