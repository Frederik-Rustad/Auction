import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";
import { API_KEY } from "../auth/apikey.js";

export async function displayUserInfo() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = API_KEY;
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
      const profileUsername = document.getElementById("profileUsername");
      if (profileUsername) {
        profileUsername.textContent = data.data.name;
      }
      
      const profileAvatar = document.getElementById("userAvatar");
      if (profileAvatar) {
        profileAvatar.src = data.data.avatar.url;
        userAvatar.alt = `${data.data.name}'s Avatar`;
      }

      const activeAuctions = document.getElementById("activeAuctions");
      if (activeAuctions) {
        activeAuctions.innerText = `Active Auctions: ${data.data._count.listings}`;
      }
      const winsAuctions = document.getElementById("winsAuctions");
      if (activeAuctions) {
        winsAuctions.innerText = `Auctions Won: ${data.data._count.wins}`;
      }

      const userBio = document.getElementById("userBio");
      if (userBio) {
        userBio.innerText = data.data.bio;
      }
      if (data.data.bio === null || data.data.bio === "") {
        userBio.innerText = `Silent bidder, letting the items and bid's speak louder than words. also i didn't write a bio.`;
      }
    } else {
      alert(
        "Error fetching user profile:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    alert("Fetch error:", error.message);
  }
}
