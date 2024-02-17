import { logout } from '../auth/logout.js';
import { fetchApiKey } from '../auth/apikey.js';
import { fetchListings } from './listings.js';  
import { fetchProfiles } from "../profiles/index.js";
import { createListing } from './post.js';

fetchApiKey();

fetchListings();
fetchProfiles();

logout();

createListing();