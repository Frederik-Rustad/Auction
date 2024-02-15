const BASE_URL = 'https://v2.api.noroff.dev/';
const LOGIN_ENDPOINT = 'auth/login';

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
        // Save the accessToken in local storage
        localStorage.setItem('accessToken', data.data.accessToken);

        alert('Login successful!');
        console.log('User profile:', data);
        window.location.href = 'listings/index.html';
      })
      .catch(error => {
        // Handle error
        console.error('Error during login:', error.message);
        alert('Login failed. Please check your credentials and try again.');
      });
  });
});

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {  
  document.getElementById('logout-btn').classList.remove('d-none');
} else {
  document.getElementById('login-btn').classList.add('d-none');
}

document.getElementById('logout-btn').addEventListener('click', function () { 
  localStorage.removeItem('accessToken'); 
  this.classList.add('d-none');   
  window.location.href = '../index.html';
});
