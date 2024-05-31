const saveButton = document.getElementById("saveBtn");
let div;
let arrayOfText = []

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("https://my-labelm.cz/api/html/social_networks");
    const htmlContent = await response.text();
    div = document.createElement("div");
    div.innerHTML = htmlContent;

    const inputs = document.querySelectorAll("input");
    const links = div.querySelectorAll("a");
    const h = div.querySelectorAll("h2");

    arrayOfText.push(removeExtraSpaces(h[0].textContent));
    arrayOfText.push(removeExtraSpaces(div.querySelector("p").textContent));
    arrayOfText.push(links[0].textContent);
    arrayOfText.push(removeExtraSpaces(h[1].textContent));
    arrayOfText.push(links[1].href);
    arrayOfText.push(links[2].href);
    arrayOfText.push(links[3].href);
    arrayOfText.push(links[4].href);

    inputs.forEach((input, index) => {
        input.value = arrayOfText[index];
    })

    openBlock();
    responsiveMenu();
})


saveButton.addEventListener("click", async () => {
    const inputs = document.querySelectorAll("input");
    let json = {}

    inputs.forEach((input, index) => {
        if(input.value != arrayOfText[index]){
            json[input.value] = arrayOfText[index]
        }
    })

    if (Object.keys(json).length > 0) {
	console.log(json)
        await sendHTML(json);
        location.reload();
     }
})

async function sendHTML(html){
    try {
        const response = await fetch('https://my-labelm.cz/api/html/social_networks', {
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