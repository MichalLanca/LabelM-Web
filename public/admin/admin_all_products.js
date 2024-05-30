////// TEXTY / OBRAZKY Z HTML //////
const exitProductMenu = document.querySelector(".exit_filter_button");
const classicMenu = document.querySelector(".list_menu");
const openProductMenu = document.querySelector(".open_filter_button");
const filterProducts = document.querySelector(".filter_products");
const productsMenu = document.querySelector(".product_list_menu");

openProductMenu.addEventListener("click", function(){   
    if(classicMenu.style.display = "block"){
        classicMenu.style.display = "none";
        filterProducts.style.display = "block";
        openProductMenu.style.display = "none";
        productsMenu.style.display = "flex";
    }
})

exitProductMenu.addEventListener("click", function(){
    if(classicMenu.style.display = "none"){
        classicMenu.style.display = "block";
        filterProducts.style.display = "none";
        openProductMenu.style.display = "block";
        productsMenu.style.display = "none";
    }
})





const nameOfProduct = document.querySelector(".content h1");
const basicInfo = document.querySelectorAll(".basic_info input");
const descriptionOfProduct = document.querySelector(".description textarea");
const descriptionPoints = document.querySelectorAll(".description input");
const ingredients = document.querySelectorAll(".ingredients textarea");
const useOfProduct = document.querySelector(".use textarea");
const images = document.querySelectorAll("img");
const saveProductButton = document.getElementById("saveBtn");
let rangeImage = document.querySelector(".range_image svg");
let videoWeb = document.querySelector("video");
const filterCheckboxes = document.querySelectorAll(".range_filter .filter input");
const imageURLpath = "../images/";
const videoURLpath = "../video/";
const inputRange = document.querySelectorAll("input[type='radio']");
const nextProductName = document.querySelectorAll(".next_products h3");
const nextProductImage = document.querySelectorAll(".next_products img");
let productID 
let changedImages = [];
let changedVideo;
let choosedRange;
let updatedFields = {};
let nextProduct;
let nextProductButton;
let choosedProduct;
let filter = [];

const rangeOne = ["0 0 309.4 200.5", "enable-background:new 0 0 309.4 200.5", `<style>
.st0 {
    fill: currentcolor;
}
</style>
<path class="st0" d="M23.7 7.2C14.8 7.2 9.1 13 9.1 21.9c0 8.6 5.1 14.3 13.7 14.3 4.8 0 8.9-1.6 12.5-4.8l-.1 9.2c-3.8 2.2-7.9 3.3-12.5 3.3C9.3 43.8 0 34.4 0 21.9 0 9.6 9 0 22.9 0c5.2 0 9.4 1.3 12.8 2.9l-.3 8.9c-3.1-2.7-6.7-4.6-11.7-4.6zM53.1 1H62v34.1h14.2v7.6H53.1V1zM91.2 1h24.6v7.5h-15.6v8.6h15.6v7.6h-15.6v10.4h15.6v7.6H91.2V1zM144.8 1H155l16.1 41.7H161l-3.4-8.9h-16.2l-2.9 8.9h-9.6L144.8 1zm6 12.4c-.2-.7-.6-2.6-1.2-5.6-.6 3.3-1 5.3-1.2 5.8l-4.5 13.3h11.6l-4.7-13.5zM184.8 1h9.3l18.4 24.3c1 1.3 2.3 3.8 3.7 7.3-.6-3.6-.6-6.2-.6-8.2V1h8.5v41.7h-8.8l-19-24.7c-1-1.3-2.3-3.8-3.7-7.3.6 3.5.6 6.2.6 8.3v23.8h-8.5V1zM245.1 31.8c1.3 3.1 4.3 5 7.7 5 4.3 0 6.8-2.2 6.8-5.5 0-3.7-3.4-4.4-9.2-7.4-6.1-3.2-9.7-6.2-9.7-12.1 0-6.6 5.7-11.8 14.7-11.8 5 0 8.6 1.7 11.4 5.5l-5.3 5c-1.3-2.4-3.4-3.6-6.2-3.6-3.6 0-5.9 2-5.9 4.8 0 3.8 3.7 4.8 8.4 6.9 7 3.2 10.4 7.2 10.4 12.4 0 7.5-5.4 12.8-14.8 12.8-6.5 0-11.1-2.3-13.3-6.4l5-5.6zM284.9 1h24.6v7.5h-15.6v8.6h15.6v7.6h-15.6v10.4h15.6v7.6h-24.6V1z">
</path>
<g>
<path class="st0" d="M33.1 121.2h13.6l27 44.9c1.5 2.5 3.4 7 5.5 13.5-.9-6.6-.9-11.6-.9-15.2v-43.2h12.5v77.2H78l-27.8-45.8c-1.5-2.5-3.4-7.1-5.5-13.6.8 6.5.8 11.6.8 15.3v44.1H33.1v-77.2zM143.4 162c-4.7 4.5-10.7 6.9-17 6.9-5.6 0-11-2-15.3-5.4-5.7-4.5-8.8-11-8.8-18.2 0-6.4 2.4-12.2 7-16.7 4.5-4.4 10.8-6.9 17.1-6.9 6.3 0 12.5 2.5 17 6.9 4.6 4.5 7 10.3 7 16.7 0 6.5-2.5 12.4-7 16.7zm-2.9-16.7c0-8.3-5.9-15.1-14.1-15.1-8.4 0-14.2 6.8-14.2 15.1 0 8.4 5.6 15.1 14.2 15.1 8.3 0 14.1-6.7 14.1-15.1zM210.5 200.5c-17.8 0-28.5-14.5-28.5-40.1 0-25.3 10.8-40 28.5-40 17.8 0 28.5 14.3 28.5 40 0 25.6-10.9 40.1-28.5 40.1zm-.1-14.3c8.2 0 12.5-8.9 12.5-25.9 0-16.8-4.3-25.7-12.4-25.7s-12.5 9.1-12.5 25.9c0 16.7 4.4 25.7 12.4 25.7zM266.3 135h-15.4l6.5-13h24.5v76.4h-15.5V135z">
</path>
</g>
<path transform="rotate(-90 125.816 183.358)" class="st0" d="M120.9 164.3h9.8v38.1h-9.8z">
</path>
<path class="st0" d="M24.6 79.2h266.7v5.2H24.6z"></path>`];

const rangeTwo = ["0 0 425.1 203", "enable-background:new 0 0 425.1 203", `<style>
.st0 {
    fill: currentcolor;
}
</style>
<path class="st0" d="M24 7.3c-9 0-14.8 5.8-14.8 14.9 0 8.7 5.1 14.5 13.9 14.5 4.8 0 9-1.6 12.6-4.9V41c-3.8 2.2-8 3.4-12.7 3.4-13.6 0-23-9.5-23-22.2C0 9.7 9.2 0 23.2 0c5.3 0 9.5 1.3 12.9 3l-.3 9C32.7 9.2 29.1 7.3 24 7.3zM90.4 37.9c-4.4 4.2-10 6.5-15.9 6.5-5.2 0-10.3-1.8-14.4-5.1-5.3-4.3-8.2-10.3-8.2-17.1 0-6 2.2-11.5 6.6-15.6C62.8 2.5 68.6.1 74.5.1s11.7 2.4 15.9 6.5c4.3 4.2 6.6 9.7 6.6 15.6 0 6-2.4 11.6-6.6 15.7zm-2.7-15.7C87.7 14.4 82.2 8 74.5 8c-7.9 0-13.3 6.4-13.3 14.2 0 7.9 5.2 14.1 13.3 14.1 7.8 0 13.2-6.2 13.2-14.1zM114.1 1h9.4l18.7 24.6c1.1 1.4 2.4 3.8 3.8 7.4-.6-3.6-.6-6.3-.6-8.3V1h8.6v42.2h-8.9l-19.2-25c-1.1-1.4-2.4-3.9-3.8-7.4.6 3.5.6 6.3.6 8.4v24.1h-8.6V1zM172.8 1h11.5c7.4 0 12.9.7 17.6 4.1 5.1 3.8 7.8 9.6 7.8 17.1 0 7.6-2.8 13.4-7.9 17.1-5.1 3.7-10.5 3.9-16.8 3.9h-12.2V1zm14.1 34.6c9.2 0 13.6-3.9 13.6-13.5S196 8.6 186.9 8.6h-5v26.9h5zM227 1h9v42.2h-9V1zM270.9 43.2h-9V8.7h-10.3V1h29.8v7.7H271v34.5zM296.8 1h9v42.2h-9V1zM361.6 37.9c-4.4 4.2-10 6.5-15.9 6.5-5.2 0-10.3-1.8-14.4-5.1-5.3-4.3-8.2-10.3-8.2-17.1 0-6 2.2-11.5 6.6-15.6 4.3-4.1 10.1-6.5 16-6.5s11.7 2.4 15.9 6.5c4.3 4.2 6.6 9.7 6.6 15.6-.1 6-2.4 11.6-6.6 15.7zm-2.7-15.7c0-7.8-5.5-14.2-13.2-14.2-7.9 0-13.3 6.4-13.3 14.2 0 7.9 5.2 14.1 13.3 14.1 7.8 0 13.2-6.2 13.2-14.1zM385.2 1h9.4l18.7 24.6c1.1 1.4 2.4 3.8 3.8 7.4-.6-3.6-.6-6.3-.6-8.3V1h8.6v42.2h-8.9l-19.2-25c-1.1-1.4-2.4-3.9-3.8-7.4.6 3.5.6 6.3.6 8.4v24.1h-8.6V1z">
</path>
<g>
<path class="st0" d="M79.2 122.8h13.7l27.3 45.5c1.6 2.5 3.5 7.1 5.5 13.7-.9-6.7-.9-11.7-.9-15.4v-43.7h12.6v78.2h-13l-28.1-46.4c-1.6-2.5-3.5-7.2-5.5-13.8.9 6.6.9 11.7.9 15.5V201H79.2v-78.2zM190.8 164.1c-4.7 4.5-10.8 7-17.2 7-5.6 0-11.1-2-15.5-5.5-5.7-4.6-8.9-11.2-8.9-18.4 0-6.5 2.4-12.4 7.1-16.9 4.6-4.5 10.9-7 17.3-7s12.6 2.6 17.2 7c4.7 4.5 7.1 10.5 7.1 16.9 0 6.5-2.5 12.5-7.1 16.9zm-3-17c0-8.4-5.9-15.3-14.3-15.3-8.5 0-14.4 6.9-14.4 15.3 0 8.5 5.6 15.3 14.4 15.3 8.5 0 14.3-6.8 14.3-15.3zM258.7 203c-18 0-28.9-14.6-28.9-40.6 0-25.6 10.9-40.5 28.9-40.5s28.9 14.4 28.9 40.5c0 26-11 40.6-28.9 40.6zm-.1-14.4c8.3 0 12.7-9 12.7-26.2 0-17.1-4.4-26-12.6-26s-12.7 9.2-12.7 26.2c.1 16.8 4.5 26 12.6 26zM350.6 200.9h-54.1l27.8-36.4c6.6-8.5 10.3-14.4 10.3-19.5 0-6.2-3.9-9.8-10.3-9.8-5.9 0-9.8 4.6-9.8 12.1v.3h-15.7v-1.3c0-15.6 9.4-24.4 25.6-24.4 16.9 0 26.3 8.2 26.3 21.7 0 11.9-7.8 21.2-19.1 35.4l-7.2 9h26.3v12.9z">
</path>
<path transform="rotate(-90 173.272 185.653)" class="st0" d="M168.3 166.4h9.9V205h-9.9z"></path>
</g>
<path class="st0" d="M81 80.2h270v5.2H81z"></path>`];

const rangeThree = ["0 0 273.7 199.7", "enable-background:new 0 0 273.7 199.7", `<style>
.st0 {
    fill: currentcolor;
}
</style>
<path class="st0" d="M70.6 7.1c-8.9 0-14.5 5.8-14.5 14.6 0 8.6 5.1 14.2 13.7 14.2 4.8 0 8.9-1.6 12.4-4.8l-.1 9.1c-3.8 2.2-7.9 3.3-12.5 3.3-13.4.1-22.6-9.2-22.6-21.7C47 9.5 56 0 69.8 0c5.2 0 9.4 1.3 12.7 2.9l-.3 8.9c-3-2.7-6.6-4.7-11.6-4.7zM110.7 1h10.2l16 41.6h-10.1l-3.4-8.8h-16.1l-2.9 8.8h-9.5L110.7 1zm6 12.3c-.2-.7-.6-2.6-1.2-5.6-.6 3.3-1.1 5.2-1.2 5.8l-4.5 13.2h11.5l-4.6-13.4zM171.4 42.5l-10.9-19.4v19.4h-8.9V1h12.7c10.1 0 15.1 4 15.1 11.8 0 5.8-3.8 10.2-9.2 10.9l11.5 18.9h-10.3zm-9.6-23.8c5.5 0 8.8-.5 8.8-5.3s-3.2-5.6-8.8-5.6h-1.3v10.9h1.3zM196.1 1h24.5v7.5H205V17h15.6v7.6H205V35h15.6v7.6h-24.5V1z">
</path>
<g>
<path class="st0" d="M0 120.8h13.5l26.9 44.7c1.5 2.5 3.4 7 5.4 13.4-.8-6.6-.8-11.5-.8-15.2v-43h12.4v76.9H44.6L17 152.1c-1.5-2.5-3.4-7.1-5.4-13.6.8 6.5.8 11.5.8 15.3v43.9H0v-76.9zM109.8 161.4c-4.7 4.5-10.7 6.9-17 6.9-5.5 0-10.9-2-15.3-5.4-5.6-4.5-8.7-11-8.7-18.1 0-6.4 2.4-12.2 7-16.6 4.5-4.4 10.7-6.9 17-6.9 6.3 0 12.4 2.5 17 6.9 4.6 4.5 7 10.3 7 16.6 0 6.4-2.4 12.3-7 16.6zm-2.8-16.6c0-8.3-5.8-15.1-14.1-15.1-8.4 0-14.1 6.8-14.1 15.1 0 8.4 5.5 15 14.1 15 8.3 0 14.1-6.7 14.1-15zM176.7 199.7c-17.8 0-28.4-14.4-28.4-39.9 0-25.2 10.8-39.8 28.4-39.8 17.8 0 28.4 14.2 28.4 39.8 0 25.5-10.9 39.9-28.4 39.9zm-.1-14.2c8.2 0 12.5-8.8 12.5-25.8 0-16.8-4.3-25.6-12.4-25.6-8.1 0-12.5 9-12.5 25.8 0 16.6 4.4 25.6 12.4 25.6zM234.7 177.4v.2c0 5.4 4.4 9.4 11.3 9.4 7.9 0 12.2-4.1 12.2-11.1 0-7.5-4.4-11.4-12.9-11.4-.6 0-1.3.1-2 .1v-13.5c.6 0 1.3.1 1.8.1 7.6 0 11.4-3.3 11.4-9.7 0-5.4-3.6-9.1-9.5-9.1-6 0-9.5 2.8-10.1 8h-14.6c.8-12.9 9.6-20.3 25.3-20.3 15.1 0 24.3 8 24.3 20.4 0 8.7-5.2 15.4-12.9 16.8 9 1.9 14.7 9.6 14.7 19.7 0 13.9-10.4 22.8-28 22.8-16 0-26.1-8.9-26.1-21.7v-.6h15.1z">
</path>
</g>
<path transform="rotate(-90 92.767 182.735)" class="st0" d="M87.9 163.8h9.8v37.9h-9.8z">
</path>
<path class="st0" d="M3.9 79h265.6v5.1H3.9z"></path>`]

const rangeFour = ["0 0 275 199.8", "enable-background:new 0 0 275 199.8", `<style>
.st0 {
    fill: currentcolor;
}
</style>
<path class="st0" d="M24.5 7.4c-9.2 0-15 6-15 15.1 0 8.9 5.2 14.7 14.1 14.7 4.9 0 9.2-1.6 12.9-5l-.1 9.4c-3.9 2.3-8.2 3.4-12.9 3.4C9.6 45.1 0 35.5 0 22.5 0 9.9 9.3 0 23.6 0c5.4 0 9.7 1.3 13.2 3l-.3 9.2c-3.2-2.8-6.9-4.8-12-4.8zM75.2 44 63.9 23.9V44h-9.2V1h13.2c10.5 0 15.6 4.1 15.6 12.2 0 6-4 10.5-9.6 11.2L85.7 44H75.2zm-9.9-24.6c5.7 0 9.1-.5 9.1-5.5s-3.3-5.8-9.1-5.8h-1.4v11.3h1.4zM101.9 1h25.3v7.8h-16.1v8.8h16.1v7.8h-16.1v10.8h16.1V44h-25.3V1zM158.7 1h10.5l16.6 43h-10.5l-3.5-9.1h-16.7l-3 9.1h-9.9l16.5-43zm6.2 12.8c-.2-.7-.7-2.6-1.2-5.8-.6 3.4-1.1 5.4-1.3 6l-4.6 13.7h11.9l-4.8-13.9zM214.8 44h-9.2V8.8h-10.5V1h30.3v7.8h-10.6V44zM243.4 1h25.3v7.8h-16.1v8.8h16.1v7.8h-16.1v10.8h16.1V44h-25.3V1z">
</path>
<g>
<path class="st0" d="M1.8 121.6h13.4l26.6 44.3c1.5 2.4 3.4 6.9 5.4 13.3-.8-6.5-.8-11.4-.8-15v-42.6h12.3v76.2H46.1l-27.4-45.2c-1.5-2.4-3.4-7-5.4-13.4.8 6.4.8 11.4.8 15.1v43.5H1.8v-76.2zM110.7 161.8c-4.6 4.4-10.6 6.8-16.8 6.8-5.5 0-10.8-1.9-15.1-5.4-5.6-4.5-8.7-10.9-8.7-18 0-6.4 2.4-12.1 6.9-16.5s10.6-6.8 16.9-6.8c6.2 0 12.3 2.5 16.8 6.8 4.5 4.4 6.9 10.2 6.9 16.5 0 6.5-2.4 12.3-6.9 16.6zm-2.9-16.5c0-8.2-5.8-14.9-13.9-14.9-8.3 0-14 6.7-14 14.9 0 8.3 5.5 14.9 14 14.9 8.3 0 13.9-6.6 13.9-14.9zM177 199.8c-17.6 0-28.2-14.3-28.2-39.6 0-24.9 10.7-39.4 28.2-39.4 17.6 0 28.1 14.1 28.1 39.4 0 25.3-10.8 39.6-28.1 39.6zm-.1-14.1c8.1 0 12.4-8.7 12.4-25.6 0-16.6-4.3-25.4-12.3-25.4s-12.4 9-12.4 25.6c0 16.5 4.4 25.4 12.3 25.4zM253 183.2h-36.7v-7l36.7-55.3h14v51.5h8v10.9h-8v14.6h-14v-14.7zm.2-37.1c0-3.1 0-6.2.5-9.5-1.4 3.7-3.2 7.2-5.3 10.6L232 172.3h21.2v-26.2z">
</path>
</g>
<path transform="rotate(-90 93.748 182.944)" class="st0" d="M88.9 164.1h9.7v37.6h-9.7z">
</path>
<path class="st0" d="M5.7 80.1H269v5.1H5.7z"></path>`];

const rangeFive = ["0 0 362.5 199.5", "enable-background:new 0 0 362.5 199.5", `<style>
.st0 {
    fill: currentcolor;
}
</style>
<path class="st0" d="M23.6 7.1c-8.9 0-14.5 5.7-14.5 14.6 0 8.6 5.1 14.2 13.6 14.2 4.8 0 8.9-1.6 12.4-4.8l-.1 9.1c-3.8 2.2-7.9 3.3-12.5 3.3C9.2 43.6 0 34.2 0 21.8 0 9.5 9 0 22.8 0c5.2 0 9.3 1.3 12.7 2.9l-.3 8.9c-3-2.7-6.6-4.7-11.6-4.7zM88.8 37.2c-4.3 4.1-9.9 6.4-15.7 6.4-5.1 0-10.1-1.8-14.1-5-5.2-4.2-8-10.2-8-16.8 0-5.9 2.2-11.3 6.4-15.4S67.3 0 73.1 0c5.8 0 11.5 2.3 15.7 6.4 4.2 4.1 6.4 9.5 6.4 15.4.1 5.9-2.2 11.4-6.4 15.4zm-2.6-15.4c0-7.7-5.4-13.9-13-13.9-7.7 0-13.1 6.3-13.1 13.9 0 7.7 5.1 13.9 13.1 13.9 7.7 0 13-6.2 13-13.9zM114.8 1h9.3l8 24.4c.3.9.7 2.7 1.1 5.6.3-3 .7-4.9 1-5.7L142.4 1h9.2l6.3 41.5h-8.4l-3-25c-.3-2.3-.6-4.5-.6-6.8 0-.5 0-1 .1-1.6-.6 3.4-1.1 5.7-1.5 6.9l-8.8 26.5h-5L122 16c-.2-.5-.7-2.8-1.6-6.9v1.2c0 3-.3 5.3-.5 7.2l-3 25h-8.4L114.8 1zM173 1h10.2c10.6 0 16 3.9 16 12.8 0 7.9-5.4 12.9-14.8 12.9H182v15.9h-9V1zm10.2 18.7c4.6 0 6.9-1.7 6.9-6.3 0-4.2-2.2-5.9-6.9-5.9h-1.3v12.2h1.3zM214.6 1h8.9v34h14.2v7.5h-23.1V1zM253.7 1h24.4v7.5h-15.6V17h15.6v7.5h-15.6v10.4h15.6v7.5h-24.4V1zM312.8 42.5h-8.9v-34h-10.2V1H323v7.5h-10.2v34zM338.1 1h24.4v7.5h-15.6V17h15.6v7.5h-15.6v10.4h15.6v7.5h-24.4V1z">
</path>
<g>
<path class="st0" d="M47.6 120.6h13.5L88 165.3c1.5 2.5 3.4 7 5.4 13.4-.8-6.6-.8-11.5-.8-15.1v-43H105v76.8H92.2l-27.6-45.6c-1.5-2.5-3.4-7.1-5.4-13.5.8 6.4.8 11.5.8 15.3v43.8H47.6v-76.8zM157.4 161.2c-4.6 4.5-10.7 6.9-16.9 6.9-5.5 0-10.9-1.9-15.3-5.4-5.6-4.5-8.7-11-8.7-18.1 0-6.4 2.4-12.2 7-16.6 4.5-4.4 10.7-6.9 17-6.9 6.3 0 12.4 2.5 16.9 6.9 4.6 4.5 7 10.3 7 16.6-.1 6.4-2.5 12.3-7 16.6zm-2.9-16.6c0-8.3-5.8-15.1-14.1-15.1-8.4 0-14.1 6.8-14.1 15.1s5.5 15 14.1 15c8.4 0 14.1-6.6 14.1-15zM224.1 199.5c-17.7 0-28.4-14.4-28.4-39.9 0-25.1 10.8-39.8 28.4-39.8 17.7 0 28.4 14.2 28.4 39.8 0 25.5-10.8 39.9-28.4 39.9zm-.1-14.2c8.2 0 12.5-8.8 12.5-25.8 0-16.8-4.3-25.6-12.4-25.6-8.1 0-12.5 9-12.5 25.8.1 16.6 4.5 25.6 12.4 25.6zM287.3 187c10.4 0 16.3-5.6 16.3-14 0-8.8-5.7-14-16.4-14-5.6 0-10.3 1.5-14.3 4.5l-3.6-2.2 9.6-40h39.6v12.9h-29.7l-3.8 15.6c3.1-1 6.3-1.6 10.1-1.6 14.4 0 24.6 10 24.6 24.4 0 16.2-11.6 26.9-31.4 26.9-8.7 0-15.8-2-22.1-6.2l3.3-12.5c5.8 3.9 10.5 6.2 17.8 6.2z">
</path>
</g>
<path transform="rotate(-90 140.303 182.527)" class="st0" d="M135.4 163.6h9.8v37.9h-9.8z">
</path>
<path class="st0" d="M51.6 78.9h265.3V84H51.6z"></path>`];


////// nacitani dat z DB ///////


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:8080/api/products');
    const products = await response.json();
    const listContainer = document.querySelector(".list_products");
    const itemTemplate = document.getElementById("item-template");
    const listContainerTwo = document.querySelector(".list_products_2");
    const itemTemplateTwo = document.getElementById("item-template_2");

    openBlock();
    responsiveMenu();

    products.forEach((product) => {

      const templateButtonOne = document.importNode(itemTemplate.content, true);
      const button = templateButtonOne.querySelector('li');
      const templateButtonTwo = document.importNode(itemTemplateTwo.content, true);
      const buttonTwo = templateButtonTwo.querySelector("li");
      button.addEventListener('click', async () => {
        displayProductInfo(product);  
        productID = product._id;
        choosedProduct = product;
        console.log(product.url)
        filter = [];
      });

      buttonTwo.addEventListener("click", async function(){
        const productImage = product.image_main;
        nextProduct = product.name;
        relatedProducts(nextProduct, nextProductButton, productImage);
      })
      
      const h2One = templateButtonOne.querySelector('h2');
      h2One.textContent = product.name;
      listContainer.appendChild(templateButtonOne);
      const h2Two = templateButtonTwo.querySelector("h2");
      h2Two.textContent = product.name;
      listContainerTwo.appendChild(templateButtonTwo);
    });
    initializeFilters();
    updateChangedImages();
  });


////// filtrace ///////

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
    const input = document.querySelector(".input_filter");
    const productsList = document.querySelectorAll(".list_products li");

    const input2 = document.querySelector(".input_filter_2");
    const productsList2 = document.querySelectorAll(".list_products_2 li");


    input.addEventListener("input", function(e){
        dataFilter(e.target.value, productsList);
    })

    input2.addEventListener("input", function(e){
        dataFilter(e.target.value, productsList2);
    })    

        ////// otevírání / zavírání volby souvísejících produktů //////
    const buttons = document.querySelectorAll(".next_products button");

    buttons.forEach((button, buttonIndex) => {
        button.addEventListener("click", function() {
                document.querySelector(".next_product_filter").style.display = "block";
                nextProductButton = buttonIndex;
        });
    });

    productsList2.forEach((product) => {
        product.addEventListener("click", function(){
            document.querySelector(".next_product_filter").style.display = "none";
        })
    })

    const background = document.querySelector(".background-next-product");   
    background.addEventListener("click", () => {
        if(background.style.display === "block"){
            background.style.display = "none";
        }
    })
    input2.addEventListener("click", (e) => {
        e.stopPropagation();
    })
}


////// vypis dat z DB do administrace ///////

function displayProductInfo(product){
    nameOfProduct.textContent = product.name;
    basicInfo[0].value = product.name;
    basicInfo[1].value = product.available;
    basicInfo[2].value = product.points;
    descriptionOfProduct.textContent = product.description;
    useOfProduct.textContent = product.use;


    descriptionPoints.forEach((point, index) => {
        point.setAttribute("placeholder", "");
        if(index < product.desc_short.length){
            point.value = product.desc_short[index];
        }
    })
    ingredients.forEach((ingredient, index) => {
        ingredient.setAttribute("placeholder", "");
        if(index < product.ingredients.length){
            ingredient.value = product.ingredients[index]
        }
    })  
    if(images[1]){
        images[1].src = product.image_main;
    } else {

    }
    if(images[2]){
        images[2].src = product.image_small;
    }
    if(rangeImage){
        rangeImage.setAttribute("viewBox", product.image_range[0]);
        rangeImage.setAttribute("style", product.image_range[1]);
        rangeImage.innerHTML = product.image_range[2];
        switch(product.image_range[0]){
            case "0 0 309.4 200.5":
                inputRange[0].checked = true;
                break
            case "0 0 425.1 203":
                inputRange[1].checked = true;
                break
            case "0 0 273.7 199.7":
                inputRange[2].checked = true;
                break
            case "0 0 275 199.8":
                inputRange[3].checked = true;
                break
            case "0 0 362.5 199.5":
                inputRange[4].checked = true;
                break
        }
    }
    if(videoWeb){
        videoWeb.src = product.video;
    }
    nextProductName.forEach((name, index) => {
        name.textContent = product.next_products[index][0];
        nextProductImage[index].src = product.next_products[index][1];
    })

    filterCheckboxes.forEach((box) => {
        box.checked = false;
    })
    product.filter.forEach((check) => {
        document.querySelector(`input[value="${check}"]`).checked = true;
    })
}




/////// otevření záložky ////////

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



//////// ulozeni produktu do DB ////////

saveProductButton.addEventListener("click", async function() {
  await sentImage(changedImages);
  await sentVideo(changedVideo);
  sentText();
  location.reload();
});


function updateChangedImages() {
    const imageBig = document.querySelector(".image_big");
    const imageSmall = document.querySelector(".image_small");
    const video = document.querySelector(".video");

    imageBig.addEventListener("change", function(event){
        const file = event.target.files[0];
        if(file){
            let url = URL.createObjectURL(file);
            images[1].src = url;
            updatedFields["image_main"] = imageURLpath + file.name; 
            changedImages.push(file);
        }
    });
    imageSmall.addEventListener("change", function(event){
        const file = event.target.files[0];
        if(file){
            let url = URL.createObjectURL(file)
            images[2].src = url;
            updatedFields["image_small"] = imageURLpath + file.name; 
            changedImages.push(file);
        }
    });
    video.addEventListener("change", function(event){
        const file = event.target.files[0];
        if(file){
            let url = URL.createObjectURL(file);
            videoWeb.src = url;
            updatedFields["video"] = videoURLpath + file.name; 
            changedVideo = file;
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

async function sentVideo(file) {
    if (file) {      
        const formData = new FormData();
        formData.append("video", file);

        try {
            const response = await fetch('http://localhost:8080/api/upload/video', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const videoPath = await response.text();
            } else {
                console.error('Nastala chyba p�i nahr�v�n� videa:', response.statusText);
            }
        } catch (error) {
            console.error('Nastala chyba p�i komunikaci se serverem.', error);
        }
    }
}


/////// odeslani dat do DB ////////

async function sentText(){
    let descrip_short = []
    let ingred = []
    
    descriptionPoints.forEach((point) => {
        if(point.value != ""){
            descrip_short.push(point.value)
        }
    })
    ingredients.forEach((ingredient) => {
        if(ingredient.value != ""){
            ingred.push(ingredient.value)
        }
    })

    if(choosedProduct.name != basicInfo[0].value){
        updatedFields["name"] = basicInfo[0].value;
    }
    if(choosedProduct.description != descriptionOfProduct.value){
        updatedFields["description"] = descriptionOfProduct.value;
    }
    if(choosedProduct.available != basicInfo[1].value){
        updatedFields["available"] = basicInfo[1].value;
    }
    if(choosedProduct.points != basicInfo[2].value){
        updatedFields["points"] = basicInfo[2].value;
    }
    descrip_short.forEach((desc, index) => {
        if(desc != choosedProduct.desc_short[index] || descrip_short.length != choosedProduct.desc_short.length){
            updatedFields["desc_short"] = descrip_short;
        }
    })
    ingred.forEach((ingredient, index) => {
        if(ingredient != choosedProduct.ingredients[index] || ingred.length != choosedProduct.ingredients.length){
            updatedFields["ingredients"] = ingred;
        }
    })
    if(choosedProduct.use != useOfProduct.value){
        updatedFields["use"] = useOfProduct.value;
    }
    if(filter.length != 0){
        const filterCheckbox = document.querySelectorAll(".range_filter .filter input");
        filterCheckbox.forEach((checkbox) => {
                if(checkbox.checked){
                    filter.push(checkbox.value);
                }
        })
        updatedFields["filter"] = filter;
    }
    if(Object.keys(updatedFields).length > 0){
        updatedFields["url"] = choosedProduct.url;
    }

    try {
        console.log(updatedFields)
        const response = await fetch(`http://localhost:8080/api/products/${productID}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFields)
        })
        if (!response.ok) {
            throw new Error('Nepodařilo se aktualizovat produkt.');
        }

        const updatedProduct = await response.json();
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
    }
}


//////// výběr range obrázku ////////

inputRange.forEach((input) => {
    input.addEventListener("click", () => {
        if(input.id === "No01"){
            updatedFields["image_range"] = rangeOne;
            rangeImage.setAttribute("viewBox", rangeOne[0]);
            rangeImage.setAttribute("style", rangeOne[1]);
            rangeImage.innerHTML = rangeOne[2];
        } else if(input.id === "No02"){
            updatedFields["image_range"] = rangeTwo;
            rangeImage.setAttribute("viewBox", rangeTwo[0]);
            rangeImage.setAttribute("style", rangeTwo[1]);
            rangeImage.innerHTML = rangeTwo[2];
        } else if(input.id === "No03"){
            updatedFields["image_range"] = rangeThree;
            rangeImage.setAttribute("viewBox", rangeThree[0]);
            rangeImage.setAttribute("style", rangeThree[1]);
            rangeImage.innerHTML = rangeThree[2];
        } else if(input.id === "No04"){
            updatedFields["image_range"] = rangeFour;
            rangeImage.setAttribute("viewBox", rangeFour[0]);
            rangeImage.setAttribute("style", rangeFour[1]);
            rangeImage.innerHTML = rangeFour[2];
        } else if(input.id === "No05"){
            updatedFields["image_range"] = rangeFive;
            rangeImage.setAttribute("viewBox", rangeFive[0]);
            rangeImage.setAttribute("style", rangeFive[1]);
            rangeImage.innerHTML = rangeFive[2];
        }
    })
})


function relatedProducts(product, buttonIndex, image){
   const adjustedPath = adjustImagePath(image);

   switch (buttonIndex){
    case 0:
        nextProductName[0].textContent = product;
        nextProductImage[0].src = adjustedPath;
        choosedProduct["next_products"][0] = [product, adjustedPath];
        break
    case 1:
        nextProductName[1].textContent = product;
        nextProductImage[1].src = adjustedPath;
        choosedProduct["next_products"][1] = [product, adjustedPath];
        break
    case 2:
        nextProductName[2].textContent = product;
        nextProductImage[2].src = adjustedPath;
        choosedProduct["next_products"][2] = [product, adjustedPath];
   }

   updatedFields["next_products"] = choosedProduct["next_products"];
   function adjustImagePath(imagePath){
    return imagePath.replace(/^\.\.\/\.\.\//, '../');
   }
}


const filterCheckbox = document.querySelectorAll(".range_filter .filter input");
filterCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", function(){
        if(checkbox.checked){
            filter.push(checkbox.value);
        }
    })
})

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


