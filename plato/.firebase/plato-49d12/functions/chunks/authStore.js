import { w as writable } from "./index.js";
import "./firebase.client.js";
import "firebase/auth";
const authStore = writable({
  isLoading: true,
  currentUser: null,
  loggedIn: false
});
export {
  authStore as a
};
