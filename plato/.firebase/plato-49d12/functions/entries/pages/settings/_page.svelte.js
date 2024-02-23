import { c as create_ssr_component, a as compute_rest_props, e as spread, h as escape_attribute_value, f as escape_object, b as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { twMerge } from "tailwind-merge";
const DarkMode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["btnClass", "size", "ariaLabel"]);
  let { btnClass: btnClass2 = "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" } = $$props;
  let { size = "md" } = $$props;
  let { ariaLabel = "Dark mode" } = $$props;
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };
  if ($$props.btnClass === void 0 && $$bindings.btnClass && btnClass2 !== void 0)
    $$bindings.btnClass(btnClass2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `${$$result.head += `<!-- HEAD_svelte-1pa505f_START --><script data-svelte-h="svelte-mp99qu">if ('color-theme' in localStorage) {
      // explicit preference - overrides author's choice
      localStorage.getItem('color-theme') === 'dark' ? window.document.documentElement.classList.add('dark') : window.document.documentElement.classList.remove('dark');
    } else {
      // browser preference - does not overrides
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) window.document.documentElement.classList.add('dark');
    }<\/script><!-- HEAD_svelte-1pa505f_END -->`, ""} <button${spread(
    [
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { type: "button" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(btnClass2, $$props.class))
      }
    ],
    {}
  )}><span class="hidden dark:block">${slots.lightIcon ? slots.lightIcon({}) : ` <svg${add_attribute("class", sizes[size], 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1
  0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg> `}</span> <span class="block dark:hidden">${slots.darkIcon ? slots.darkIcon({}) : ` <svg${add_attribute("class", sizes[size], 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg> `}</span></button> `;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-ti9hnh{display:flex;align-items:center;justify-content:center}section.svelte-ti9hnh{background:white}",
  map: null
};
let btnClass = "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 w-screen svelte-ti9hnh"><section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full svelte-ti9hnh"><h1 class="text-3xl font-semibold mb-6" data-svelte-h="svelte-3wnkrg">Settings</h1>  <div class="flex items-center mb-4"><p class="flex-grow" data-svelte-h="svelte-1pgmzt9">Dark Mode</p> ${validate_component(DarkMode, "DarkMode").$$render($$result, { btnClass }, {}, {})}</div>  <div class="mb-6" data-svelte-h="svelte-10o6d1v"><h2 class="text-xl font-semibold mb-2">Notification Settings</h2> <div class="flex justify-between"><p>Receive Notifications</p> <span class="text-gray-500">On</span></div> <div class="flex justify-between"><p>Email Notifications</p> <span class="text-gray-500">On</span></div> </div>  <div class="mb-6" data-svelte-h="svelte-1qwmrg8"><h2 class="text-xl font-semibold mb-2">Privacy Settings</h2> <div class="flex justify-between"><p>Make Profile Public</p> <span class="text-gray-500">Off</span></div> <div class="flex justify-between"><p>Show Online Status</p> <span class="text-gray-500">On</span></div> </div>  <div data-svelte-h="svelte-flgmkt"><h2 class="text-xl font-semibold mb-2">Account Settings</h2> <div class="flex items-center justify-between"><p>Change Email</p> <a href="/settings/change-email" class="text-blue-500">Change</a> <p>Change Password</p> <a href="/settings/change-password" class="text-blue-500">Change</a></div> </div></section> </main>`;
});
export {
  Page as default
};
