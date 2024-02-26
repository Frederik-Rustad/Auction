import { BASE_URL, API_KEY_ENDPOINT } from "../apibase.js";

export const API_KEY = "8013f1a8-b8b3-4410-a979-0307c32b7ddd"

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
      console.log("API Key:", data);
      localStorage.setItem(api_key, data.data.key);
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
