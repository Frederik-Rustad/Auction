import { BASE_URL, LISTINGS_ENDPOINT, BIDS_ENDPOINT } from "../apibase.js";
import { API_KEY } from "../auth/apikey.js";

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
    const apiKey = API_KEY;
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
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (error.errors && error.errors.length > 0) {
          errorMessage = error.errors[0].message;
          const bidError = document.getElementById("bidError");
          if (bidError) {
            bidError.textContent = errorMessage;
          }
        } else {
          console.error("Error placing bid:", error.message);
          alert(error.message);
        }
      });
  }
}
