const saveButton = document.getElementById("saveBtn");
let div;
const partToRemove = "https://my-labelm.cz/admin/";

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:8080/api/html/menu");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;
    
    links = div.querySelectorAll("a");
    const inputs = document.querySelectorAll("input");

    let i = 0;

    links.forEach((link, index) => {
        if(index === 1){
            inputs[i].value = removeExtraSpaces(link.textContent);
            let array = getUrlFromOnClick(link.getAttribute("onclick"));
            i++;
            inputs[i].value = array[0];
            i++;
            inputs[i].value = array[1];
            i++;
        } else {
            inputs[i].value = removeExtraSpaces(link.textContent);
            i++;
            inputs[i].value = removeUrlPart(link.href, partToRemove);  
            i++;
        }
    })
    
    openBlock();
    responsiveMenu();
})

saveButton.addEventListener("click", async () => {

    links = div.querySelectorAll("a");
    const inputs = document.querySelectorAll("input");
    let i = 0;
    let secondLink = false;
    let json = {}

    inputs.forEach((input) => {
        if(input.placeholder === "název stránky"){
            if(input.value != removeExtraSpaces(links[i].textContent)){
                json[input.value] =  links[i].textContent
            }
        } 
        else if(input.placeholder === "odkaz na stránku"){
            if(links[i].href.endsWith("#")){
                let array = getUrlFromOnClick(links[i].getAttribute("onclick"))
                if(!secondLink){
                    if(array[0] != input.value){
                        json[input.value] =  array[0]
                    }
                    secondLink = true;
                } 
                else if(secondLink){
                    if(array[1] != input.value){
                        json[input.value] =  array[1]
                    }
                    secondLink = false;
                    i++;
                }
            }
            else{
                if(input.value != removeUrlPart(links[i].href, partToRemove)){
                    json[input.value] =  links[i].href
                }
                i++;
            }
        }
    })

    if (Object.keys(json).length > 0) {
       sendHTML(json)
       location.reload();
    }
})

async function sendHTML(html){
    try {
        const response = await fetch('http://localhost:8080/api/html/menu', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(html)
        });
        if (!response.ok) {
            throw new Error('Nepodařilo se odeslat HTML obsah na server.');
        }

    } catch (error) {
        console.error('Chyba při odesílání HTML obsahu:', error);
    }
}

function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function removeUrlPart(url, partToRemove) {
    return url.replace(partToRemove, "");
}

function getUrlFromOnClick(onclickAttributeValue) {

    const parts = onclickAttributeValue.split("'");
    const firstUrl = parts[1];
    const secondUrl = parts[3];
    return [firstUrl, secondUrl];
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
}