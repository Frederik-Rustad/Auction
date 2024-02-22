import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";

console.log('singleProfile.js is running');

export async function displayUserInfo() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem('api_key');
    const userName = localStorage.getItem('userName');

    if (!userName) {
      console.error('Username not available');
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(`${BASE_URL}${PROFILE_ENDPOINT}/${userName}`, options);

    if (response.ok) {
      const data = await response.json();
      console.log('Single User Profile:', data.data);
      const profileUsername =document.getElementById('profileUsername');
      if (profileUsername) {
        profileUsername.textContent = data.data.name;
      }
     console.log('avatar url', data.data.avatar.url);
      const profileAvatar = document.getElementById('userAvatar');
      if (profileAvatar) {
        profileAvatar.src = data.data.avatar.url;
        userAvatar.alt = `${data.data.name}'s Avatar`;
      }

      const userBio = document.getElementById('userBio');
      if (userBio) {
        userBio.innerText = data.data.bio;
      }
      
    } else {
      console.error('Error fetching user profile:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
};
