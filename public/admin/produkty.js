import { openBlock, removeExtraSpaces, responsiveMenu } from "./functions/menu-blocks-spaces";
import { sendHTML } from "./functions/send-updated-HTML";
import { updateChangedImages, updateImagesSource, sentImage } from "./functions/update-images";

const blocks = document.querySelectorAll(".content section");
const saveButton = document.getElementById("saveBtn");
const partToRemove = "http://localhost:8080/admin/";
const imageURLpath = "../images/";
let nextProductButton;
let oldHtml;
let changedImages = [];
let imagesNewUrl = [];


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:8080/api/html/products")
    const htmlContent = await response.text();
    oldHtml = document.createElement("div");
    oldHtml.innerHTML = htmlContent;

    const responseProducts = await fetch("http://localhost:8080/api/products");
    const products = await responseProducts.json();
    const listContainerTwo = document.querySelector(".list_products_2");
    const itemTemplateTwo = document.getElementById("item-template_2");

    products.forEach((product) => {
        const templateButtonTwo = document.importNode(itemTemplateTwo.content, true);
        const buttonTwo = templateButtonTwo.querySelector("li");
        buttonTwo.addEventListener("click", async function(){
            productsSlider = document.querySelectorAll(".slider div")
            productsSlider[nextProductButton].querySelector("img").src = product.image_main;
            productsSlider[nextProductButton].querySelector("h3").textContent = product.name;
          })
        const h2Two = templateButtonTwo.querySelector("h2");
        h2Two.textContent = product.name;
        listContainerTwo.appendChild(templateButtonTwo);

    })
    displayData(oldHtml);
    openBlock();
    initializeFilters();
    updateChangedImages();
    responsiveMenu();
})

saveButton.addEventListener("click", async function(){
    let arrayRange = [];
    const productRangeOriginal = oldHtml.querySelectorAll(".carousel a");
    const productRangeCms = document.querySelectorAll(".ranges div");

    productRangeCms.forEach((range, index) => {   
        if(imagesNewUrl.length > 0){
            arrayRange = imagesNewUrl;
        }
        if(range.querySelector("input[type='text']").value != removeUrlPart(productRangeOriginal[index].href, partToRemove)){
            changedItem = [removeUrlPart(productRangeOriginal[index].href, partToRemove), range.querySelector("input[type='text']").value]
            arrayRange.push(changedItem);
        }
    })

    let jsonSlider = {};
    let changeSlider = false;

    const bestProductsOriginal = oldHtml.querySelectorAll(".carousel-b .flex-none")
    const bestProductsCms = document.querySelectorAll(".slider div");

    bestProductsOriginal.forEach((product, index) => {
        if(!changeSlider){
            if(bestProductsCms[index].querySelector("h3").textContent != product.querySelector(".inline-block").textContent){
                changeSlider = true
                bestProductsCms.forEach((productCms, index) => {
                    jsonSlider[index] = [productCms.querySelector("img").src, removeExtraSpaces(productCms.querySelector("h3").textContent)]
                })
            }
        }
    })

    let jsonFilter = [];
    changeFilter = false

    const filterTypeOriginalButtons = oldHtml.querySelectorAll(".dropdown_menu button");
    const filterTypeOriginalItems = oldHtml.querySelectorAll(".dropdown_menu .mb-4");
    const inputsCms = document.querySelectorAll(".range_filter input");
    let indexButton = 0;
    let indexItems = 0;

    inputsCms.forEach((input, index) => {
        if(input.classList.contains("mb-8")){
            if(input.value != removeExtraSpaces(filterTypeOriginalButtons[indexButton].textContent)){
                changedItem = [removeExtraSpaces(filterTypeOriginalButtons[indexButton].textContent), input.value]
                jsonFilter.push(changedItem);
                changeFilter = true;
            }
            indexButton++;
        } else {
            if(input.value != removeExtraSpaces(filterTypeOriginalItems[indexItems].textContent)){
                changedItem = [removeExtraSpaces(filterTypeOriginalItems[indexItems].textContent),input.value]
                jsonFilter.push(changedItem);
                changeFilter = true;
            }
            indexItems++;
        }
    })

    let json = {};
    if(Object.keys(arrayRange).length > 0){
        json[0] = arrayRange;
        arrayRange = []
    }
    if(Object.keys(jsonSlider).length > 0){
        json[1] = jsonSlider;
        jsonSlider = {}
    }
    if(jsonFilter.length > 0){
        json[2] = jsonFilter;
        jsonFilter = []
    }

    await sentJson(json);
    await sentImage(changedImages);
    location.reload();
})

function displayData(div){
    const templates = document.querySelectorAll("template");

    const productRange = div.querySelectorAll(".carousel a");
    const bestProducts = div.querySelectorAll(".carousel-b .flex-none");
    const filterType = div.querySelectorAll(".dropdown_menu button");
    const filterItems = div.querySelectorAll(".dropdown_menu .mt-6");

    productRange.forEach((range, index) => {
        const contentRange =  document.importNode(templates[0].content, true);
        contentRange.querySelector("img").src = range.querySelector("img").src;
        contentRange.querySelector("input[type='text']").value = removeUrlPart(range.href, partToRemove);
        contentRange.querySelector("label").setAttribute("for", `file${index}`);
        contentRange.querySelector("input[type='file']").setAttribute("id", `file${index}`);
        document.querySelector(".ranges").appendChild(contentRange);
    })

    bestProducts.forEach((product) => {
        const contentSlider = document.importNode(templates[1].content, true);
        contentSlider.querySelector("img").src = product.querySelector("img").src;
        contentSlider.querySelector("h3").textContent = product.querySelector(".inline-block").textContent;
        document.querySelector(".slider").appendChild(contentSlider);
    })

    filterType.forEach((type, index) => {
        const contentFilter = document.importNode(templates[2].content, true);
        const input = contentFilter.querySelector("input");
        input.value = removeExtraSpaces(type.textContent);
        document.querySelector(".range_filter").appendChild(contentFilter);
        const items = filterItems[index].querySelectorAll(".select-none");

        items.forEach((item) => {
            const contentFilter = document.importNode(templates[2].content, true);
            const input = contentFilter.querySelector("input");
            input.value = removeExtraSpaces(item.textContent);
            input.classList.remove("font-semimedium");
            input.classList.remove("mb-8");
            input.classList.remove("border-b-2");
            input.classList.remove("border-teal-900");
            input.classList.add("mb-4");
            const divIndex = document.querySelectorAll(".types")
            divIndex[index].appendChild(input);
        })
    })
}

function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function removeUrlPart(url, partToRemove) {
    return url.replace(partToRemove, "");
}

function dataFilter(inputText, products){
    products.forEach(product => {
        if(product.innerText.toLowerCase().includes(inputText.toLowerCase())){
            product.style.display = "flex";
        } else {
            product.style.display = "none";
        }
    });
}

function initializeFilters(){
    const input2 = document.querySelector(".input_filter_2");
    const productsList2 = document.querySelectorAll(".list_products_2 li");
    const buttons = document.querySelectorAll(".btn");  
    let filterClick = false;

        ////// otevírání / zavírání volby souvísejících produktů //////

    buttons.forEach((button, index) => {
        button.addEventListener("click", function() {
            document.querySelector(".next_product_filter").style.display = "block";
            nextProductButton = index;
        });
    });

    productsList2.forEach((product) => {
        product.addEventListener("click", function(){
            document.querySelector(".next_product_filter").style.display = "none";
        })
    })

    document.querySelector(".next_product_filter").addEventListener("click", function(){
        if(!filterClick){
            document.querySelector(".next_product_filter").style.display = "none";
        }
        filterClick = false;
    })

    input2.addEventListener("click", function(){
        filterClick = true;
    })

    input2.addEventListener("input", function(e){
        dataFilter(e.target.value, productsList2);
    })  
}

function updateChangedImages() {
    const imageBig = document.querySelectorAll(".image_big");

    imageBig.forEach((image, index) => {
        const images = document.querySelectorAll(".grid-cols-3 img");
        image.addEventListener("change", function(event){
            const file = event.target.files[0];
            if(file){
                let url = URL.createObjectURL(file);
                changedUrl = [images[index].src, imageURLpath + file.name]
                images[index].src = url;
                changedImages.push(file);
                imagesNewUrl.push(changedUrl);
            }
        });
    })
}

async function sentJson(json){
    try {
        const response = await fetch(`http://localhost:8080/api/html/products`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        if (!response.ok) {
            throw new Error('Nepodařilo se aktualizovat soubor.');
        }

    } catch (error) {
        console.error('Chyba při aktualizaci souboru:', error);
    }
}
