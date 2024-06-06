let Login = document.querySelector(".Login");
let signup = document.querySelector(".sign-up");
let up = document.querySelector("#up");

up.addEventListener("click", () => {
  Login.style.display = "none";
  signup.style.display = "block";
});

document.querySelector("#sum2").addEventListener("click", (event) => {
  let form2 = document.getElementById("sign-form");
  if (!form2.reportValidity()) {
    event.preventDefault();
    return;
  }

  let Fname = document.querySelector("#Fname").value;
  let Lname = document.querySelector("#Lname").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#passwordSignup").value;

  let user = {
    firstName: Fname,
    lastName: Lname,
    email: email,
    password: password,
    highScore: 0,
  };

  let storedData = JSON.parse(localStorage.getItem("users")) || [];
  const matchingUser = storedData.find((user) => user.email === email);
  if (matchingUser) {
    showModal("A user with this email address already exists!");
    return;
  }

  storedData.push(user);
  localStorage.setItem("users", JSON.stringify(storedData));
  console.log("Person data stored successfully!");
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "html/index2.html";
});

document.querySelector("#log").addEventListener("click", (event) => {
  event.preventDefault();
  let form = document.getElementById("login-form");
  if (!form.reportValidity()) {
    return;
  }

  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;
  let message = document.getElementById("message");

  let storedData = JSON.parse(localStorage.getItem("users")) || [];
  let user = storedData.find(
    (user) => user.firstName === name && user.password === password
  );

  if (user) {
    message.textContent = "יופי התחברת";
    message.style.color = "green";
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "html/index2.html";
  } else {
    message.textContent = "שם משתמש או סיסמה לא חוקי";
    message.style.color = "red";
  }
});

// פונקציה להציג את ה-modal
function showModal(message) {
  let modal = document.getElementById("errorModal");
  let modalMessage = document.getElementById("modalMessage");
  let span = document.getElementsByClassName("close")[0];

  modalMessage.textContent = message;
  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
