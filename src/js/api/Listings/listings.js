import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";


export async function fetchListings() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem("api_key");    
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(BASE_URL + LISTINGS_ENDPOINT, options);
    if (response.ok) {
      const data = await response.json();
      console.log("Listings:", data);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  }
  catch (error) {
    console.error("Fetch error:", error.message);
  }
}

