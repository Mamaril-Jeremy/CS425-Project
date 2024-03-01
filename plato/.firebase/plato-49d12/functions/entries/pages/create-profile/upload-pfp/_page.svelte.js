import { c as create_ssr_component, j as escape, n as null_to_empty } from "../../../../chunks/ssr.js";
import "firebase/storage";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1j1vhpt{display:flex;justify-content:center;align-items:center;min-height:100vh;line-height:2.5}.center.svelte-1j1vhpt{text-align:center}label.svelte-1j1vhpt{display:block;margin-bottom:1rem}input.svelte-1j1vhpt{margin-bottom:1rem}button.svelte-1j1vhpt{background-color:#007bff;color:white;padding:0.5rem 1rem;border:none;cursor:pointer}.continue.svelte-1j1vhpt{background-color:#007bff;color:#ffffff}.no-continue.svelte-1j1vhpt{background-color:#ffffff;color:#007bff}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="svelte-1j1vhpt"><div class="center svelte-1j1vhpt"><h1 data-svelte-h="svelte-kx99dm">Upload A Professional Image</h1> <label for="upload" class="svelte-1j1vhpt" data-svelte-h="svelte-1kj988">Upload Image (png, jpg, jpeg, pdf):</label> <input type="file" id="upload" accept=".png, .jpg, .jpeg, .pdf" class="svelte-1j1vhpt"> <button class="${escape(null_to_empty("no-continue"), true) + " svelte-1j1vhpt"}">Continue</button></div></main>  `;
});
export {
  Page as default
};
