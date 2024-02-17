console.log('post.js loaded');

export async function createListing() {
  const title = document.getElementById('listingTitle').value;
  const description = document.getElementById('listingDescription').value;
  const tags = document.getElementById('listingTags').value.split(',').map(tag => tag.trim());
  const mediaUrl = document.getElementById('listingMediaUrl').value;
  const mediaAlt = document.getElementById('listingMediaAlt').value;
  const endsAt = document.getElementById('listingEndsAt').value;

  const listingData = {
    title: title,
    description: description,
    tags: tags,
    media: [{ url: mediaUrl, alt: mediaAlt }],
    endsAt: endsAt
  };

  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem("api_key");
  const BASE_URL = 'https://v2.api.noroff.dev/';
  const LISTINGS_ENDPOINT = 'auction/listings';

  fetch(BASE_URL + LISTINGS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(listingData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Listing created successfully:', data);
  })
  .catch(error => {
    console.error('Error creating listing:', error.message);
  });
};
