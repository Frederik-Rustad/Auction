import { logout } from '../auth/logout.js';
import { fetchApiKey } from '../auth/apikey.js';
import { fetchListings } from './listings.js';  
import { fetchProfiles, fetchUserProfile } from "../profiles/index.js";
import { createListing } from './post.js'; 
import { userProfileAvatar } from '../../utils/displayProfileAvatar.js';

fetchApiKey();
fetchListings();
fetchProfiles();
fetchUserProfile();
userProfileAvatar();
logout();

document.getElementById('createListingBtn').addEventListener('click', function () {
  createListing();
});
