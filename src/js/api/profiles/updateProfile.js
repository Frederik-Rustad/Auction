import { BASE_URL, PROFILE_ENDPOINT } from '../apibase.js';
// updates the user avatar successfully, but need to logout and in again to see the changes.!!!???? fix later
// most likely not this code, but the code in the profile.js file

console.log('update avatar loaded');

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const userData = {
      avatar: {
        url: document.getElementById('UpdateAvatar').value,
        alt: 'user avatar image',
      },
    };

    const NAME = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem('api_key');

    fetch(BASE_URL + PROFILE_ENDPOINT + '/' + NAME, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json().then(data => Promise.reject({ data, status: response.status }));
        }
      })
      .then(data => {
        const storedProfile = localStorage.getItem('profile');
        const profileData = storedProfile ? JSON.parse(storedProfile) : null;

        if (profileData) {
          profileData.data.avatar.url = userData.avatar.url;
          localStorage.setItem('profile', JSON.stringify(profileData));
        }

        alert('User Avatar updated successfully!');
      })
      .catch(error => {
      
        if (error.status === 400 && error.data && error.data.errors) {
          const errorMessages = error.data.errors.map(err => err.message).join('\n');
          alert(`Error Updating Avatar :\n${errorMessages}`);
        } else {

          console.error('Error Updating Avatar:', error);
          alert(`Error Updating Avatar: ${error}.`);
        }
      });

  });
});

// move to own .js file later
function userProfileAvatar() {
  document.addEventListener('DOMContentLoaded', function () {
    const storedProfile = localStorage.getItem('profile');
    const profileData = storedProfile ? JSON.parse(storedProfile) : null;
    const accessToken = localStorage.getItem('accessToken');
  
    const profileImageElement = document.querySelector('.profile-image');
  
    if (profileImageElement) {
      if (accessToken && profileData) {
        profileImageElement.src = profileData.data.avatar.url;
        profileImageElement.alt = 'profile picture';
      } else {
        profileImageElement.src = '../assets/img/auction-default-profile.jpg';
        profileImageElement.alt = 'User not logged in, default profile picture';
      }
    }});
  };
  userProfileAvatar()
