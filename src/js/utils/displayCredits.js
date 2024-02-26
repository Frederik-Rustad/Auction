import { BASE_URL, PROFILE_ENDPOINT } from "../api/apibase.js";


console.log("display credits loaded");

export async function displayCredits() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = "8013f1a8-b8b3-4410-a979-0307c32b7ddd";
    const userName = localStorage.getItem("userName");

    if (!userName) {   
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

      if (profileData && profileData.credits !== undefined) {
        const creditsElement = document.querySelector("#creditsProfilePage");
        if (creditsElement) {
          creditsElement.innerHTML = `Available Credits: ${profileData.credits}$`;
        }
      }
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
