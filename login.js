
  
  document.getElementById("loginForm").addEventListener("submit",Login);
  
  
  function Login(event){
    event.preventDefault();
  
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
  
     users = JSON.parse(localStorage.getItem("users")) || [];  
    let user = users.find((user) => user.email === email && user.password === password);  
    if (user) {
      window.location.href = "loading.html";
    }  else {
      alert("Invalid email or password.");
    }
  }