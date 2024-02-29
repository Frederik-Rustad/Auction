import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";
import { API_KEY } from "../auth/apikey.js";

export function deleteListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("listingId");
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = API_KEY; 
  
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  fetch(`${BASE_URL}${LISTINGS_ENDPOINT}/${listingId}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the listing.');
      }
     
      if (response.status === 204) {
       
        return null;
      }
      return response.json();
    })
    .then(() => {
      window.location.href = "../listings/index.html";
    })
    .catch(error => {
      alert("Error:", error);
      
    });
}