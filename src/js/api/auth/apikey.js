import { BASE_URL, API_KEY_ENDPOINT } from "../apibase.js";

export const API_KEY = "f6c82c5b-de54-4cf6-85b1-4511a2e4bd13"

export async function fetchApiKey() {
  try {
   
    const api_key = "api_key";
   

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };

    const response = await fetch(BASE_URL + API_KEY_ENDPOINT, options);

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem(api_key, data.data.key);
    } else {
      alert("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alert("Fetch error:", error.message);
  }
}
