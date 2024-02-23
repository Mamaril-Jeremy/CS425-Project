import { c as create_ssr_component, a as compute_rest_props, s as setContext, e as spread, f as escape_object, h as escape_attribute_value, i as getContext, b as add_attribute, j as escape, d as compute_slots, k as subscribe, v as validate_component, l as each } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
import { A as Avatar } from "../../../chunks/Avatar.js";
import { B as Button } from "../../../chunks/Button.js";
import { N as Navbar, a as NavBrand, b as NavHamburger, c as NavUl, d as NavLi } from "../../../chunks/NavUl.js";
import { twMerge } from "tailwind-merge";
import "form-data";
import "../../../chunks/firebase.client.js";
import "firebase/firestore";
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["activeUrl", "asideClass", "nonActiveClass", "activeClass", "ariaLabel"]);
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { asideClass = "w-64" } = $$props;
  let { nonActiveClass = "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" } = $$props;
  let { activeClass = "flex items-center p-2 text-base font-normal text-gray-900 bg-gray-200 dark:bg-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" } = $$props;
  let { ariaLabel = "Sidebar" } = $$props;
  setContext("sidebarContext", { activeClass, nonActiveClass });
  setContext("activeUrl", activeUrlStore);
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0)
    $$bindings.activeUrl(activeUrl);
  if ($$props.asideClass === void 0 && $$bindings.asideClass && asideClass !== void 0)
    $$bindings.asideClass(asideClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
    $$bindings.nonActiveClass(nonActiveClass);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  {
    {
      activeUrlStore.set(activeUrl);
    }
  }
  return `<aside${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(asideClass, $$props.class))
      },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</aside> `;
});
const SidebarItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let aClass;
  let $$restProps = compute_rest_props($$props, ["href", "label", "spanClass", "activeClass", "nonActiveClass"]);
  let $$slots = compute_slots(slots);
  let { href = "" } = $$props;
  let { label = "" } = $$props;
  let { spanClass = "ml-3" } = $$props;
  let { activeClass = void 0 } = $$props;
  let { nonActiveClass = void 0 } = $$props;
  const context = getContext("sidebarContext") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let sidebarUrl = "";
  activeUrlStore.subscribe((value) => {
    sidebarUrl = value;
  });
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0)
    $$bindings.spanClass(spanClass);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
    $$bindings.nonActiveClass(nonActiveClass);
  active = sidebarUrl ? href === sidebarUrl : false;
  aClass = twMerge(
    active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
    $$props.class
  );
  return `<li><a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      { class: escape_attribute_value(aClass) }
    ],
    {}
  )}>${slots.icon ? slots.icon({}) : ``} <span${add_attribute("class", spanClass, 0)}>${escape(label)}</span> ${$$slots.subtext ? `${slots.subtext ? slots.subtext({}) : ``}` : ``}</a></li> `;
});
const SidebarGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ulClass", "borderClass", "border"]);
  let { ulClass = "space-y-2" } = $$props;
  let { borderClass = "pt-4 mt-4 border-t border-gray-200 dark:border-gray-700" } = $$props;
  let { border = false } = $$props;
  if (border) {
    ulClass += " " + borderClass;
  }
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0)
    $$bindings.ulClass(ulClass);
  if ($$props.borderClass === void 0 && $$bindings.borderClass && borderClass !== void 0)
    $$bindings.borderClass(borderClass);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  return `<ul${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(ulClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</ul> `;
});
const SidebarWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["divClass"]);
  let { divClass = "overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800" } = $$props;
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Mpfp = "/_app/immutable/assets/Mark Marsala.b795bb3e.jpg";
const Mipfp = "/_app/immutable/assets/mike.0837461f.png";
const Rpfp = "/_app/immutable/assets/Richard Cao.134e1db4.png";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: 'ul.svelte-1hpcyjx.svelte-1hpcyjx{color:black;z-index:100000;bottom:10%;position:absolute;left:2%}.Sidebar.svelte-1hpcyjx.svelte-1hpcyjx{position:fixed;top:4.5rem;left:0rem;height:100%;box-shadow:rgba(0,0,0,25) 0px 3px 8px;background:white}.message-container.svelte-1hpcyjx.svelte-1hpcyjx{overflow-y:scroll;position:absolute;right:0.01rem;top:14%;height:80%}.chatbox.svelte-1hpcyjx.svelte-1hpcyjx{width:87%;height:93%;position:fixed;top:4.2rem;right:0rem;border-radius:.5rem;box-shadow:rgba(0,0,0,0.25) 0px 3px 8px;background:white;z-index:500}.dashboard.svelte-1hpcyjx.svelte-1hpcyjx{position:fixed;z-index:2000;top:11%;left:13%;width:85%;height:40%}.button.svelte-1hpcyjx.svelte-1hpcyjx{position:absolute;bottom:1rem;right:0.5rem;width:100px;height:2.8rem;color:rgb(0, 0, 0);cursor:pointer;border-radius:.25rem;border:black;transition:all ease .25s;z-index:1000}.textbox.svelte-1hpcyjx.svelte-1hpcyjx{position:absolute;bottom:1rem;left:1rem;width:89%;box-sizing:border-box;font-size:16px;z-index:1000;background-color:black;border:1px solid black;padding:0;margin:0}.textbox.svelte-1hpcyjx input[type="text"].svelte-1hpcyjx{width:100%;color:black}.Title.svelte-1hpcyjx.svelte-1hpcyjx{color:black;font-size:30px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $messages, $$unsubscribe_messages;
  let messages = writable([]);
  $$unsubscribe_messages = subscribe(messages, (value) => $messages = value);
  let messageInput = "";
  let currentRecipient = "Mark Marsala";
  $$result.css.add(css);
  $$unsubscribe_messages();
  return `<div class="Sidebar svelte-1hpcyjx">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(SidebarWrapper, "SidebarWrapper").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, {}, {}, {
            default: () => {
              return `<div class="Title svelte-1hpcyjx" data-svelte-h="svelte-g5cdi9"><p>Connections</p></div> ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Mark Marsala" }, {}, {
                icon: () => {
                  return `${validate_component(Avatar, "Avatar").$$render(
                    $$result,
                    {
                      src: Mpfp,
                      class: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    },
                    {},
                    {}
                  )}`;
                }
              })} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Michael Nia" }, {}, {
                icon: () => {
                  return `${validate_component(Avatar, "Avatar").$$render(
                    $$result,
                    {
                      src: Mipfp,
                      class: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    },
                    {},
                    {}
                  )}`;
                }
              })} ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Richard Cao" }, {}, {
                icon: () => {
                  return `${validate_component(Avatar, "Avatar").$$render(
                    $$result,
                    {
                      src: Rpfp,
                      class: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}</div> <div class="container>"><div class="dashboard svelte-1hpcyjx">${validate_component(Navbar, "Navbar").$$render($$result, { rounded: true, color: "form" }, {}, {
    default: () => {
      return `${validate_component(NavBrand, "NavBrand").$$render($$result, {}, {}, {
        default: () => {
          return `<img${add_attribute("src", Mpfp, 0)} class="mr-3 h-6 sm:h-9" alt="Mark Marsala profile picture" aria-hidden="false"> <span class="self-center whitespace-nowrap text-xl font-semibold dark text-black">${escape(currentRecipient)}</span>`;
        }
      })} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})} ${validate_component(NavUl, "NavUl").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(NavLi, "NavLi").$$render(
            $$result,
            {
              class: "cursor-pointer hover:cursor-pointer"
            },
            {},
            {
              default: () => {
                return `View Profile`;
              }
            }
          )} ${validate_component(NavLi, "NavLi").$$render(
            $$result,
            {
              class: "cursor-pointer hover:cursor-pointer"
            },
            {},
            {
              default: () => {
                return `Schedule Appointment`;
              }
            }
          )} ${validate_component(NavLi, "NavLi").$$render(
            $$result,
            {
              class: "cursor-pointer hover:cursor-pointer"
            },
            {},
            {
              default: () => {
                return `Disconnect`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}</div> <div class="chatbox svelte-1hpcyjx"><ul class="svelte-1hpcyjx">${each($messages, ({ text, timestamp, user }) => {
    return `<li data-svelte-h="svelte-ztesza">----------------------------------------------------------------------------------------------</li> <li class="font:30">${escape(user)} ${escape(timestamp)}:</li> <li>${escape(text)}</li>`;
  })}</ul> <div class="message-container svelte-1hpcyjx" data-svelte-h="svelte-r49ms2"></div> <div class="textbox svelte-1hpcyjx"><input type="text" placeholder="Enter message here" class="svelte-1hpcyjx"${add_attribute("value", messageInput, 0)}></div> <div class="button svelte-1hpcyjx">${validate_component(Button, "Button").$$render($$result, { color: "blue" }, {}, {
    default: () => {
      return `Send`;
    }
  })}</div></div> </div>`;
});
export {
  Page as default
};
