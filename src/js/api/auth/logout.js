export function logout() {
  const accessToken = localStorage.getItem("accessToken");  
  if (accessToken) {
    document.getElementById("logout-btn").classList.remove("d-none");
  }

  document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile");
    this.classList.add("d-none");
    window.location.href = "../index.html";
  });
}

export function manageLoginButton() {
  const accessToken = localStorage.getItem("accessToken");
  const loginButton = document.getElementById("login-btn");
  const profile = document.getElementsByClassName("profile-circle");

  if (!accessToken) {
    loginButton.classList.remove("d-none");
    profile[0].classList.add("d-none");
  } else if (loginButton) {
    loginButton.classList.add("d-none");
  }

    if (!accessToken && loginButton) {
    loginButton.addEventListener("click", function () {      
      window.location.href = "../index.html";
    });
  }
}

