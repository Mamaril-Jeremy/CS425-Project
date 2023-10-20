import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` ${validate_component(Button, "Button").$$render($$result, { color: "dark", href: "/home" }, {}, {
    default: () => {
      return `Mariooo HeHe`;
    }
  })}`;
});
export {
  Page as default
};
