import { c as create_ssr_component, a as compute_rest_props, i as getContext, b as spread, e as escape_object, d as escape_attribute_value, f as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { G as GradientButton } from "../../../chunks/GradientButton.js";
import { i as images, C as Carousel } from "../../../chunks/images.js";
import { twMerge } from "tailwind-merge";
const ArrowRightOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "strokeLinecap", "strokeLinejoin", "strokeWidth", "ariaLabel"]);
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
  let { strokeLinecap = ctx.strokeLinecap || "round" } = $$props;
  let { strokeLinejoin = ctx.strokeLinejoin || "round" } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { ariaLabel = "arrow right outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0)
    $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.strokeLinejoin === void 0 && $$bindings.strokeLinejoin && strokeLinejoin !== void 0)
    $$bindings.strokeLinejoin(strokeLinejoin);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 14 11" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="M1 5.64h12m0 0L9 1.85m4 3.79L9 9.432"></path></svg> `;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".hero.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{text-align:center;background-color:#f5f5f5;padding:4rem 0}.hero.s-A-bC3Hke5zSn h1.s-A-bC3Hke5zSn{font-size:3rem;margin-bottom:1rem;color:#333}.hero.s-A-bC3Hke5zSn p.s-A-bC3Hke5zSn{font-size:1.5rem;color:#666}.features.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{text-align:center;padding:2rem 0}.feature.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{margin:2rem 0}.feature.s-A-bC3Hke5zSn h2.s-A-bC3Hke5zSn{font-size:2rem;color:#333}.feature.s-A-bC3Hke5zSn p.s-A-bC3Hke5zSn{font-size:1.2rem;color:#666}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let index = 0;
  let forward = true;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `   <div class="max-w-4xl space-y-2">${validate_component(Carousel, "Carousel").$$render(
      $$result,
      { images, forward, index },
      {
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ Indicators, Controls }) => {
          return `${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})} ${validate_component(Indicators, "Indicators").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div>  <div class="hero s-A-bC3Hke5zSn"><h1 class="s-A-bC3Hke5zSn" data-svelte-h="svelte-gzz2ar">Welcome to Plato</h1> <p class="s-A-bC3Hke5zSn" data-svelte-h="svelte-8giakk">Your journey to personal and professional growth starts here.</p>  ${validate_component(GradientButton, "GradientButton").$$render(
      $$result,
      {
        color: "blue",
        href: "/about-out",
        target: "_self"
      },
      {},
      {
        default: () => {
          return `Discover More
      ${validate_component(ArrowRightOutline, "ArrowRightOutline").$$render($$result, {}, {}, {})}`;
        }
      }
    )}</div>  <div class="max-w-4xl space-y-4 features s-A-bC3Hke5zSn"> <div class="feature s-A-bC3Hke5zSn"><h2 class="s-A-bC3Hke5zSn" data-svelte-h="svelte-84a10z">Why Plato?</h2> <p class="s-A-bC3Hke5zSn" data-svelte-h="svelte-1robrbr">Unlock your potential with a mentor by your side, guiding you through your career or academic journey. Mentorship is at the heart of what we do.</p></div>  <div class="feature s-A-bC3Hke5zSn"><h2 class="s-A-bC3Hke5zSn" data-svelte-h="svelte-1n58xsm">Connecting Dreams and Expertise</h2> <p class="s-A-bC3Hke5zSn" data-svelte-h="svelte-1tn657u">Plato brings together passionate learners and seasoned professionals, creating a dynamic synergy that propels you towards greatness.</p></div>  <div class="feature s-A-bC3Hke5zSn"><h2 class="s-A-bC3Hke5zSn" data-svelte-h="svelte-1f5vcx">Personalized Mentorship</h2> <p class="s-A-bC3Hke5zSn" data-svelte-h="svelte-10rx0el">Experience the art of personalization. We pair you with mentors who understand your unique goals and aspirations, providing tailored support.</p></div>  <div class="feature s-A-bC3Hke5zSn"><h2 class="s-A-bC3Hke5zSn" data-svelte-h="svelte-zufb7c">Trust and Community</h2> <p class="s-A-bC3Hke5zSn" data-svelte-h="svelte-j9svps">Plato is your sanctuary for forging genuine and meaningful connections. Join our community of learners and mentors and start your journey to success.</p></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
