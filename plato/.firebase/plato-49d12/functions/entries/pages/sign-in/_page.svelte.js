import { c as create_ssr_component, a as compute_rest_props, v as validate_component, b as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.client.js";
import "firebase/auth";
import { B as Button } from "../../../chunks/Button.js";
import { twMerge } from "tailwind-merge";
import { F as Frame } from "../../../chunks/Frame.js";
import { L as Label, I as Input } from "../../../chunks/Input.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerPadding;
  let $$restProps = compute_rest_props($$props, ["href", "horizontal", "reverse", "img", "padding", "size"]);
  let { href = void 0 } = $$props;
  let { horizontal = false } = $$props;
  let { reverse = false } = $$props;
  let { img = void 0 } = $$props;
  let { padding = "lg" } = $$props;
  let { size = "sm" } = $$props;
  const paddings = {
    none: "p-0",
    sm: "p-4 sm:p-6 md:p-8",
    md: "p-4 sm:p-5",
    lg: "p-4 sm:p-6",
    xl: "p-4 sm:p-8"
  };
  const sizes = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-screen-xl"
  };
  let cardClass;
  let imgClass;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
    $$bindings.horizontal(horizontal);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  innerPadding = paddings[padding];
  cardClass = twMerge(
    "flex",
    sizes[size],
    reverse ? "flex-col-reverse" : "flex-col",
    horizontal && (reverse ? "md:flex-row-reverse md:max-w-xl" : "md:flex-row md:max-w-xl"),
    href && "hover:bg-gray-100 dark:hover:bg-gray-700",
    !img && innerPadding,
    $$props.class
  );
  imgClass = twMerge(reverse ? "rounded-b-lg" : "rounded-t-lg", horizontal && "object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none", horizontal && (reverse ? "md:rounded-r-lg" : "md:rounded-l-lg"));
  return `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { tag: href ? "a" : "div" }, { rounded: true }, { shadow: true }, { border: true }, { href }, $$restProps, { class: cardClass }), {}, {
    default: () => {
      return `${img ? `<img${add_attribute("class", imgClass, 0)}${add_attribute("src", img, 0)} alt=""> <div${add_attribute("class", innerPadding, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
    }
  })} `;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".body-background.svelte-1biozp0{background-image:url('../../lib/assets/backgroundlogin2.png');background-size:cover;background-repeat:no-repeat}p.svelte-1biozp0{display:inline;margin-left:10px}a.svelte-1biozp0{margin-left:45px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="body-background h-screen w-screen flex items-center justify-center svelte-1biozp0"><div class="card-container">${validate_component(Card, "Card").$$render($$result, { class: "w-80 max-w-none" }, {}, {
      default: () => {
        return `<form class="flex flex-col space-y-6"><h3 class="text-xl font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-p3ijhb">Sign in to Plato</h3> ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
          default: () => {
            return `<span data-svelte-h="svelte-1bg9cgq">Email</span> ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "email",
                placeholder: "name@company.com",
                required: true,
                value: email
              },
              {
                value: ($$value) => {
                  email = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Label, "Label").$$render($$result, { class: "space-y-2" }, {}, {
          default: () => {
            return `<span data-svelte-h="svelte-1nyqqaq">Your password</span> ${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "password",
                placeholder: "••••••••••••",
                required: true,
                value: password
              },
              {
                value: ($$value) => {
                  password = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${``} <div class="flex items-start" data-svelte-h="svelte-lcvrzt"><div><input type="checkbox" id="demoCheckbox" name="checkbox" value="1"> <p class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500 svelte-1biozp0">Remember me</p> <a href="/forgot-password" class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500 svelte-1biozp0">Lost password?</a></div></div> ${validate_component(Button, "Button").$$render(
          $$result,
          {
            type: "submit",
            class: "w-full bg-blue-600 hover:opacity-75 hover:bg-blue-600"
          },
          {},
          {
            default: () => {
              return `Login to your account`;
            }
          }
        )} <div class="text-sm font-medium text-gray-500 dark:text-gray-300" data-svelte-h="svelte-ivazk0">Not registered? <a href="/create-account" class="ml-10 text-blue-600 hover:underline dark:text-primary-500 svelte-1biozp0">Create account</a></div></form>`;
      }
    })}</div> </div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
