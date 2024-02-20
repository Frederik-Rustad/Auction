import { logout } from '../auth/logout.js';
import { fetchApiKey } from '../auth/apikey.js';
import { fetchListings } from './listings.js';  
import { fetchProfiles } from "../profiles/index.js";
import { createListing } from './post.js';

fetchApiKey();
fetchListings();
fetchProfiles();
logout();

document.getElementById('createListingBtn').addEventListener('click', function () {
  createListing();
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