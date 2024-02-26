import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";
import { API_KEY } from "../auth/apikey.js";

export async function fetchUserProfile() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = API_KEY;
    const userName = localStorage.getItem("userName");

    if (!userName) {
      console.error("Username not available");
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

    const response = await fetch(
      `${BASE_URL}${PROFILE_ENDPOINT}/${userName}`,
      options,
    );

    if (response.ok) {
      const data = await response.json();
      console.log("User Profile:", data.data);
      const profileData = data.data;
    } else {
      console.error(
        "Error fetching user profile:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
