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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
        if (error.response) {
          console.error('Error registering user:', error.response.status);

          if (error.response.data && error.response.data.errors) {
            error.response.data.errors.forEach(errorObject => {
              const errorMessage = errorObject.message;
              alert(`Error registering user: ${errorMessage}`);
            });
          } else if (error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            alert(`Error registering user: ${errorMessage}`);
          } else {
            alert('Error registering user: Unknown error');
          }
        } else if (error.request) {
          console.error('No response received from the server');
          alert('No response received from the server');
        } else {
          // get the correct error message from the error object later
          console.error('Error setting up the request:', error.message);
          alert(`Something went wrong...  ${error.message}`);
        }
      });
  });
});




