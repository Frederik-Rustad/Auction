console.log("api/index.js loaded");

const registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  registerUser();
});

function registerUser() {
  console.log("registerd User");
}
