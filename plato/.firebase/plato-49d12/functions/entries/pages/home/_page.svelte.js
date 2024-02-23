import { c as create_ssr_component, k as subscribe, j as escape, v as validate_component } from "../../../chunks/ssr.js";
import { H as Home } from "../../../chunks/Home.js";
import "../../../chunks/firebase.client.js";
import { a as authStore } from "../../../chunks/authStore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  let email;
  authStore.subscribe((curr) => {
    console.log("CURR", curr);
    email = curr?.currentUser?.email;
  });
  $$unsubscribe_authStore();
  return `${$authStore.currentUser ? `<div><h1>CURRENT USER: ${escape(email)}</h1></div>` : `<div data-svelte-h="svelte-194gxkm">Loading...</div>`} ${validate_component(Home, "Home").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
