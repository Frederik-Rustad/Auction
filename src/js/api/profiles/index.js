import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";
import { logout } from '../auth/logout.js';
import { userProfileAvatar } from '../../utils/displayProfileAvatar.js';
import { displayCredits } from '../../utils/displayCredits.js';
import { displayUserInfo } from './singleProfile.js';
import { updateAvatar } from './updateProfile.js';
import { fetchUserProfile } from './fetchProfile.js';

console.log('Profile index.js loaded');

fetchUserProfile();
updateAvatar();
displayUserInfo();
displayCredits()
userProfileAvatar();
logout();




