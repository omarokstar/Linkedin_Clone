
var index = JSON.parse(localStorage.getItem("studentIndex")) || 1;
function generateId() {
  let newId = index;
  index++;
  localStorage.setItem("studentIndex", JSON.stringify(index));
  return newId;
}

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
const passwordRegex = /^[A-Za-z\d@$!%*?&]{5,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const users = JSON.parse(localStorage.getItem("users")) || [];

// Function to assign student
function assignUser(username, password, email) {


  let user = {
    id: generateId(),
    name: username,
    email: email,
    password: password,
  
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}


// Signup functionality
document.getElementById("SignupForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let confirmPass = document.getElementById("confirm-password").value;

  if (!usernameRegex.test(username)) {
    alert("Username must be at least 5 characters long and contain only alphanumeric characters or underscores.");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Password must be at least 5 characters long and can include special characters.");
    return;
  }

  if (confirmPass!==password) {
    alert("Passwords not Matched");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  assignUser(username, password, email);
  alert("Sign-up successful!");
  window.location.href = "login.html";
});
