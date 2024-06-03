const game = document.querySelector(".game");
const arr = [
  "../img/Screenshot 2024-06-02 133226.png",
  "../img/Screenshot 2024-06-02 133240.png",
  "../img/Screenshot 2024-06-02 133249.png",
  "../img/Screenshot 2024-06-02 133301.png",
  "../img/Screenshot 2024-06-02 133311.png",
  "../img/Screenshot 2024-06-02 133324.png",
  "../img/Screenshot 2024-06-02 133337.png",
  "../img/Screenshot 2024-06-02 133444.png",
];

function fills() {
  empty();
  for (let i = 0; i < 8; i++) {
    let count = 0;

    while (count < 2) {
      let rand = Math.floor(Math.random() * 16);
      if (game.children[rand].className == "null") {
        game.children[rand].className = `${i}`;
        game.children[rand].children[0].setAttribute("src", arr[i]);
        count++;
      }
    }
  }
}

function empty() {
  //פונקציה שמרוקת
  for (let i = 0; i < 16; i++) {
    game.children[i].className = "null";
    game.children[i].children[0].classList.add("hidden");
  }
}

function win() {
  //פונקציה ניצחון
  for (let i = 0; i < 16; i++) {
    if (game.children[i].children[0].classList.contains("hidden")) {
      return false;
    }
  }
  return true;
}
let gameStarted = false;
let counterclick;
let firstClick;
let secondClick;

document.querySelector("#start").addEventListener("click", function () {
  fills();
  counterclick = 0;
  firstClick = null;
  secondClick = null;
  gameStarted = true;
});


let gameDivs = document.querySelectorAll(".game div");//רק כשהמשחק מתחיל תוסיף הובר
gameDivs.forEach(function (div) {
  div.addEventListener("mouseover", function () {
    if (gameStarted) {
      div.style.border = "2px black solid";
    }
  });
  div.addEventListener("mouseout", function () {
    div.style.border = "2.5px red solid";
  });
});


let modal = document.querySelector("#winModal");
let span = document.querySelector(".close");
let playAgain = document.querySelector("#playAgain");

span.onclick = function () {
  modal.style.display = "none";
};

playAgain.onclick = function () {
  modal.style.display = "none";
  document.querySelector("#start").click();
};

window.onclick = function (ev) {
  if (ev.target == modal) {
    modal.style.display = "none";
  }
};

let game1 = document.querySelector(".game");
game1.addEventListener("click", function (e) {
  if (counterclick === undefined) {
    return;
  }

  if (e.target.className == "game") {
    return;
  }
  if (counterclick === 2) {
    return;
  }
  if (counterclick === 1) {
    e.target.children[0].classList.remove("hidden"); //לחיצה שניה
    secondClick = e.target;
    counterclick++;
    console.log(secondClick);
  } else {
    e.target.children[0].classList.remove("hidden"); //לחיצה רשונה
    firstClick = e.target;
    counterclick++;

    console.log(firstClick);
  }
  if (counterclick === 1) return;
 
  if (firstClick.classList[0] === secondClick.classList[0]) {
    //משווה את הלחיצות

    console.log("you find ");

    if (win()) {
      setTimeout(() => {
        modal.style.display = "block";
      }, 500);
    }

    counterclick = 0;
    firstClick = null;
    secondClick = null;
  } else {
    setTimeout(() => {
      //אחרי שניה אם לא שווים אז הוא חוזר להסתיר אותם ומהפס
      firstClick.children[0].classList.add("hidden");
      secondClick.children[0].classList.add("hidden");
      counterclick = 0;
      firstClick = null;
      secondClick = null;
    }, 1000);
  }
});
