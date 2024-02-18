console.log('post.js loaded');

export async function createListing() {
  const titleInput = document.getElementById('listingTitle');
  const descriptionInput = document.getElementById('listingDescription');
  const tagsInput = document.getElementById('listingTags');
  const mediaUrlInput = document.getElementById('listingMediaUrl');
  const mediaAltInput = document.getElementById('listingMediaAlt');
  const endsAtInput = document.getElementById('listingEndsAt');

  const title = titleInput.value;
  const description = descriptionInput.value;
  const tags = tagsInput.value.split(',').map(tag => tag.trim());
  const mediaUrl = mediaUrlInput.value;
  const mediaAlt = mediaAltInput.value;
  const endsAt = endsAtInput.value;

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
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to create listing. Status: ${response.status}`);
    }
  })
  .then(data => {
    console.log('Listing created successfully:', data);    
    titleInput.value = '';
    descriptionInput.value = '';
    tagsInput.value = '';
    mediaUrlInput.value = '';
    mediaAltInput.value = '';
    endsAtInput.value = '';
  })
  .catch(error => {
    console.error('Error creating listing:', error.message);
  });
};
