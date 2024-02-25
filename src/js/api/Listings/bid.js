import { BASE_URL, LISTINGS_ENDPOINT, BIDS_ENDPOINT } from "../apibase.js";

export function bid() {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bidForm");

    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const bidAmountInput = document.getElementById("bidAmount");
      const bidAmount = bidAmountInput.value;

      if (bidAmount) {
        submitBid(bidAmount);
      } else {
        console.error("Bid amount is required");
      }
    });
  });

  function submitBid(amount) {
    const bidData = {
      amount: Number(amount),
    };

    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("api_key");
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("listingId");
    if (!listingId) {
      console.error("Listing ID is required");
      return;
    }
    const url = `${BASE_URL}${LISTINGS_ENDPOINT}/${listingId}${BIDS_ENDPOINT}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bidData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => Promise.reject(data));
        }
        return response.json();
      })
      .then((data) => {
        alert("Bid placed successfully", data);
        console.log("Bid placed successfully", data);
        location.reload();
      })
     .catch((error) => {
  if (error.errors && error.errors.length > 0) {
    const errorMessage = error.errors[0].message;
    console.error("Error placing bid:", errorMessage);
    alert(errorMessage);
  } else {
    console.error("Error placing bid:", error.message);
    alert(error.message);
  }
});
  }
}
