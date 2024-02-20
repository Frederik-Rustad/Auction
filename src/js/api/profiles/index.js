import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";
import { logout } from '../auth/logout.js';
import { userProfileAvatar } from '../../utils/displayProfileAvatar.js';
import { displayCredits } from '../../utils/displayCredits.js';

console.log('Profile index.js loaded');
displayCredits()
userProfileAvatar();
logout();

export async function fetchProfiles() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem("api_key");
    let currentPage = 1;

    async function fetchPage(page) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(`${BASE_URL}${PROFILE_ENDPOINT}?page=${page}`, options);

      if (response.ok) {
        const data = await response.json();
        console.log("Profiles - Page", page, ":", data.data);

        if (!data.meta.isLastPage) {
          // If it's not the last page, fetch the next one
          await fetchPage(page + 1);
        }
      } else {
        console.error("Error fetching profiles - Page", page, ":", response.status, response.statusText);
      }
    }

    // Start fetching from the first page
    await fetchPage(currentPage);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

export async function fetchUserProfile() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem("api_key");
    const userName = localStorage.getItem('userName');

    if (!userName) {
      console.error('Username not available');
      return;
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(`${BASE_URL}${PROFILE_ENDPOINT}/${userName}`, options);

    if (response.ok) {
      const data = await response.json();
      console.log("User Profile:", data.data);
      const profileData = data.data;
    } else {
      console.error("Error fetching user profile:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
