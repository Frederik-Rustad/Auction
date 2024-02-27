import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";
import { API_KEY } from "../auth/apikey.js";

console.log("update avatar loaded");

export async function updateAvatar() {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("editForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        const userData = {
          avatar: {
            url: document.getElementById("UpdateAvatar").value,
            alt: "user avatar image",
          },
        };

        const NAME = localStorage.getItem("userName");
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = API_KEY;

        fetch(BASE_URL + PROFILE_ENDPOINT + "/" + NAME, {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": apiKey,
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              return response
                .json()
                .then((data) =>
                  Promise.reject({ data, status: response.status }),
                );
            }
          })
          .then((data) => {
            const storedProfile = localStorage.getItem("profile");
            const profileData = storedProfile
              ? JSON.parse(storedProfile)
              : null;

            if (profileData) {
              profileData.data.avatar.url = userData.avatar.url;
              localStorage.setItem("profile", JSON.stringify(profileData));
            }

            alert("User Avatar updated successfully!");
            window.location.href = "../profile/index.html";
          })
          .catch((error) => {
            if (error.status === 400 && error.data && error.data.errors) {
              const errorMessages = error.data.errors
                .map((err) => err.message)
                .join("\n");
              alert(`Error Updating Avatar :\n${errorMessages}`);
            } else {
              console.error("Error Updating Avatar:", error);
              alert(`Error Updating Avatar: ${error}.`);
            }
          });
      });
  });
}
