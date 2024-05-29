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
let isDown = false;
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
  width = productsB[0].clientWidth + (marginLeft);

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
    offSet = productsB[0].clientWidth - offSet + (2* marginLeft + marginLeft / 2); 
    carouselContainerB.style.transform = `translateX(-${((productIndexB - 1) * width) + offSet}px)`;
  } else if(productIndexB === 0){
    carouselContainerB.style.transform = `translateX(-${(marginLeft / 2)}px)`
  } else {
    carouselContainerB.style.transform = `translateX(-${(productIndexB * width + marginLeft / 2)}px)`;
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
  isDown = true;
  startPositionXB = e.clientX;
  carouselContainerB.style.transition = "none";
  currentTranslateXB = getCurrentTranslateXB(carouselContainerB);
})

carouselContainerB.addEventListener("touchstart", (e) => {
  isDown = true;
  startPositionXB = e.touches[0].clientX;
  startYB = e.touches[0].clientY;
  carouselContainerB.style.transition = "none";
  currentTranslateXB = getCurrentTranslateXB(carouselContainerB);
})

carouselContainerB.addEventListener("mousemove", (e) => {
  if(isDown){
    isDraggingB = true;
    linksB.forEach((link) => {
      link.removeAttribute("href");})
    dragDistanceB = e.clientX - startPositionXB;
    endPositionB = e.clientX;
    const newTranslateX = currentTranslateXB + dragDistanceB;
    carouselContainerB.style.transform = `translateX(${newTranslateX}px)`;
  } 
});

carouselContainerB.addEventListener("touchmove", (e) => {
  if(isDown){
    isDraggingB = true;
    linksB.forEach((link) => {
      link.removeAttribute("href");})
    dragDistanceB = e.touches[0].clientX - startPositionXB;
    endPositionB = e.touches[0].clientX
    const dragDistanceY = e.touches[0].clientY - startYB;
    if (Math.abs(dragDistanceX) > Math.abs(dragDistanceY)) {
      const newTranslateX = currentTranslateXB + dragDistanceB;
      carouselContainerB.style.transform = `translateX(${newTranslateX}px)`;
    }
  } 
});

carouselContainerB.addEventListener("mouseup", () => {
  isDown = false;
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
  isDown = false;
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