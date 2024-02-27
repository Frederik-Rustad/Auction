import { register } from "../auth/register.js";
import { login } from "../auth/login.js";
import { logout } from "../auth/logout.js";

console.log("Homepage js loaded!");

login();
register();
logout();
