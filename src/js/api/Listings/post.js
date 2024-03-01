import { API_KEY } from "../auth/apikey.js";


export async function createListing() {
  const titleInput = document.getElementById("listingTitle");
  const descriptionInput = document.getElementById("listingDescription");

  const mediaUrl1Input = document.getElementById("mediaUrl1");
  const mediaUrl2Input = document.getElementById("mediaUrl2");
  const mediaUrl3Input = document.getElementById("mediaUrl3");

  const endsAtInput = document.getElementById("listingEndsAt");

  const title = titleInput.value;
  const description = descriptionInput.value;

  const mediaUrls = [
    { url: mediaUrl1Input.value.trim(), alt: "Auction main item image" },
    { url: mediaUrl2Input.value.trim(), alt: "Auction item image 2" },
    { url: mediaUrl3Input.value.trim(), alt: "Auction item image 3" }
  ];

  const endsAt = endsAtInput.value;

  const listingData = {
    title: title,
    description: description,
    media: mediaUrls,
    endsAt: endsAt,
  };

  const accessToken = localStorage.getItem("accessToken");
  const apiKey = API_KEY;
  const BASE_URL = "https://v2.api.noroff.dev/";
  const LISTINGS_ENDPOINT = "auction/listings";

  fetch(BASE_URL + LISTINGS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(listingData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();        
      } else {
        throw new Error(`Failed to create listing. Status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Listing created successfully:", data);
      titleInput.value = "";
      descriptionInput.value = "";
      mediaUrl1Input.value = "";
      mediaUrl2Input.value = "";
      mediaUrl3Input.value = "";
      endsAtInput.value = "";
      location.reload();
    })
    .catch(error => {
      let errorMessage = "Unexpected Error. Please fill out the required feilds and try again.";    
      
      const createListingErrorsDiv = document.getElementById('createListingErrors');
      if (createListingErrorsDiv) {
        createListingErrorsDiv.innerHTML = errorMessage;
      }
    });
}
