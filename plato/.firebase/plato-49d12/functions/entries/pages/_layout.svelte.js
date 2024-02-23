import { g as get_current_component, c as create_ssr_component, a as compute_rest_props, b as add_attribute, v as validate_component, s as setContext, d as compute_slots, e as spread, f as escape_object, h as escape_attribute_value, i as getContext, j as escape, k as subscribe } from "../../chunks/ssr.js";
import "../../chunks/firebase.client.js";
import { a as authStore } from "../../chunks/authStore.js";
import "firebase/auth";
import { A as Avatar } from "../../chunks/Avatar.js";
import { twJoin, twMerge } from "tailwind-merge";
import * as dom from "@floating-ui/dom";
import { F as Frame } from "../../chunks/Frame.js";
import { w as writable } from "../../chunks/index.js";
import { i as is_void } from "../../chunks/names.js";
import { W as Wrapper } from "../../chunks/Wrapper.js";
import { N as Navbar, a as NavBrand, b as NavHamburger, c as NavUl, d as NavLi } from "../../chunks/NavUl.js";
import "firebase/firestore";
import { P as Pfp } from "../../chunks/jeremy.js";
import { B as Button } from "../../chunks/Button.js";
const app = "";
function createEventDispatcher() {
  const component = get_current_component();
  return (type, target, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = new CustomEvent(type, { detail });
      target.dispatchEvent(event);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
const Popper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeContent",
    "arrow",
    "offset",
    "placement",
    "trigger",
    "triggeredBy",
    "reference",
    "strategy",
    "open",
    "yOnly"
  ]);
  let { activeContent = false } = $$props;
  let { arrow = true } = $$props;
  let { offset = 8 } = $$props;
  let { placement = "top" } = $$props;
  let { trigger = "hover" } = $$props;
  let { triggeredBy = void 0 } = $$props;
  let { reference = void 0 } = $$props;
  let { strategy = "absolute" } = $$props;
  let { open = false } = $$props;
  let { yOnly = false } = $$props;
  const dispatch = createEventDispatcher();
  let referenceEl;
  let floatingEl;
  let arrowEl;
  let contentEl;
  const px = (n) => n != null ? `${n}px` : "";
  let arrowSide;
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  let middleware;
  function updatePosition() {
    dom.computePosition(referenceEl, floatingEl, { placement, strategy, middleware }).then(({ x, y, middlewareData, placement: placement2, strategy: strategy2 }) => {
      floatingEl.style.position = strategy2;
      floatingEl.style.left = yOnly ? "0" : px(x);
      floatingEl.style.top = px(y);
      if (middlewareData.arrow && arrowEl instanceof HTMLDivElement) {
        arrowEl.style.left = px(middlewareData.arrow.x);
        arrowEl.style.top = px(middlewareData.arrow.y);
        arrowSide = oppositeSideMap[placement2.split("-")[0]];
        arrowEl.style[arrowSide] = px(-arrowEl.offsetWidth / 2 - ($$props.border ? 1 : 0));
      }
    });
  }
  function init(node, _referenceEl) {
    floatingEl = node;
    let cleanup = dom.autoUpdate(_referenceEl, floatingEl, updatePosition);
    return {
      update(_referenceEl2) {
        cleanup();
        cleanup = dom.autoUpdate(_referenceEl2, floatingEl, updatePosition);
      },
      destroy() {
        cleanup();
      }
    };
  }
  let arrowClass;
  if ($$props.activeContent === void 0 && $$bindings.activeContent && activeContent !== void 0)
    $$bindings.activeContent(activeContent);
  if ($$props.arrow === void 0 && $$bindings.arrow && arrow !== void 0)
    $$bindings.arrow(arrow);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
    $$bindings.trigger(trigger);
  if ($$props.triggeredBy === void 0 && $$bindings.triggeredBy && triggeredBy !== void 0)
    $$bindings.triggeredBy(triggeredBy);
  if ($$props.reference === void 0 && $$bindings.reference && reference !== void 0)
    $$bindings.reference(reference);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.yOnly === void 0 && $$bindings.yOnly && yOnly !== void 0)
    $$bindings.yOnly(yOnly);
  placement && (referenceEl = referenceEl);
  {
    dispatch("show", referenceEl, open);
  }
  middleware = [
    dom.flip(),
    dom.shift(),
    dom.offset(+offset),
    arrowEl
  ];
  arrowClass = twJoin("absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit", $$props.border && arrowSide === "bottom" && "border-b border-r", $$props.border && arrowSide === "top" && "border-t border-l ", $$props.border && arrowSide === "right" && "border-t border-r ", $$props.border && arrowSide === "left" && "border-b border-l ");
  return `${!referenceEl ? `<div${add_attribute("this", contentEl, 0)}></div>` : ``} ${open && referenceEl ? `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, { use: init }, { options: referenceEl }, { role: "tooltip" }, { tabindex: activeContent ? -1 : void 0 }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``} ${arrow ? `<div${add_attribute("class", arrowClass, 0)}></div>` : ``}`;
    }
  })}` : ``} `;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["activeUrl", "open", "containerClass", "headerClass", "footerClass", "activeClass"]);
  let $$slots = compute_slots(slots);
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { open = false } = $$props;
  let { containerClass = "divide-y z-50" } = $$props;
  let { headerClass = "py-1 overflow-hidden rounded-t-lg" } = $$props;
  let { footerClass = "py-1 overflow-hidden rounded-b-lg" } = $$props;
  let { activeClass = "text-primary-700 dark:text-primary-700 hover:text-primary-900 dark:hover:text-primary-900" } = $$props;
  let activeCls = twMerge(activeClass, $$props.classActive);
  setContext("DropdownType", { activeClass: activeCls });
  setContext("activeUrl", activeUrlStore);
  let containerCls = twMerge(containerClass, $$props.classContainer);
  let headerCls = twMerge(headerClass, $$props.classHeader);
  let ulCls = twMerge("py-1", $$props.class);
  let footerCls = twMerge(footerClass, $$props.classFooter);
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0)
    $$bindings.activeUrl(activeUrl);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0)
    $$bindings.containerClass(containerClass);
  if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0)
    $$bindings.headerClass(headerClass);
  if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0)
    $$bindings.footerClass(footerClass);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      activeUrlStore.set(activeUrl);
    }
    {
      {
        $$restProps.arrow = $$restProps.arrow ?? false;
        $$restProps.trigger = $$restProps.trigger ?? "click";
        $$restProps.placement = $$restProps.placement ?? "bottom";
        $$restProps.color = $$restProps.color ?? "dropdown";
        $$restProps.shadow = $$restProps.shadow ?? true;
        $$restProps.rounded = $$restProps.rounded ?? true;
      }
    }
    $$rendered = `${validate_component(Popper, "Popper").$$render(
      $$result,
      Object.assign({}, { activeContent: true }, $$restProps, { class: containerCls }, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${$$slots.header ? `<div${add_attribute("class", headerCls, 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} <ul${add_attribute("class", ulCls, 0)}>${slots.default ? slots.default({}) : ``}</ul> ${$$slots.footer ? `<div${add_attribute("class", footerCls, 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
const DropdownDivider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["divClass"]);
  let { divClass = "my-1 h-px bg-gray-100 dark:bg-gray-600" } = $$props;
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
  )}></div> `;
});
const DropdownHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["divClass", "divider"]);
  let { divClass = "py-2 px-4 text-gray-700 dark:text-white" } = $$props;
  let { divider = true } = $$props;
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.divider === void 0 && $$bindings.divider && divider !== void 0)
    $$bindings.divider(divider);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(divClass, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div> ${divider ? `${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})}` : ``} `;
});
const DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["defaultClass", "href", "activeClass"]);
  let { defaultClass = "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" } = $$props;
  let { href = void 0 } = $$props;
  let { activeClass = void 0 } = $$props;
  const context = getContext("DropdownType") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let sidebarUrl = "";
  activeUrlStore.subscribe((value) => {
    sidebarUrl = value;
  });
  let wrap = true;
  function init(node) {
    wrap = node.parentElement?.tagName === "UL";
  }
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  active = sidebarUrl ? href === sidebarUrl : false;
  liClass = twMerge(defaultClass, href ? "block" : "w-full text-left", active && (activeClass ?? context.activeClass), $$props.class);
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { tag: "li", show: wrap, use: init }, {}, {
    default: () => {
      return `${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            { href: escape_attribute_value(href) },
            {
              type: escape_attribute_value(href ? void 0 : "button")
            },
            {
              role: escape_attribute_value(href ? "link" : "button")
            },
            escape_object($$restProps),
            { class: escape_attribute_value(liClass) }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")}`;
    }
  })} `;
});
const Logo = "/_app/immutable/assets/plato_logo.b414e781.png";
const NavbarIn_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".navbar-container.svelte-xlis1w{position:fixed;top:17px;left:0;right:0;z-index:1000000;display:flex;justify-content:space-between;align-items:center;height:40px}.plato.svelte-xlis1w{background:linear-gradient(rgb(80, 101, 168), rgb(78, 99, 166));-webkit-background-clip:text;background-clip:text;color:transparent;font-size:x-large}",
  map: null
};
const NavbarIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userEmail;
  $$result.css.add(css$2);
  return `<div class="navbar-container svelte-xlis1w">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/home" }, {}, {
        default: () => {
          return `<img${add_attribute("src", Logo, 0)} class="mr-3 w-14 first-line:sm:w-16" alt="Flowbite Logo"> <span class="self-center whitespace-nowrap font-semibolddark:text-white" data-svelte-h="svelte-1c55wqg"><span class="plato svelte-xlis1w">Plato</span></span>`;
        }
      })} <div class="flex items-center md:order-2">${validate_component(Avatar, "Avatar").$$render(
        $$result,
        {
          id: "avatar-menu",
          class: "h-13 w-11",
          src: Pfp
        },
        {},
        {}
      )} ${validate_component(NavHamburger, "NavHamburger").$$render(
        $$result,
        {
          class1: "w-full md:flex md:w-auto md:order-1"
        },
        {},
        {}
      )}</div> ${validate_component(Dropdown, "Dropdown").$$render(
        $$result,
        {
          placement: "bottom",
          triggeredBy: "#avatar-menu"
        },
        {},
        {
          default: () => {
            return `${validate_component(DropdownHeader, "DropdownHeader").$$render($$result, {}, {}, {
              default: () => {
                return `${``} <span class="block truncate text-sm font-medium">${escape(userEmail)}</span>`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Dashboard`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Settings`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Profile`;
              }
            })} ${validate_component(DropdownDivider, "DropdownDivider").$$render($$result, {}, {}, {})} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `<span class="text-blue-600" data-svelte-h="svelte-ydog49">Sign out</span>`;
              }
            })}`;
          }
        }
      )} ${validate_component(NavUl, "NavUl").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/home" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-lg" data-svelte-h="svelte-t6fwuw">Home</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/chat" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-lg" data-svelte-h="svelte-ka37g9">Chat</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/connections" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-lg" data-svelte-h="svelte-1rqynk4">Connections</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/events" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-lg" data-svelte-h="svelte-1id73py">Events</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/about" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-lg" data-svelte-h="svelte-i5gzsc">About</span>`;
            }
          })}`;
        }
      })}`;
    }
  })} </div>`;
});
const NavbarOut_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".navbar-container.svelte-98wits{position:fixed;top:0;left:0;right:0;z-index:1000;width:100%;top:0;transition:top 0.3s;height:45px}",
  map: null
};
const NavbarOut = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let navbar;
  $$result.css.add(css$1);
  return `<div class="navbar-container svelte-98wits"${add_attribute("this", navbar, 0)}>${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {
    default: ({ hidden, toggle }) => {
      return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/home" }, {}, {
        default: () => {
          return `<img${add_attribute("src", Logo, 0)} class="mr-3 w-10 first-line:sm:w-16" alt="Plato Logo"> <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white" data-svelte-h="svelte-ilham">Plato</span>`;
        }
      })} <div class="flex md:order-2">${validate_component(Button, "Button").$$render(
        $$result,
        {
          color: "blue",
          href: "/create-profile/upload-pfp",
          class: "text-base"
        },
        {},
        {
          default: () => {
            return `Sign In`;
          }
        }
      )} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, {}, {}, {})}</div> ${validate_component(NavUl, "NavUl").$$render($$result, { hidden, class: "order-1" }, {}, {
        default: () => {
          return `${validate_component(NavLi, "NavLi").$$render($$result, { href: "/home" }, {}, {
            default: () => {
              return `<span class="hover-blue-600 text-xl" data-svelte-h="svelte-zffabg">Home</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/sign-in" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-xl" data-svelte-h="svelte-1x8042c">Chat</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/sign-in" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-xl" data-svelte-h="svelte-1pr5z9l">Connections</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/sign-in" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-xl" data-svelte-h="svelte-1jzdc1z">Events</span>`;
            }
          })} ${validate_component(NavLi, "NavLi").$$render($$result, { href: "/about" }, {}, {
            default: () => {
              return `<span class="hover:text-blue-600 text-xl" data-svelte-h="svelte-1h4l5i9">About</span>`;
            }
          })}`;
        }
      })}`;
    }
  })} </div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-11uzfdx{display:flex;height:100vh;justify-content:center;align-items:center}p.svelte-11uzfdx{font-size:34px;text-align:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  $$result.css.add(css);
  $$unsubscribe_authStore();
  return `${$$result.head += `<!-- HEAD_svelte-da304h_START -->${$$result.title = `<title>Plato</title>`, ""}<link rel="icon" type="image/svg+xml"${add_attribute("href", Logo, 0)}><!-- HEAD_svelte-da304h_END -->`, ""} ${$authStore.isLoading ? `<div class="svelte-11uzfdx" data-svelte-h="svelte-199qfu1"><p class="svelte-11uzfdx">Loading...</p></div>` : `${$authStore.loggedIn ? `${validate_component(NavbarIn, "NavbarIn").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}` : `${validate_component(NavbarOut, "NavbarOut").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`}`}`;
});
export {
  Layout as default
};
