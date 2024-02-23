import { register } from "../auth/register.js";
import { login } from "../auth/login.js";
import { logout } from "../auth/logout.js";
import { userProfileAvatar } from "../../utils/displayProfileAvatar.js";

console.log("Homepage js loaded!");

userProfileAvatar();
login();
register();
logout();
