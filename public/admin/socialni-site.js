import { openBlock, removeExtraSpaces, responsiveMenu } from "./functions/menu-blocks-spaces";
import { sendHTML } from "./functions/send-updated-HTML";

const saveButton = document.getElementById("saveBtn");
let div;
let arrayOfText = []

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:8080/api/html/social_networks");
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
        await sendHTML(json, "http://localhost:8080/api/html/social_networks");
        location.reload();
     }
})
