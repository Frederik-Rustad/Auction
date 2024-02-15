const BASE_URL = 'https://v2.api.noroff.dev/';
const REGISTER_ENDPOINT = 'auth/register';

console.log('api/auth/register.js loaded');

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('registerForm').addEventListener('submit', function (event) {

    event.preventDefault();

    const userData = {
      name: document.getElementById('registerName').value,
      email: document.getElementById('registerEmail').value,
      password: document.getElementById('registerPassword').value,
      avatar: {
        url: document.getElementById('registerAvatar').value,
      },
    };

    console.log('User Data:', userData);

    fetch(BASE_URL + REGISTER_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('Unexpected status code: ' + response.status);
        }
      })
      .then(data => {
        alert('User registered successfully!');
        console.log('User profile:', data);
      })

      .catch(error => {
        
        console.log(error);
        alert(`Error registering user: ${error.message}`);
      });

  });
});