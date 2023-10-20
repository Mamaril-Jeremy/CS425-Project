import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, f as add_attribute, o as each, v as validate_component } from "../../../chunks/ssr.js";
import { i as images, C as Carousel } from "../../../chunks/images.js";
import { twMerge } from "tailwind-merge";
const Thumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["selected", "activeClass", "inactiveClass"]);
  let { selected = false } = $$props;
  let { activeClass = "opacity-100" } = $$props;
  let { inactiveClass = "opacity-60" } = $$props;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.inactiveClass === void 0 && $$bindings.inactiveClass && inactiveClass !== void 0)
    $$bindings.inactiveClass(inactiveClass);
  return `<img${spread(
    [
      { alt: "..." },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(selected ? activeClass : inactiveClass, $$props.class))
      }
    ],
    {}
  )}> `;
});
const Thumbnails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { images: images2 = [] } = $$props;
  let { index = 0 } = $$props;
  let { ariaLabel = "Click to view image" } = $$props;
  let { imgClass = "" } = $$props;
  let { throttleDelay = 650 } = $$props;
  if ($$props.images === void 0 && $$bindings.images && images2 !== void 0)
    $$bindings.images(images2);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
    $$bindings.imgClass(imgClass);
  if ($$props.throttleDelay === void 0 && $$bindings.throttleDelay && throttleDelay !== void 0)
    $$bindings.throttleDelay(throttleDelay);
  index = (index + images2.length) % images2.length;
  return `<div${add_attribute("class", twMerge("flex flex-row justify-center bg-gray-100 w-full", $$props.class), 0)}>${each(images2, (image, idx) => {
    let selected = index === idx;
    return `  <button${add_attribute("aria-label", ariaLabel, 0)}>${slots.default ? slots.default({ Thumbnail, image, selected, imgClass }) : ` ${validate_component(Thumbnail, "Thumbnail").$$render($$result, Object.assign({}, image, { selected }, { class: imgClass }), {}, {})} `} </button>`;
  })}</div> `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let index = 0;
  let forward = true;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="max-w-4xl space-y-2">${validate_component(Carousel, "Carousel").$$render(
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
    )} ${validate_component(Thumbnails, "Thumbnails").$$render(
      $$result,
      { images, forward, index },
      {
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
