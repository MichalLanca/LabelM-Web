
const saveButton = document.getElementById("saveBtn");
const imageURLpath = "/images/";
const videoURLpath = "/video/";
let blocksOriginalHtml;
let div
let radios;
let videos = [];
let images = [];
let uploadedImages = [];



document.addEventListener("DOMContentLoaded", async () => {

    const response = await fetch('http://localhost:8080/api/html/main_page');
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    blocksOriginalHtml = div.querySelectorAll("section");


    blocksOriginalHtml.forEach((block, index) => {
        const templates = document.querySelectorAll("template");
        const contentText = document.importNode(templates[0].content, true);
        const contentVideo = document.importNode(templates[1].content, true);

        if(block.querySelector("h1")){
            contentText.querySelector("h2").textContent = "Blok " + (index + 1);
            radios = contentText.querySelectorAll("input[type='radio']");
            const label = contentText.querySelector("label");
            const inputFile = contentText.querySelector("input[type='file']");
            label.setAttribute("for", "Blok_" + (index));
            inputFile.setAttribute("id", "Blok_" + (index));
            const texts = contentText.querySelectorAll(".tab_content .text input");
            texts[0].value = block.querySelector("h1").textContent.replace(/\s+/g, ' ').trim();
            texts[1].value = block.querySelector("a").textContent.replace(/\s+/g, ' ').trim();
            contentText.querySelector("textarea").value = block.querySelector("p").textContent.replace(/\s+/g, ' ').trim();
            contentText.querySelector(".tab_content .image p").textContent = block.querySelector("p").textContent.replace(/\s+/g, ' ').trim();
            contentText.querySelector(".tab_content .image h1").textContent = block.querySelector("h1").textContent.replace(/\s+/g, ' ').trim();
            contentText.querySelector(".tab_content .image button").textContent = block.querySelector("a").textContent.replace(/\s+/g, ' ').trim();
            contentText.querySelector(".tab_content .image img").src = block.querySelector("img").src;
            const classList = block.querySelector("div").classList;
            radios[0].name = "blok_" + (index + 1);
            radios[1].name = "blok_" + (index + 1); 
            radios[1].id = "right_" + (index + 1);
            radios[0].id = "left_" + (index + 1);
            if(classList.contains("md:mr-[30px]")){
                radios[1].checked = true;
                contentText.querySelector(".tab_content .image .relative div").style.left = "65%";
            } else if(classList.contains("md:ml-[30px]")){
                radios[0].checked = true;
                contentText.querySelector(".tab_content .image .relative div").style.left = "5%";
            }

            radiosListener(contentText.querySelector(".tab_content .image .relative div"));
            inputTextListener(contentText);
            updateChangedImages(contentText);
            document.querySelector(".content").appendChild(contentText);

        } else {      
            contentVideo.querySelector("h2").textContent = "Blok " + (index + 1);      
            contentVideo.querySelector(".tab_content .video iframe").src = block.querySelector("iframe").src;
            saveVideo(contentVideo);
            document.querySelector(".content").appendChild(contentVideo);
        }
    })

    openBlock();
    responsiveMenu();
    }
)

function radiosListener(div){
    radios.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            if(event.target.checked && event.target.value === "left"){
                div.style.left = "5%";
            } else if(event.target.checked && event.target.value === "right"){
                div.style.left = "65%";
            }
        })
    })
}

function inputTextListener(htmlContent){
    const texts = htmlContent.querySelectorAll(".tab_content .text input");
    const image = htmlContent.querySelector(".tab_content .image");

    texts[0].addEventListener("input", function(e){
        image.querySelector("h1").textContent = e.target.value;
    })
    texts[1].addEventListener("input", function(e){
        image.querySelector("button").textContent = e.target.value;
    })
    htmlContent.querySelector("textarea").addEventListener("input", function(e){
        image.querySelector("p").textContent = e.target.value;
    })
        
}


function updateChangedImages(htmlContent) {
    const input = htmlContent.querySelector("input[type='file']");
    const image = htmlContent.querySelector("img")

    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if(file){
            let url = URL.createObjectURL(file);   
            image.src = url;
            images.push(imageURLpath + file.name);
            uploadedImages.push(file);
        }
    });
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

function saveVideo(htmlContent){
    const button = htmlContent.querySelector("button");
    const input = htmlContent.querySelector("input");
    const iframe = htmlContent.querySelector("iframe");

    button.addEventListener("click", function(){
        if(input.value != ""){
            iframe.src = input.value;
            input.value = "";
        }
    })
}

saveButton.addEventListener("click", async () => {
    const blocksNewHtml = document.querySelectorAll(".content section");

    blocksNewHtml.forEach(async (block, index) => {

       if(block.querySelector(".tab_content .image")){
            const oldImage = blocksOriginalHtml[index].querySelector("img");
            if(block.querySelector("img").src != oldImage.src){
		console.log(oldImage.src, block.querySelector("img").src)
                oldImage.src = images[0];
                images.shift();
                if(oldImage.hasAttribute("srcset")){
                    oldImage.removeAttribute("srcset");
                    oldImage.onload = null;
                }
            }

            const newTexts = block.querySelectorAll("input[type='text']");
            const newP = block.querySelector("textarea");
            const oldH1 = blocksOriginalHtml[index].querySelector("h1");
            const oldbutton = blocksOriginalHtml[index].querySelector("a");
            const oldP = blocksOriginalHtml[index].querySelector("p");
            if(newTexts[0].value != oldH1.textContent){
                oldH1.textContent = newTexts[0].value;
            }
            if(newTexts[1].value != oldbutton.textContent){
                oldbutton.textContent = newTexts[1].value;
            }
            if(newP.value != oldP.textContent){
                oldP.textContent = newP.value;
            }

            const oldImageOrientation = blocksOriginalHtml[index].querySelector("div").classList;
            const newImageOrientation = block.querySelectorAll("input[type='radio']");
            newImageOrientation.forEach((radio) => {
                if(radio.checked){
                    if(radio.value === "left" && oldImageOrientation.contains("md:mr-[30px]")){
                        oldImageOrientation.remove("md:mr-[30px]", "lg:mr-[45px]", "xl:mr-[65px]", "2xl:mr-[150px]", "md:ml-auto");
                        oldImageOrientation.add("md:ml-[30px]")
                        oldImageOrientation.add("lg:ml-[45px]")
                        oldImageOrientation.add("xl:ml-[65px]")
                        oldImageOrientation.add("2xl:ml-[150px]")

                    } else if(radio.value === "right" && oldImageOrientation.contains("md:ml-[30px]")){
                        oldImageOrientation.remove("md:ml-[30px]", "lg:ml-[45px]", "xl:ml-[65px]", "2xl:ml-[150px]");
                        oldImageOrientation.add("md:ml-auto")
                        oldImageOrientation.add("md:mr-[30px]")
                        oldImageOrientation.add("lg:mr-[45px]")
                        oldImageOrientation.add("xl:mr-[65px]")
                        oldImageOrientation.add("2xl:mr-[150px]")

                    }
                }
            })
            

       } else {
            if(block.querySelector("iframe").src !== blocksOriginalHtml[index].querySelector("iframe").src){
                blocksOriginalHtml[index].querySelector("iframe").src = block.querySelector("iframe").src
            } 
       }
    })

    div.innerHTML = "";
    blocksOriginalHtml.forEach((block) => {
        div.appendChild(block);
    })

    await sendHTML(div.innerHTML);
    await sentImage(uploadedImages);
    location.reload();
})

async function sendHTML(html){
    try {
        const response = await fetch('http://localhost:8080/api/html/main_page', {
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





