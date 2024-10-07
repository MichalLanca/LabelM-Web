let threshold = 0;
const nextProductButton = document.querySelector(".next_products");
const searchProductButton= document.querySelector(".search_products");
const loadingMain = document.querySelector(".loading_circle_main");
const loadingFilter = document.querySelector(".loading_circle_filter");
const filterButton = document.querySelector(".filter_menu_button");
const filterMenu = document.querySelector(".filter_menu");
const exitFilterMenu = document.querySelector(".exit_filter_menu_button");
const dropdownMenu = document.querySelectorAll(".dropdown_menu button");
const dropdownSelection = document.querySelectorAll(".dropdown_menu .mt-6");
const productsFilter = document.querySelectorAll(".dropdown_menu input");
const productsNumber = document.querySelector(".amount_products");
let filteredProductsClasses = [];


document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:8080/api/products');
  const products = await response.json();
  const innerDivClasses = ["text-center", "xl:mx-6", "2xl:mx-12"];
  const innerAhrefClasses = ["inline-block", "mt-6", "text-xl", "font-extrabold", "leading-5", "tracking-tighter", "uppercase"];
  let arrayOfProducts = [];

  loadProducts(products);

  nextProductButton.addEventListener("click", function(){
    displayProducts(arrayOfProducts)
  })
  
  searchProductButton.addEventListener("click", function(){
    const filteredArray = filterProducts(products);
    filterMenu.style.display = "none";
    displayProducts(filteredArray);
  })

  function loadProducts(products){
    arrayOfProducts = [];
    products.forEach(product => {
      const mainDiv = document.createElement("div");
      const link = document.createElement("a");
      const image = document.createElement("img");
      const transformedName = transformName(product.name);
      link.setAttribute("href", transformedName);
      image.setAttribute("loading", "lazy");
      image.setAttribute("sizes", "31vw");
      image.setAttribute("width", "1920");
      image.setAttribute("height", "1920");
      image.src = product.image_main;
  
      const innerDiv = document.createElement("div");
      addClass(innerDivClasses, innerDiv);
      const secondLink = document.createElement("a");
      addClass(innerAhrefClasses, secondLink);
      secondLink.setAttribute("href", transformedName);
      secondLink.textContent = product.name;
      const span = document.createElement("span");
      span.classList.add("ml-2");
      span.classList.add("text-xl");
  
      innerDiv.appendChild(secondLink);
      innerDiv.appendChild(span);
      link.appendChild(image);
      mainDiv.appendChild(link);
      mainDiv.appendChild(innerDiv);
      arrayOfProducts.push(mainDiv);
    })
    const container = document.querySelector("div.grid.grid-cols-2.gap-4.mt-5");
    container.innerHTML = ""
    arrayOfProducts.forEach((product) => {
      container.appendChild(product);
    })
    displayProducts(arrayOfProducts);
  }

  function displayProducts(array){
    let index = 0;
    threshold += 15;
    array.forEach((product) => {
      product.style.display = "none";
    })
    if(array.length < threshold){
      nextProductButton.style.display = "none";
    }
    productsNumber.textContent = `${array.length} Produktů`;
    while(index < threshold && index < array.length){
      array[index].style.display = "block";
      index++;
    } 
  }

  function filterProducts(products) {
    let filteredProductsArray = []; 
    products.forEach((product) => {
        if (product.filter.some(searchedClass => filteredProductsClasses.includes(searchedClass))) {
            filteredProductsArray.push(product);
        }
    });
    threshold = 0;
    loadProducts(filteredProductsArray);
  }
    
  filterButton.addEventListener("click", function(){
    filterMenu.style.display = "flex";
  })
  
  exitFilterMenu.addEventListener("click", function(){
    filterMenu.style.display = "none";
  })
  
  dropdownMenu.forEach((button, index) => {
    button.addEventListener("click", function(){
      toggle(dropdownSelection[index]);
    })
  })
  
  function toggle(element){
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
  
  productsFilter.forEach((product) => {
    product.addEventListener("click", function(){
      if(this.checked){
        filteredProductsClasses.push(this.value);
      } else {
        filteredProductsClasses = filteredProductsClasses.filter(item => item !== this.value);
      }
    })
  })

  function transformName(name) {
    let lowercaseName = name.toLowerCase();
    let dashedName = lowercaseName.replace(/\s+/g, '-');
    let normalizedName = dashedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let cleanedName = normalizedName.replace(/[^\w\s-]/g, '');
    return cleanedName;
  }

  function addClass(arrayOfClasses, tag){
    arrayOfClasses.forEach((classname) => {
      tag.classList.add(classname);
    })
  }
})



