import { logout } from '../auth/logout.js';
import { fetchApiKey } from '../auth/apikey.js';

fetchApiKey();

// const accessToken = localStorage.getItem('accessToken');
// // console.log('Access Token:', accessToken);
// const api_key = 'api_key';

// async function fetch_api_key() {
//   const response = await fetch(BASE_URL + API_KEY_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({}),
//   });

//   const data = await response.json();
//   console.log('API Key:', data);
//   localStorage.setItem(api_key, data.data.apiKey);
// }

// fetch_api_key();

logout();
