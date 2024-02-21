import { BASE_URL, LOGIN_ENDPOINT } from '../apibase.js';
import { logout } from './logout.js';


export function login() {
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
     
    const loginData = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    };

    console.log('Login Data:', loginData);

    fetch(BASE_URL + LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Unexpected status code: ' + response.status);
        }
      })
      .then(data => {       
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('userName', data.data.name);
        localStorage.setItem('profile', JSON.stringify(data));
        alert(`Login successful! Welcome, ${data.data.name}`);
        console.log('User profile:', data);
        window.location.href = 'listings/index.html';
      })
      .catch(error => {
        alert(`Login failed. Please check your credentials and try again.${error.message}`);
      });
  });
});
}
