import { c as create_ssr_component, a as compute_rest_props, v as validate_component, f as add_attribute, n as createEventDispatcher, b as spread, d as escape_attribute_value, e as escape_object, s as setContext, i as getContext, l as escape, h as compute_slots } from "../../../chunks/ssr.js";
import { P as Pfp, A as Avatar } from "../../../chunks/Mark Marsala.js";
import { twMerge } from "tailwind-merge";
import { T as ToolbarButton } from "../../../chunks/ToolbarButton.js";
import { G as GradientButton } from "../../../chunks/GradientButton.js";
import { w as writable } from "../../../chunks/index.js";
const CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name"]);
  let { name = "Close" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name }, $$restProps, { class: twMerge("ml-auto", $$props.class) }), {}, {
    default: ({ svgSize }) => {
      return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
  })} `;
});
const Banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let div2Class;
  let $$restProps = compute_rest_props($$props, ["position", "dismissable", "bannerType", "divClass", "innerClass"]);
  let { position = "sticky" } = $$props;
  let { dismissable = true } = $$props;
  let { bannerType = "default" } = $$props;
  let { divClass = "z-10 flex justify-between p-4 dark:bg-gray-700 dark:border-gray-600" } = $$props;
  let { innerClass = "flex" } = $$props;
  const dispatch = createEventDispatcher();
  const divClasses = {
    default: "top-0 left-0 w-full border-b border-gray-200 bg-gray-50",
    bottom: "bottom-0 left-0 w-full border-t border-gray-200 bg-gray-50",
    cta: "flex-col md:flex-row  w-[calc(100%-2rem)] -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6",
    signup: "top-0 left-0 w-full border-b border-gray-200 bg-gray-50",
    info: "top-0 left-0 flex-col w-full border-b border-gray-200 md:flex-row bg-gray-50"
  };
  const insideDivClasses = {
    default: "items-center mx-auto",
    bottom: "items-center mx-auto",
    cta: "flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0",
    signup: "items-center flex-shrink-0 w-full mx-auto sm:w-auto",
    info: "items-center flex-shrink-0"
  };
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0)
    $$bindings.dismissable(dismissable);
  if ($$props.bannerType === void 0 && $$bindings.bannerType && bannerType !== void 0)
    $$bindings.bannerType(bannerType);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.innerClass === void 0 && $$bindings.innerClass && innerClass !== void 0)
    $$bindings.innerClass(innerClass);
  {
    dispatch("open");
  }
  divClass = twMerge(position, divClass, divClasses[bannerType], $$props.classDiv);
  div2Class = twMerge(innerClass, insideDivClasses[bannerType], $$props.classInner);
  return `${`<div${spread(
    [
      { tabindex: "-1" },
      { class: escape_attribute_value(divClass) },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.header ? slots.header({}) : ``} <div${add_attribute("class", div2Class, 0)}>${slots.default ? slots.default({}) : ``}</div> ${dismissable ? `<div class="flex items-center">${validate_component(CloseButton, "CloseButton").$$render(
    $$result,
    {
      class: "-mx-1.5 -my-1.5",
      color: $$restProps.color
    },
    {},
    {}
  )}</div>` : ``}</div>`} `;
});
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
const GridSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { ariaLabel = "grid solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "currentColor" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 18 18" }
    ],
    {}
  )}><path fill="currentColor" d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"></path></svg> `;
});
const MailBoxSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { ariaLabel = "mail box solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "currentColor" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 20 20" }
    ],
    {}
  )}><path fill="currentColor" d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"></path></svg> `;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.Sidebar.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q{position:fixed;top:4.5rem;left:0rem;height:44rem;box-shadow:rgba(0,0,0,25) 0px 3px 8px;background:white}.message-container.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q{overflow-y:scroll;position:absolute;right:0.01rem;top:8.5rem;height:70%}.chatbox.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q{width:82.7%;height:91.7%;position:fixed;top:4.2rem;left:16rem;border-radius:.5rem;box-shadow:rgba(0,0,0,0.25) 0px 3px 8px;background:white;z-index:500}.button.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q{position:absolute;bottom:1rem;right:0.5rem;width:100px;height:2.75rem;color:rgb(0, 0, 0);cursor:pointer;border-radius:.25rem;border:black;transition:all ease .25s;z-index:1000}.button.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q:hover{z-index:1000;background-color:rgb(255, 203, 144)}.textbox.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q{position:absolute;bottom:1rem;left:1rem;width:89%;box-sizing:border-box;font-size:16px;z-index:1000;background-color:black;border:1px solid black;padding:0;margin:0}.textbox.s-x1Clvj2bit-Q input[type="text"].s-x1Clvj2bit-Q{width:100%;color:black}.Title.s-x1Clvj2bit-Q.s-x1Clvj2bit-Q{color:black;font-size:30px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="Sidebar s-x1Clvj2bit-Q">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(SidebarWrapper, "SidebarWrapper").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(SidebarGroup, "SidebarGroup").$$render($$result, {}, {}, {
            default: () => {
              return `<div class="Title s-x1Clvj2bit-Q"><p data-svelte-h="svelte-fimsax">Connections</p></div> ${validate_component(SidebarItem, "SidebarItem").$$render($$result, { label: "Mark Marsala", href: "/home" }, {}, {
                icon: () => {
                  return `${validate_component(Avatar, "Avatar").$$render(
                    $$result,
                    {
                      src: Pfp,
                      class: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    },
                    {},
                    {}
                  )}`;
                }
              })} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Jeremy",
                  href: "/docs/components/accordion"
                },
                {},
                {
                  icon: () => {
                    return `${validate_component(GridSolid, "GridSolid").$$render(
                      $$result,
                      {
                        class: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      },
                      {},
                      {}
                    )}`;
                  }
                }
              )} ${validate_component(SidebarItem, "SidebarItem").$$render(
                $$result,
                {
                  label: "Richard",
                  href: "/docs/components/alert"
                },
                {},
                {
                  icon: () => {
                    return `${validate_component(MailBoxSolid, "MailBoxSolid").$$render(
                      $$result,
                      {
                        class: "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      },
                      {},
                      {}
                    )}`;
                  }
                }
              )}`;
            }
          })}`;
        }
      })}`;
    }
  })}</div> <div class="container>"><div class="chatbox s-x1Clvj2bit-Q"><div class="message-container s-x1Clvj2bit-Q" data-svelte-h="svelte-17d3mis"></div> <div class="textbox s-x1Clvj2bit-Q"><input type="text" placeholder="Enter text here" class="s-x1Clvj2bit-Q"></div> <div class="button s-x1Clvj2bit-Q">${validate_component(GradientButton, "GradientButton").$$render($$result, { color: "blue" }, {}, {
    default: () => {
      return `Send`;
    }
  })}</div> ${validate_component(Banner, "Banner").$$render(
    $$result,
    {
      id: "default-banner",
      position: "absolute"
    },
    {},
    {
      default: () => {
        return `<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400"><span class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600"><span class="sr-only" data-svelte-h="svelte-i3lifc">Light bulb</span></span> <span>New brand identity has been launched for the <a href="https://flowbite.com" class="inline font-medium text-primary-600 underline dark:text-primary-500 underline-offset-2 decoration-600 dark:decoration-500 decoration-solid hover:no-underline" data-svelte-h="svelte-1ekyioh">Flowbite Library</a></span></p>`;
      }
    }
  )}</div> </div>`;
});
export {
  Page as default
};
