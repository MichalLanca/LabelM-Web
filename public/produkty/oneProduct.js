//////// VIDEO ///////

const vimeoDiv = document.querySelector(".vimeo_div");
const vimeoButton = document.querySelector(".vimeo_button");
const vimeoExitButton = document.querySelector(".exit_vimeo_button");
const muteButtons = document.querySelectorAll(".toggle_muted svg");
let iframe = document.querySelector(".vimeo_product").getAttribute("id");
let player = new Vimeo.Player(iframe);
let moveToRight = 0;



vimeoButton.addEventListener("click", function(){
        vimeoDiv.style.display = "block";
        setTimeout(() => {
            vimeoDiv.style.opacity = "1";
            player.play();
        }, 50)
})

vimeoExitButton.addEventListener("click", function(){
    player.pause();
    vimeoDiv.style.opacity = "0";
    setTimeout(() => {
        vimeoDiv.style.display = "none";
        player.setCurrentTime(0);
    }, 250)
})

function toggleMuted(){
    player.getVolume().then(function(volume) {
      if (volume === 0) {
        player.setVolume(1);
        muteButtons[0].style.display = "block";
        muteButtons[1].style.display = "none";
      } else {
        player.setVolume(0);
        muteButtons[0].style.display = "none";
        muteButtons[1].style.display = "block";
      }
    });
  }



