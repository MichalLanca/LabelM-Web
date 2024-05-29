/////// CAROUSEL A ///////

const btnNextProductCarouselA = document.querySelector(".btn-next-prod-car-a");
const btnPrevProductCarouselA = document.querySelector(".btn-prev-prod-car-a");
const carousel = document.querySelector(".carousel");
const carouselContainer = document.querySelector(".carousel-container");
const products = carouselContainer.querySelectorAll("a img");
const links = carouselContainer.querySelectorAll("a");
const originalHrefs = Array.from(links).map((link) => link.getAttribute('href'));
let windowSize = 3;
let productIndex = 0;
let isDragging = false;
let isDown = false;
let startPositionX = 0;
let currentTranslateX = 0;
let endPosition = 0;
let dragDistance;
let startY;


btnNextProductCarouselA.addEventListener("click", rightSlide);

btnPrevProductCarouselA.addEventListener("click", leftSlide);

window.addEventListener("resize", responsiveX);

window.addEventListener("load", responsiveX);

function rightSlide(){
  productIndex += 1;
  responsiveX();
}

function leftSlide(){
  productIndex -= 1;
  responsiveX();
}


function enableDisableButton(){
  if(productIndex > 0){
    btnPrevProductCarouselA.removeAttribute("disabled");
  } else if (productIndex === 0){
    btnPrevProductCarouselA.setAttribute("disabled", "");
  }
  if (productIndex === products.length - windowSize){
    btnNextProductCarouselA.setAttribute("disabled", "");
  } if (productIndex < products.length - windowSize){
    btnNextProductCarouselA.removeAttribute("disabled", "")
  }
}


function responsiveX() {
  const imageStyles = getComputedStyle(links[0]);
  let marginLeft = parseInt(imageStyles.getPropertyValue("margin-left"), 10);
  width = products[0].clientWidth + (2* marginLeft);

  if(window.innerWidth > 1023){
    if(windowSize != 3){
      windowChange = 3 - windowSize;
      productIndex -= windowChange;
    }
    windowSize = 3;
  } else if(window.innerWidth < 1024 && window.innerWidth > 767){
    if(windowSize === 1){
      productIndex -= 1;
    }
    windowSize = 2;
  } else if(window.innerWidth < 768){
    windowSize = 1;
  }

  if(window.innerWidth > 767){
    carouselContainer.style.transform = `translateX(-${(productIndex * width)}px)`;
  } else if(window.innerWidth < 768){
    if(productIndex == products.length - 1){
      carouselContainer.style.transform = `translateX(-${(productIndex * width - (window.innerWidth - products[0].clientWidth - 50))}px)`;
    } else {
      carouselContainer.style.transform = `translateX(-${(productIndex * width)}px)`;
    }
  }
  
  enableDisableButton();
}


/////// MOBILE VERSION ///////


carouselContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  startPositionX = e.clientX;
  carouselContainer.style.transition = "none";
  currentTranslateX = getCurrentTranslateX(carouselContainer);
})

carouselContainer.addEventListener("touchstart", (e) => {
  isDown = true;
  startPositionX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  carouselContainer.style.transition = "none";
  currentTranslateX = getCurrentTranslateX(carouselContainer);
});

carouselContainer.addEventListener("mousemove", (e) => {
  if(isDown){
    links.forEach((link) => {
      link.removeAttribute("href");})
    isDragging = true;
    dragDistance = e.clientX - startPositionX;
    endPosition = e.clientX;
    const newTranslateX = currentTranslateX + dragDistance;
    carouselContainer.style.transform = `translateX(${newTranslateX}px)`;
  } 
});

carouselContainer.addEventListener("touchmove", (e) => {
  if (isDown) {
    links.forEach((link) => {
      link.removeAttribute("href");
    });
    isDragging = true;
    dragDistance = e.touches[0].clientX - startPositionX;
    endPosition = e.touches[0].clientX;
    if (Math.abs(dragDistanceX) > Math.abs(dragDistanceY)) {
      const newTranslateX = currentTranslateX + dragDistanceX;
      carouselContainer.style.transform = `translateX(${newTranslateX}px)`;
    }
  }
});


carouselContainer.addEventListener("mouseup", () => {
  isDown = false;
  if (!isDragging) return;
  isDragging = false;
  carouselContainer.style.transition = "";

  if (endPosition > startPositionX && dragDistance >= (products[0].clientWidth / 4) && productIndex != 0) {
      productIndex -= 1;
      responsiveX();
    }
  else if (endPosition < startPositionX && dragDistance <= -(products[0].clientWidth / 4) && productIndex < (products.length - windowSize)) {
      productIndex += 1;
      responsiveX();
  } else {
    responsiveX();
  }

  startPositionX = null;

  setTimeout(() => {
    links.forEach((link, index) => {
      link.setAttribute("href", originalHrefs[index]);
    })
  }, 300)
});

carouselContainer.addEventListener("touchend", () => {
  isDown = false;
  if (!isDragging) return;
  isDragging = false;
  carouselContainer.style.transition = "";

  if (endPosition > startPositionX && dragDistance >= (products[0].clientWidth / 4) && productIndex != 0) {
      productIndex -= 1;
      responsiveX();
    }
  else if (endPosition < startPositionX && dragDistance <= -(products[0].clientWidth / 4) && productIndex < (products.length - windowSize)) {
      productIndex += 1;
      responsiveX();
  } else {
    responsiveX();
  }

  startPositionX = null;

  setTimeout(() => {
    links.forEach((link, index) => {
      link.setAttribute("href", originalHrefs[index]);
    })
  }, 300)
});

carousel.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  carousel.style.transition = '';
});

function getCurrentTranslateX(element) {
  const style = window.getComputedStyle(element);
  const transform = style.getPropertyValue("transform");
  if (transform && transform !== "none") {
    const matrix = new DOMMatrixReadOnly(transform);
    return matrix.m41;
  }
  return 0; 
}






////// CAROUSEL B //////

const carouselContainerB = document.querySelector(".carousel-b");
const carouselB = document.querySelector(".carousel-container-b");
const btnPrevProductCarouselB = document.querySelector(".btn-prev-prod-car-b");
const btnNextProductCarouselB = document.querySelector(".btn-next-prod-car-b");
const productsB = carouselContainerB.querySelectorAll("div a img");
const linksB = carouselContainerB.querySelectorAll("a");
const originalHrefsB = Array.from(linksB).map((link) => link.getAttribute('href'));
const progress = document.querySelector(".progress_bar");
const mobileButtons = document.querySelectorAll(".mobile_buttons button");
let windowSizeB = 4;
let productIndexB = 0;
let isDraggingB = false;
let isDownB = false;
let startPositionXB = 0;
let currentTranslateXB = 0;
let endPositionB = 0;
let dragDistanceB;
let startYB;


btnNextProductCarouselB.addEventListener("click", nextSlideB);

btnPrevProductCarouselB.addEventListener("click", prevSlideB);

window.addEventListener("resize", responsiveXB);

window.addEventListener("load", responsiveXB);

mobileButtons.forEach((button, index) => {
  button.addEventListener("click", function(){
    productIndexB = index;
    responsiveXB();
  })
})

function nextSlideB(){
  productIndexB += 1;
  responsiveXB();
}

function prevSlideB(){
  productIndexB -= 1;
  responsiveXB();
}

function enableDisableButtonB(){
  fullWidth = productsB.length * (productsB[0].clientWidth + 16);
  if(productIndexB > 0){
    btnPrevProductCarouselB.removeAttribute("disabled");
  } else if (productIndexB === 0){
    btnPrevProductCarouselB.setAttribute("disabled", "");
  }
  if (productIndexB === productsB.length - windowSizeB){
    btnNextProductCarouselB.setAttribute("disabled", "");
  } if (productIndexB < productsB.length - windowSizeB){
    btnNextProductCarouselB.removeAttribute("disabled", "")
  }
}

function responsiveXB() {

  const imageStyles = getComputedStyle(carouselB);
  let marginLeft = parseInt(imageStyles.getPropertyValue("padding-left"), 10);
  width = productsB[0].clientWidth + (2 * marginLeft);

  if(window.innerWidth > 1023){
    if(windowSizeB != 4){
      windowChange = 4 - windowSizeB;
      productIndexB -= windowChange;
    }
    windowSizeB = 4;
  } else if(window.innerWidth < 1024 && window.innerWidth > 767){
    if(windowSizeB  != 3 && productIndexB != 0){
      windowChange = 3 - windowSizeB;
      productIndexB -= windowChange;
    }
    windowSizeB = 3;
  } else if(window.innerWidth < 768){
    windowSizeB = 1;
  }

  if(productIndexB === productsB.length - windowSizeB && window.innerWidth > 768){
    let offSet = carouselB.clientWidth - (windowSizeB * width);
    offSet = productsB[0].clientWidth - offSet + (4 * marginLeft); 
    carouselContainerB.style.transform = `translateX(-${((productIndexB - 1) * width) + offSet}px)`;
  } else {
    carouselContainerB.style.transform = `translateX(-${(productIndexB * width)}px)`;
  }

  enableDisableButtonB();
  progressBar();
}

function progressBar(){
  const oneMove = 100 / (productsB.length - windowSizeB);
  let currentPosition = productIndexB * oneMove;
  progress.style.transform = `translateX(${currentPosition}%)`;
  mobileButtons.forEach((button, index) => {
    if(productIndexB != index){
      button.style.opacity = "0.5";
    } else {
      button.style.opacity = "1";
    }
  })
}



/////// MOBILE VERSION ///////


carouselContainerB.addEventListener("mousedown", (e) => {
  isDownB = true;
  startPositionXB = e.clientX;
  carouselContainerB.style.transition = "none";
  currentTranslateXB = getCurrentTranslateXB(carouselContainerB);
})

carouselContainerB.addEventListener("touchstart", (e) => {
  isDownB = true;
  startPositionXB = e.touches[0].clientX;
  startYB = e.touches[0].clientY;
  carouselContainerB.style.transition = "none";
  currentTranslateXB = getCurrentTranslateXB(carouselContainerB);
})

carouselContainerB.addEventListener("mousemove", (e) => {
  if(isDownB){
    linksB.forEach((link) => {
      link.removeAttribute("href");})
    isDraggingB = true;  
    dragDistanceB = e.clientX - startPositionXB;
    endPositionB = e.clientX;
    const newTranslateX = currentTranslateXB + dragDistanceB;
    carouselContainerB.style.transform = `translateX(${newTranslateX}px)`;
  } 
});

carouselContainerB.addEventListener("touchmove", (e) => {
  if(isDownB){
    linksB.forEach((link) => {
      link.removeAttribute("href");})
    isDraggingB = true;  
    dragDistanceB = e.touches[0].clientX - startPositionXB;
    const dragDistanceY = e.touches[0].clientY - startYB;
    endPositionB = e.touches[0].clientX;
    if (Math.abs(dragDistanceX) > Math.abs(dragDistanceY)) {
      const newTranslateX = currentTranslateXB + dragDistanceB;
      carouselContainerB.style.transform = `translateX(${newTranslateX}px)`;}
  } 
});

carouselContainerB.addEventListener("mouseup", () => {
  isDownB = false;
  if (!isDraggingB) return;
  isDraggingB = false;
  carouselContainerB.style.transition = "";

  if (endPositionB > startPositionXB && dragDistanceB >= (productsB[0].clientWidth / 4) && productIndexB != 0) {
      productIndexB -= 1;
      responsiveXB();
    }
  else if (endPositionB < startPositionXB && dragDistanceB <= -(productsB[0].clientWidth / 4) && productIndexB < (productsB.length - windowSizeB)) {
      productIndexB += 1;
      responsiveXB();
  } else {
    responsiveXB();
  }

  startPositionXB = null;

  setTimeout(() => {
    linksB.forEach((link, index) => {
      link.setAttribute("href", originalHrefsB[index]);
    })
  }, 300)
});

carouselContainerB.addEventListener("touchend", () => {
  isDownB = false;
  if (!isDraggingB) return;
  isDraggingB = false;
  carouselContainerB.style.transition = "";

  if (endPositionB > startPositionXB && dragDistanceB >= (productsB[0].clientWidth / 4) && productIndexB != 0) {
      productIndexB -= 1;
      responsiveXB();
    }
  else if (endPositionB < startPositionXB && dragDistanceB <= -(productsB[0].clientWidth / 4) && productIndexB < (productsB.length - windowSizeB)) {
      productIndexB += 1;
      responsiveXB();
  } else {
    responsiveXB();
  }

  startPositionXB = null;

  setTimeout(() => {
    linksB.forEach((link, index) => {
      link.setAttribute("href", originalHrefsB[index]);
    })
  }, 300)
});

carouselB.addEventListener("mouseleave", () => {
  if (!isDraggingB) return;
  isDraggingB = false;
  carouselB.style.transition = '';
});

function getCurrentTranslateXB(element) {
  const style = window.getComputedStyle(element);
  const transform = style.getPropertyValue("transform");
  if (transform && transform !== "none") {
    const matrix = new DOMMatrixReadOnly(transform);
    return matrix.m41;
  }
  return 0; 
}




/////// PRODUCTS / FILTER ///////


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



  




//////////// NAČTENÍ PRODUKTŮ Z DB /////////////


document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('https://my-labelm.cz/api/products');
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



