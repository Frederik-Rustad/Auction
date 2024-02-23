import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";
import { displayCredits } from "../../utils/displayCredits.js";
import { userProfileAvatar } from "../../utils/displayProfileAvatar.js";
import { logout } from "../auth/logout.js";
import { bid } from "./bid.js";

bid();
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
      const auctionItemInfoElement = document.getElementById('auctionItemInfo');
      const auctionEndsAtElement = document.getElementById('auctionEndsAt');
      const auctionBidsElement = document.getElementById('auctionBidsContainer');

      if (auctionBidsElement) {
        const bid = document.createElement('p');
        bid.textContent = `${data.data.bids[0].bidder.name} bid: ${data.data.bids[0].amount} Credits`;
        auctionBidsElement.appendChild(bid);
      
      }

      if (auctionEndsAtElement) {const endsAtDate = new Date(data.data.endsAt);
        const currentDate = new Date();
        
        if (endsAtDate < currentDate) {

          if (auctionTitleElement) {
            auctionTitleElement.textContent = "Auction Closed";
            const bidButton = document.getElementById('placeBid');
            bidButton.disabled = true;
          }
        
          if (auctionItemInfoElement) {
            auctionItemInfoElement.innerHTML = '';
        
            const img = document.createElement('img');
            img.src = "../../../assets/img/sold_auction.png";
            img.classList.add('rounded-4', 'auction-item', 'mt-4', 'img-fluid');
            img.alt = 'Auction Item Image';
            auctionItemInfoElement.appendChild(img);

            const endedAuctionInfo = document.createElement('p');
            endedAuctionInfo.textContent = "This auction has ended. Thank you for participating!";
            auctionItemInfoElement.appendChild(endedAuctionInfo);
          }
        
          if (auctionEndsAtElement) {
            auctionEndsAtElement.textContent = 'Bidding has ended';
          }
        } else {
          if (auctionTitleElement) {
            auctionTitleElement.textContent = data.data.title;
          }
        
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
            sellerElement.textContent = `Seller: ${seller}`;
            auctionItemInfoElement.appendChild(sellerElement);
        
            const description = data.data.description;
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add('mt-4');
            paragraphElement.textContent = description;
            auctionItemInfoElement.appendChild(paragraphElement);
          }
        
          if (auctionEndsAtElement) {
            const endsAtText = document.createElement('span');
            endsAtText.textContent = `Bidding closes on: ${endsAtDate.toLocaleDateString()} , ${endsAtDate.toLocaleTimeString()}`;
            auctionEndsAtElement.appendChild(endsAtText);
          }
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
