import { logout } from '../auth/logout.js';
import { fetchApiKey } from '../auth/apikey.js';
import { fetchListings } from './listings.js';  

fetchApiKey();

fetchListings();

logout();
