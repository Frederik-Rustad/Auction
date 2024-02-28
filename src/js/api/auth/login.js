import { BASE_URL, LOGIN_ENDPOINT } from "../apibase.js";

export function login() {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const loginData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      };

      console.log("Login Data:", loginData);

      fetch(BASE_URL + LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {            
            return response.json().then(err => {             
              throw { statusCode: response.status, body: err };
            });
          }
        })
        .then(data => {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("userName", data.data.name);
          localStorage.setItem("profile", JSON.stringify(data));
          window.location.href = "listings/index.html";
        })
        .catch(error => {
          let errorMessage = "An unexpected error occurred. Please try again.";

          if (error.body && error.body.errors && error.body.errors.length > 0) {
            errorMessage = error.body.errors[0].message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          const loginErrorDiv = document.getElementById('loginError');
          if (loginErrorDiv) {
            loginErrorDiv.textContent = errorMessage;
          }
        });
    });
  });
}
