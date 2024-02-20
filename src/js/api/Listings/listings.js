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

      const listingsContainer = document.getElementById('listings-container-inner');

      console.log(data);
      
      listingsContainer.innerHTML = '';

            data.data.forEach(listing => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.src = listing.media[0].url;
        img.classList.add('card-img-top', 'card-img','mt-2');
        img.alt = 'Auction Item Image';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title', 'fw-bold');
        title.textContent = listing.title;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = listing.description;

        const endDate = document.createElement('p');
        endDate.textContent = `Auction end date: ${new Date(listing.endsAt).toLocaleDateString()}`;

        const viewBidButton = document.createElement('a');
        viewBidButton.href = '../Auction/index.html';  // Add actual link with queryparameters later !!!!!!!!!!!!!!!!!!!
        viewBidButton.classList.add('btn', 'btn-primary', 'btn-auction', 'text-white', 'fw-bold', 'text-stroke');
        viewBidButton.textContent = 'View & Bid';

      
        cardBody.appendChild(title);       
        cardBody.appendChild(endDate);
        cardBody.appendChild(viewBidButton);
        card.appendChild(img);
        card.appendChild(cardBody);

        listingsContainer.appendChild(card);
      });
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  }
  catch (error) {
    console.error("Fetch error:", error.message);
  }
}
