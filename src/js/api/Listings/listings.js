import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";
import { API_KEY } from "../auth/apikey.js";
import { hideCreatePost } from "../../utils/hideCreatePost.js";

export async function fetchListings(filterType = 'newest', showClosedAuctions = true) {
  try {
    const apiKey = API_KEY;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
    };
    const response = await fetch(BASE_URL + LISTINGS_ENDPOINT, options);
    if (response.ok) {
      const data = await response.json();

      switch (filterType) {
        case 'newest':
          data.data.sort((a, b) => new Date(b.created) - new Date(a.created));
          break;
        case 'endingSoon':
          data.data.sort((a, b) => new Date(a.created) - new Date(b.created));
          break;
        case 'mostBids':
          data.data.sort((a, b) => b._count.bids - a._count.bids);
          break;
        case 'leastBids':
          data.data.sort((a, b) => a._count.bids - b._count.bids);
          break;
      }

      const listingsContainer = document.getElementById(
        "listings-container-inner",
      );

      listingsContainer.innerHTML = "";

      data.data.forEach((listing) => {
        console.log(listing);
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        const img = document.createElement("img");
        img.classList.add("card-img-top", "card-img", "mt-2");
        img.alt = listing.title;
        
        if (listing.media && listing.media.length > 0 && listing.media[0].url) {
          img.src = listing.media[0].url;
        } else {
          img.src = "../assets/img/no_listing_image.PNG";
        }

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title", "fw-bold");
        title.textContent = listing.title;

        const endDate = document.createElement("p");
        endDate.textContent = `Auction end date: ${new Date(listing.endsAt).toLocaleDateString()}`;

        const viewBidButton = document.createElement("a");
        const singleListingUrl = "../Auction/index.html";
        const linkWithQueryParameter = `${singleListingUrl}?listingId=${listing.id}`;
        viewBidButton.href = linkWithQueryParameter;
        viewBidButton.classList.add(
          "btn",
          "btn-primary",
          "btn-auction",
          "text-white",
          "fw-bold",
          "text-stroke",
        );
        viewBidButton.textContent = "View & Bid";
        viewBidButton.dataset.listingId = listing.id;

        cardBody.appendChild(title);
        cardBody.appendChild(endDate);
        cardBody.appendChild(viewBidButton);
        card.appendChild(img);
        card.appendChild(cardBody);

        listingsContainer.appendChild(card);

        const endAuctionDate = new Date(listing.endsAt);
        const currentDate = new Date();

        if (endAuctionDate < currentDate && !showClosedAuctions) {
          card.classList.add("d-none");
          return;
        }

        if (endAuctionDate < currentDate) {
          viewBidButton.textContent = "Auction Closed";
          endDate.textContent = `Auction ended at: ${new Date(listing.endsAt).toLocaleDateString()}`;
        }
      });
    } else {
      alert("Error:", response.status, response.statusText);
    }
  } catch (error) {
    alert("Fetch error:", error.message);  
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const filterSelect = document.getElementById('auctionFilter');
  const showClosedCheckbox = document.getElementById('showClosedAuctions');

  filterSelect.addEventListener('change', () => {
    const selectedFilter = filterSelect.value;
    const showClosedAuctions = showClosedCheckbox.checked;

    fetchListings(selectedFilter, showClosedAuctions);
  });

  showClosedCheckbox.addEventListener('change', () => {
    const selectedFilter = filterSelect.value;
    const showClosedAuctions = showClosedCheckbox.checked;

    fetchListings(selectedFilter, showClosedAuctions);
  });

  fetchListings();
});

hideCreatePost();
