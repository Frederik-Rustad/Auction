import { BASE_URL, PROFILE_ENDPOINT } from "../apibase.js";

export async function fetchProfiles() {
  try {
    const accessToken = localStorage.getItem("accessToken");
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

      const response = await fetch(
        `${BASE_URL}${PROFILE_ENDPOINT}?page=${page}`,
        options,
      );

      if (response.ok) {
        const data = await response.json();

        if (!data.meta.isLastPage) {
          await fetchPage(page + 1);
        }
      } else {
        alert(
          "Error fetching profiles - Page",
          page,
          ":",
          response.status,
          response.statusText,
        );
      }
    }

    await fetchPage(currentPage);
  } catch (error) {
    alert("Fetch error:", error.message);
  }
}
