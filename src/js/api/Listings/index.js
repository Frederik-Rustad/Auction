import { logout } from "../auth/logout.js";
import { fetchApiKey } from "../auth/apikey.js";
import { fetchListings } from "./listings.js";
import { fetchProfiles } from "../profiles/fetchAllProfiles.js";
import { createListing } from "./post.js";
import { userProfileAvatar } from "../../utils/displayProfileAvatar.js";
import { searchForListing } from "./search.js";

searchForListing();
fetchApiKey();
fetchListings();
fetchProfiles();
userProfileAvatar();
logout();

document
  .getElementById("createListingBtn")
  .addEventListener("click", function () {
    createListing();
  });
