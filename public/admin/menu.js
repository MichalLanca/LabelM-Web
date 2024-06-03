import { openBlock, removeExtraSpaces, responsiveMenu } from "./functions/menu-blocks-spaces";
import { sendHTML } from "./functions/send-updated-HTML";

const saveButton = document.getElementById("saveBtn");
let div;
const partToRemove = "http://localhost:8080/admin/";

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
       sendHTML(json, "http://localhost:8080/api/html/menu")
       location.reload();
    }
})


function removeUrlPart(url, partToRemove) {
    return url.replace(partToRemove, "");
}

function getUrlFromOnClick(onclickAttributeValue) {

    const parts = onclickAttributeValue.split("'");
    const firstUrl = parts[1];
    const secondUrl = parts[3];
    return [firstUrl, secondUrl];
}

