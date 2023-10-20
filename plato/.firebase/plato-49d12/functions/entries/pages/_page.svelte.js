import { c as create_ssr_component, f as add_attribute } from "../../chunks/ssr.js";
import { L as Logo } from "../../chunks/plato_logo.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-bxfw4h_START -->${$$result.title = `<title>Plato</title>`, ""}<link rel="icon" type="image/svg+xml"${add_attribute("href", Logo, 0)}><!-- HEAD_svelte-bxfw4h_END -->`, ""}`;
});
export {
  Page as default
};
