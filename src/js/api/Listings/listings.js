import { BASE_URL, LISTINGS_ENDPOINT } from "../apibase.js";

export async function fetchListings() {
  try {
    const apiKey = localStorage.getItem("api_key");
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

      const listingsContainer = document.getElementById('listings-container-inner');

      console.log(data);

      listingsContainer.innerHTML = '';

      data.data.forEach(listing => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.src = listing.media[0].url;
        img.classList.add('card-img-top', 'card-img', 'mt-2');
        img.alt = 'Auction Item Image';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title', 'fw-bold');
        title.textContent = listing.title;        

        const endDate = document.createElement('p');
        endDate.textContent = `Auction end date: ${new Date(listing.endsAt).toLocaleDateString()}`;

        const viewBidButton = document.createElement('a');
        const singleListingUrl = '../../Auction/index.html';
        const linkWithQueryParameter = `${singleListingUrl}?listingId=${listing.id}`;
        viewBidButton.href = linkWithQueryParameter;
        viewBidButton.classList.add('btn', 'btn-primary', 'btn-auction', 'text-white', 'fw-bold', 'text-stroke');
        viewBidButton.textContent = 'View & Bid';
        viewBidButton.dataset.listingId = listing.id;

        cardBody.appendChild(title);
        
        cardBody.appendChild(endDate);
        cardBody.appendChild(viewBidButton);
        card.appendChild(img);
        card.appendChild(cardBody);

        listingsContainer.appendChild(card);

        const endAuctionDate = new Date(listing.endsAt);
        const currentDate = new Date();
     
        if (endAuctionDate < currentDate) {
          viewBidButton.textContent = 'Auction Closed';           
          endDate.textContent = `Auction ended at: ${new Date(listing.endsAt).toLocaleDateString()}`;      

        }
        
        
      });
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}
