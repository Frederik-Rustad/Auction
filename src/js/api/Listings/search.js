import { BASE_URL, SEARCH_LISTINGS_ENDPOINT } from "../apibase.js";

export function searchForListing() {
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        triggerSearch();
      }
    });

    searchButton.addEventListener("click", function () {
      triggerSearch();
    });

    function triggerSearch() {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        searchListings(query);
      } else {
        location.reload();
      }
    }

    function searchListings(query) {
      const searchUrl = `${BASE_URL}${SEARCH_LISTINGS_ENDPOINT}?q=${encodeURIComponent(query)}`;

      fetch(searchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response
              .json()
              .then((data) =>
                Promise.reject({ data, status: response.status }),
              );
          }
        })
        .then((data) => {
          console.log("Search Results:", data);
          updateListingsContainer(data.data);
        })
        .catch((error) => {
          console.error("Error searching listings:", error);
        });
    }

    function updateListingsContainer(listings) {
      const listingsContainer = document.getElementById(
        "listings-container-inner",
      );
      if (listingsContainer) {
        listingsContainer.innerHTML = "";

        listings.forEach((listing) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.style.width = "18rem";

          const img = document.createElement("img");
          img.src = listing.media[0].url;
          img.classList.add("card-img-top", "card-img", "mt-2");
          img.alt = "Auction Item Image";

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const title = document.createElement("h5");
          title.classList.add("card-title", "fw-bold");
          title.textContent = listing.title;

          const description = document.createElement("p");
          description.classList.add("card-text");
          description.textContent = listing.description;

          const endDate = document.createElement("p");
          endDate.textContent = `Auction end date: ${new Date(listing.endsAt).toLocaleDateString()}`;

          const viewBidButton = document.createElement("a");
          const singleListingUrl = "../../Auction/index.html";
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
        });
      }
    }
  });
}
