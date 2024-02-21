import { BASE_URL, REGISTER_ENDPOINT } from '../apibase.js';

export function register() {
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
            return response.json().then(data => Promise.reject({ data, status: response.status }));
          }
        })
        .then(data => {
          alert('User registered successfully!');
          console.log('User profile:', data);
        })
        .catch(error => {
          if (error.status === 400 && error.data && error.data.errors) {
            const errorMessages = error.data.errors.map(err => err.message).join('\n');
            alert(`Error registering user:\n${errorMessages}`);
          } else {
            console.error('Error registering user:', error);
            alert(`Error registering user: ${error}.`);
          }
        });
    });
  });
}
