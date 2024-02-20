console.log('singleProfile.js is running');

export function userProfile() {
const storedProfile = localStorage.getItem('profile');
const profileData = storedProfile ? JSON.parse(storedProfile) : null;
console.log('Retrieved profile:', profileData);
};

userProfile();