const btnMenu = document.querySelector(".btn_menu");
const mainMenu = document.querySelector(".main_menu");
const btnExit = document.querySelector(".btn_exit_menu");

btnMenu.addEventListener('click', () => {
  mainMenu.style.display = "flex";
});

btnExit.addEventListener("click", () => {
  mainMenu.style.display = "none";

})  

function urlRedirect(linkOne, linkTwo){
  let modal = document.getElementById("modal");
  const yesBtn = document.getElementById("yes_btn_link");
  const noBtn = document.getElementById("no_btn_link");
  const exitBtn = document.getElementById("exit_btn_links");

      event.preventDefault();

      modal.style.display = "flex";

      yesBtn.addEventListener("click", function () {
          window.open(linkOne, "_blank");
          modal.style.display = "none";
      });

      noBtn.addEventListener("click", function () {
          window.open(linkTwo, "_blank");
          modal.style.display = "none";
      });

      exitBtn.addEventListener("click", function(){
         modal.style.display = "none";
      })
}



const newsletter = document.querySelector(".newsletter");
const newsletterSignUpButton = document.querySelector(".newsletter_button");

newsletterSignUpButton.addEventListener("click", function(event){
  event.preventDefault();
  console.log(newsletter);
  newsletter.style.display = "flex";
})
