import { c as create_ssr_component, b as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.client.js";
import "firebase/auth";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-11b69yq{display:flex;align-items:center;justify-content:center}section.svelte-11b69yq{background:white}label.svelte-11b69yq{display:block;margin-bottom:0.5rem}input.svelte-11b69yq{width:100%}button.svelte-11b69yq{cursor:pointer}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  $$result.css.add(css);
  return `<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen svelte-11b69yq"><section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full svelte-11b69yq"><h1 class="text-3xl font-semibold mb-6" data-svelte-h="svelte-14ya3ae">Create Account</h1> <form> <div class="mb-4"><label for="username" class="block text-sm font-medium text-gray-600 svelte-11b69yq" data-svelte-h="svelte-120eoe7">Username</label> <input type="text" id="username" name="username" autocomplete="username" class="mt-1 p-2 w-full border rounded-md svelte-11b69yq" required${add_attribute("value", formData.username, 0)}></div>  <div class="mb-4"><label for="email" class="block text-sm font-medium text-gray-600 svelte-11b69yq" data-svelte-h="svelte-1fhj3rd">Email Address</label> <input type="email" id="email" name="email" autocomplete="email" class="mt-1 p-2 w-full border rounded-md svelte-11b69yq" required${add_attribute("value", formData.email, 0)}></div>  <div class="mb-4"><label for="password" class="block text-sm font-medium text-gray-600 svelte-11b69yq" data-svelte-h="svelte-n6fjjj">Password</label> <input type="password" id="password" name="password" autocomplete="new-password" class="mt-1 p-2 w-full border rounded-md svelte-11b69yq" required${add_attribute("value", formData.password, 0)}></div>  <div class="mb-6"><label for="confirmPassword" class="block text-sm font-medium text-gray-600 svelte-11b69yq" data-svelte-h="svelte-1hm8hkl">Confirm Password</label> <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password" class="mt-1 p-2 w-full border rounded-md svelte-11b69yq" required${add_attribute("value", formData.confirmPassword, 0)}></div> ${``} ${``} ${``}    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 svelte-11b69yq" data-svelte-h="svelte-1rdr44l">Create Account</button></form></section> </main>`;
});
export {
  Page as default
};
