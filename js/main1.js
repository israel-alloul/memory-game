let Login = document.querySelector(".Login");
let signup = document.querySelector(".sign-up");
let up = document.querySelector("#up");

up.addEventListener("click", () => {
    Login.style.display = "none";
    signup.style.display = "block";
});

document.querySelector("#sum2").addEventListener("click", () => {
    // Retrieve form field values
    let Fname = document.querySelector("#Fname").value;
    let Lname = document.querySelector("#Lname").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#passwordSignup").value;

    // Create the JSON object from validated form data
    let user = {
        firstName: Fname, // Use consistent naming conventions
        lastName: Lname,
        email: email,
        password: password
       
    };

    // Access or initialize local storage data (handle empty storage gracefully)
    let storedData = JSON.parse(localStorage.getItem("users")) || [];

    // Check if a user with the same email already exists
    const matchingUser = storedData.find(user => user.email === email);
    if (matchingUser) {
        alert("A user with this email address already exists!");
        return; // Prevent further processing if a duplicate is found
    }

   
    storedData.push(user);
    localStorage.setItem("users", JSON.stringify(storedData));
    console.log("Person data stored successfully!");
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "html/index1.html";
});

document.querySelector("#log").addEventListener("click", () => {
    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    let message = document.getElementById('message');

    if (!name || !password) {
        message.textContent = "מלא תשדות";
        message.style.color = "red";
        return;
    }

    let storedData = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedData.find(user => user.firstName === name && user.password === password);

    if (user) {
        message.textContent = "יופי התחברת";
        message.style.color = "green";
        localStorage.setItem("currentUser", JSON.stringify(user));  // שמירת המשתמש המחובר ב-Local Storage
        window.location.href = "html/index1.html";
        
    } else {
        message.textContent = "שם משתמש או סיסמה לא חוקי";
        message.style.color = "red";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        console.log("משתמש מחובר: ", currentUser.firstName);
        // תוכל להשתמש בפרטי המשתמש בכל חלק של האפליקציה
    } else {
        console.log("אין משתמש מחובר");
    }
});
