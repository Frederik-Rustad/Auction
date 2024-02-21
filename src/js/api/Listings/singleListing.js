import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";
import { displayCredits } from "../../utils/displayCredits.js";
import { userProfileAvatar } from "../../utils/displayProfileAvatar.js";
import { logout } from "../auth/logout.js";

displayCredits();
userProfileAvatar();
logout();

export async function fetchSingleListings() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('listingId');
    console.log('Listing ID:', listingId);

    if (!listingId) {
      console.error('Listing ID not found in the query parameter');
      return;
    }

    const apiKey = localStorage.getItem("api_key");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
    };

    const response = await fetch(`${BASE_URL}${LISTINGS_ENDPOINT}/${listingId}?_seller=true&_bids=true`, options);

    if (response.ok) {
      const data = await response.json();
      console.log('Single Listing:', data.data);

     
      const auctionTitleElement = document.getElementById('auctionTitle');
      if (auctionTitleElement) {
        auctionTitleElement.textContent = data.data.title; 
      }
      const auctionItemInfoElement = document.getElementById('auctionItemInfo');
      if (auctionItemInfoElement) {     
       
        const image = data.data.media[0].url;
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('rounded-4', 'auction-item', 'mt-4', 'img-fluid');
        img.alt = 'Auction Item Image';
        auctionItemInfoElement.appendChild(img);

        const seller = data.data.seller.name;
        const sellerElement = document.createElement('h3');
        sellerElement.classList.add('mt-2', 'fw-bold', 'text-black');
        auctionItemInfoElement.appendChild(sellerElement);

        if (sellerElement) {
          sellerElement.textContent = `Seller: ${seller}`;
        }

        const description = data.data.description;
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('mt-4');
        auctionItemInfoElement.appendChild(paragraphElement);

        if (paragraphElement) {
          paragraphElement.textContent = description;
        }
      }


    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

fetchSingleListings();
