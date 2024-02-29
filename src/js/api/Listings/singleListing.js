import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";
import { displayCredits } from "../../utils/displayCredits.js";
import { userProfileAvatar } from "../../utils/displayProfileAvatar.js";
import { logout, manageLoginButton } from "../auth/logout.js";
import { API_KEY } from "../auth/apikey.js";
import { bid } from "./bid.js";

bid();
displayCredits();
userProfileAvatar();
logout();

export async function fetchSingleListings() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("listingId");   
   
    if (!listingId) {     
      return;
    }

    const apiKey = API_KEY;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
    };

    const response = await fetch(
      `${BASE_URL}${LISTINGS_ENDPOINT}/${listingId}?_seller=true&_bids=true`,
      options,
    );

    if (response.ok) {
      const data = await response.json();

      const auctionTitleElement = document.getElementById("auctionTitle");
      const auctionItemInfoElement = document.getElementById("auctionItemInfo");
      const auctionEndsAtElement = document.getElementById("auctionEndsAt");
      const auctionBidsElement = document.getElementById(
        "auctionBidsContainer",
      );
      const bidDenier = localStorage.getItem("accessToken");

      if (bidDenier === null) {
        const bidButton = document.getElementById("placeBid");
        bidButton.disabled = true;

        if (auctionBidsElement) {
          auctionBidsElement.innerHTML = `<h3 class="text-white text-stroke bg-card rounded-top" >Bids</h3>
          <p class="text-black fw-bold">Login to view bids</p>`;
        }
      } else {
        if (auctionBidsElement) {
          auctionBidsElement.innerHTML =
            '<h3 class="text-white text-stroke bg-card rounded-top" >Bids</h3>';

          if (data.data.bids && data.data.bids.length > 0) {
            data.data.bids.forEach((bid) => {
              const bidElement = document.createElement("p");
              bidElement.textContent = `${bid.bidder.name} bid: ${bid.amount} Credits`;
              auctionBidsElement.appendChild(bidElement);
            });
          } else {
            const noBidsMessage = document.createElement("p");
            noBidsMessage.textContent = "No bids have been placed yet.";
            auctionBidsElement.appendChild(noBidsMessage);
          }
        }
      }     

      if (auctionEndsAtElement) {
        const endsAtDate = new Date(data.data.endsAt);
        const currentDate = new Date();

        if (endsAtDate < currentDate) {
          if (auctionTitleElement) {
            auctionTitleElement.textContent = "Auction Closed";
            const bidButton = document.getElementById("placeBid");
            bidButton.disabled = true;
          }

          if (auctionItemInfoElement) {
            auctionItemInfoElement.innerHTML = "";

            const img = document.createElement("img");
            img.src = "../assets/img/sold_auction.png";
            img.classList.add("rounded-4", "auction-item", "mt-4", "img-fluid");
            img.alt = "Auction Item Image";
            auctionItemInfoElement.appendChild(img);

            const endedAuctionInfo = document.createElement("p");
            endedAuctionInfo.textContent =
              "This auction has ended. Thank you for participating!";
            auctionItemInfoElement.appendChild(endedAuctionInfo);
          }

          if (auctionEndsAtElement) {
            auctionEndsAtElement.textContent = "Bidding has ended";
          }
        } else {
          if (auctionTitleElement) {
            auctionTitleElement.textContent = data.data.title;
          }

          if (auctionItemInfoElement) {
            const mediaArray = data.data.media;

            if (auctionItemInfoElement && mediaArray && mediaArray.length > 0) {
              mediaArray.forEach((media, index) => {
                const img = document.createElement("img");
                img.src = media.url;
                img.classList.add("rounded-4", "auction-item", "mt-4", "img-fluid");
                img.alt = `${data.data.title} - Image ${index + 1}`;
                auctionItemInfoElement.appendChild(img);
              });
            }

            const seller = data.data.seller.name;
            const sellerElement = document.createElement("h3");
            sellerElement.classList.add("mt-2", "fw-bold", "text-black");
            sellerElement.textContent = `Seller: ${seller}`;
            auctionItemInfoElement.appendChild(sellerElement);

            const description = data.data.description;
            const paragraphElement = document.createElement("p");
            paragraphElement.classList.add("mt-4");
            paragraphElement.textContent = description;
            auctionItemInfoElement.appendChild(paragraphElement);
          }

          if (auctionEndsAtElement) {
            const endsAtText = document.createElement("span");
            endsAtText.textContent = `Bidding closes on: ${endsAtDate.toLocaleDateString()} , ${endsAtDate.toLocaleTimeString()}`;
            auctionEndsAtElement.appendChild(endsAtText);
          }
        }
      }
    } else {
      alert("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alert("Fetch error:", error.message);
  }
}

fetchSingleListings();

document.addEventListener("DOMContentLoaded", function () {
  manageLoginButton();
});
