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

function creatdiv(num) {
  for (let i = 0; i < num; i++) {
    let div = document.createElement("div");
    div.className = "null";

    let img = document.createElement("img");
    img.className = "hidden";

    img.setAttribute("src", "");
    div.appendChild(img);
    game.appendChild(div);
  }
}

function fills(num) {
  //פונקציה שממלאת את הדיבים רנדומלית
  empty();
  for (let i = 0; i < num / 2; i++) {
    let count = 0;

    while (count < 2) {
      let rand = Math.floor(Math.random() * num);
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
  for (let i = 0; i < numOfCards; i++) {
    game.children[i].className = "null";
    game.children[i].children[0].classList.add("hidden");
  }
}

function win() {
  //פונקציה ניצחון
  for (let i = 0; i < numOfCards; i++) {
    if (game.children[i].children[0].classList.contains("hidden")) {
      return false;
    }
  }
  return true;
}

function resetAll() {
  //dom  מהפונקציה שמוחקת
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
}

let gameStarted = false;
let counterclick;
let firstClick;
let secondClick;
let numOfCards = 4;
let difficultySelect = document.querySelector("#difficult");
let countdown;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0; // טען את הניקוד הגבוה מ-Local Storage
let currentUser =
  JSON.parse(localStorage.getItem("currentUser")).firstName || "Player5";

document.querySelector("#highScore").textContent = `High Score: ${highScore}`;

difficultySelect.addEventListener("change", function () {
  //בוחר את רמת המשחק
  let difficult = difficultySelect.value;
  if (difficult === "easy") {
    numOfCards = 4;
  }
  if (difficult === "medium") {
    numOfCards = 8;
  }
  if (difficult === "hard") {
    numOfCards = 16;
  }
});

document.querySelector("#start").addEventListener("click", function () {
  //start מקום ההפעלה של
  resetAll();
  creatdiv(numOfCards);
  fills(numOfCards);
  counterclick = 0;
  firstClick = null;
  secondClick = null;
  gameStarted = true;
  updateCurrentPlayer();
  checkHighScore();

  score = 0;
  document.querySelector("#score").textContent = `Score: ${score}`;

  let timeLeft = 90; // 1.5 minutes

  let timerDisplay = document.querySelector("#timer"); // עושה פה טיימר
  timerDisplay.textContent = `Time left:\n 00:${timeLeft} `;

  // עצירת הטיימר אם כבר פועל ואז איפוסו
  if (countdown) {
    clearInterval(countdown);
  }

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left:\n 00:${timeLeft} `;

    if (timeLeft === 0) {
      clearInterval(countdown);
      document.querySelector(".modal-content").innerText = "time is up!";

      modal.style.display = "block";
    }
  }, 1000);

  let gameDivs = document.querySelectorAll(".game div"); //פונקציה שעושה HOVER על הDIV אחרי תחילת המשחק
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
});

function updateCurrentPlayer() {
  document.querySelector(
    "#currentPlayer"
  ).textContent = `Current Player: ${currentUser}`;
}

let modal = document.querySelector("#winModal"); //מודל אם נצח מציג הודעת ניצחון
let span = document.querySelector(".close");
let playAgain = document.querySelector("#playAgain");

span.onclick = function () {
  modal.style.display = "none";
};

playAgain.onclick = function () {
  modal.style.display = "none";
  document.querySelector("#start").click();
  checkHighScore();
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
    score += 10; // הוספת ניקוד
    document.querySelector("#score").textContent = `Score: ${score}`;

    if (win()) {
      setTimeout(() => {
        modal.style.display = "block";
        let storedData = JSON.parse(localStorage.getItem("users")) || [];
        let current = JSON.parse(localStorage.getItem("currentUser"));
        current.highScore += 20;

        // מציאת המשתמש הנוכחי במערך המשתמשים
        let userIndex = storedData.findIndex(
          (value) => value.email === current.email
        );

        if (userIndex !== -1) {
          storedData[userIndex] = current;
        }

        // שמירת הנתונים המעודכנים חזרה ל-localStorage
        localStorage.setItem("users", JSON.stringify(storedData));
        localStorage.setItem("currentUser", JSON.stringify(current));
        console.log(highScore, "highScore");
        console.log(score, "score");
        checkHighScore();
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
localStorage.removeItem("highScore");

function checkHighScore() {
  // פונקציה ששומרת את הניקוד הגבוה ביותר LOCAL sorage
  //   if (score > highScore) {
  //     highScore = score;

  //     document.querySelector(
  //       "#highScore"
  //     ).textContent = `High Score: ${highScore}`;
  //   }
  //

  let score100 = JSON.parse(localStorage.getItem("currentUser")).highScore;
  document.querySelector("#highScore").innerText = `Score: ${score100}`;
}
