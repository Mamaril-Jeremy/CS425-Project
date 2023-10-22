import { c as create_ssr_component, f as add_attribute, h as escape, g as getContext, k as validate_store, l as subscribe, v as validate_component, w as each, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, z as createEventDispatcher, s as setContext } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
import { t as twMerge } from "../../../chunks/tw-merge.js";
import { I as Indicator } from "../../../chunks/Indicator.js";
const ControlButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { forward } = $$props;
  let { name } = $$props;
  let buttonCls;
  if ($$props.forward === void 0 && $$bindings.forward && forward !== void 0)
    $$bindings.forward(forward);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  buttonCls = twMerge("flex absolute top-0 z-30 justify-center items-center px-4 h-full group focus:outline-none text-white dark:text-gray-300", forward ? "right-0" : "left-0", $$props.class);
  return `<button type="button"${add_attribute("class", buttonCls, 0)}>${slots.default ? slots.default({}) : ` <span class="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">${forward ? `<svg aria-hidden="true" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>` : `<svg aria-hidden="true" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`} <span class="sr-only">${escape(name)}</span></span> `}</button> `;
});
const canChangeSlide = ({ lastSlideChange, slideDuration, slideDurationRatio = 1 }) => {
  if (lastSlideChange && (/* @__PURE__ */ new Date()).getTime() - lastSlideChange.getTime() < slideDuration * slideDurationRatio) {
    console.warn("Can't change slide yet, too soon");
    return false;
  }
  return true;
};
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  const state = getContext("state");
  validate_store(state, "state");
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  const { update } = state;
  function changeSlide(forward) {
    if (!canChangeSlide({
      lastSlideChange: $state.lastSlideChange,
      slideDuration: $state.slideDuration,
      slideDurationRatio: 0.75
    })) {
      return;
    }
    if (forward) {
      update((_state) => {
        _state.forward = true;
        _state.index = _state.index >= _state.images.length - 1 ? 0 : _state.index + 1;
        _state.lastSlideChange = /* @__PURE__ */ new Date();
        return { ..._state };
      });
    } else {
      update((_state) => {
        _state.forward = false;
        _state.index = _state.index <= 0 ? _state.images.length - 1 : _state.index - 1;
        _state.lastSlideChange = /* @__PURE__ */ new Date();
        return { ..._state };
      });
    }
  }
  $$unsubscribe_state();
  return ` ${slots.default ? slots.default({ ControlButton, changeSlide }) : ` ${validate_component(ControlButton, "ControlButton").$$render(
    $$result,
    {
      name: "Previous",
      forward: false,
      class: twMerge($$props.class)
    },
    {},
    {}
  )} ${validate_component(ControlButton, "ControlButton").$$render(
    $$result,
    {
      name: "Next",
      forward: true,
      class: twMerge($$props.class)
    },
    {},
    {}
  )} `}`;
});
const Indicators = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let { activeClass = "opacity-100" } = $$props;
  let { inactiveClass = "opacity-60" } = $$props;
  const state = getContext("state");
  validate_store(state, "state");
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.inactiveClass === void 0 && $$bindings.inactiveClass && inactiveClass !== void 0)
    $$bindings.inactiveClass(inactiveClass);
  $$unsubscribe_state();
  return `<div${add_attribute("class", twMerge("flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2", $$props.class), 0)}>${each($state.images, (_, idx) => {
    let selected = $state.index === idx;
    return ` <button>${slots.default ? slots.default({ Indicator, selected, index: idx }) : ` ${validate_component(Indicator, "Indicator").$$render(
      $$result,
      {
        class: twMerge("bg-gray-100 hover:bg-gray-300", selected ? activeClass : inactiveClass)
      },
      {},
      {}
    )} `} </button>`;
  })}</div> `;
});
const Slide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imgClass;
  let $$restProps = compute_rest_props($$props, ["image", "transition"]);
  let $state, $$unsubscribe_state;
  const state = getContext("state");
  validate_store(state, "state");
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  let { image } = $$props;
  let { transition = null } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  ({
    x: $state.forward ? "100%" : "-100%",
    opacity: 1,
    width: "100%",
    height: "100%",
    duration: $state.slideDuration
  });
  ({
    x: $state.forward ? "-100%" : "100%",
    opacity: 0.9,
    width: "100%",
    height: "100%",
    duration: $state.slideDuration
  });
  imgClass = twMerge("absolute block !w-full h-full object-cover", $$props.class);
  $$unsubscribe_state();
  return `${transition ? `<img${spread(
    [
      { alt: "..." },
      escape_object(image),
      escape_object($$restProps),
      { class: escape_attribute_value(imgClass) }
    ],
    {}
  )}>` : `<img${spread(
    [
      { alt: "..." },
      escape_object(image),
      escape_object($$restProps),
      { class: escape_attribute_value(imgClass) }
    ],
    {}
  )}>`} `;
});
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "images",
    "index",
    "slideDuration",
    "transition",
    "duration",
    "ariaLabel",
    "imgClass"
  ]);
  let { images: images2 } = $$props;
  let { index = 0 } = $$props;
  let { slideDuration = 1e3 } = $$props;
  let { transition } = $$props;
  let { duration = 0 } = $$props;
  let { ariaLabel = "Draggable Carousel" } = $$props;
  let divClass = "grid overflow-hidden relative rounded-lg h-56 sm:h-64 xl:h-80 2xl:h-96";
  let { imgClass = "" } = $$props;
  const dispatch = createEventDispatcher();
  const { set, subscribe: subscribe2, update } = writable({
    images: images2,
    index,
    forward: true,
    slideDuration,
    lastSlideChange: /* @__PURE__ */ new Date()
  });
  const state = {
    set: (_state) => set({
      index: _state.index,
      images: _state.images,
      lastSlideChange: /* @__PURE__ */ new Date(),
      slideDuration,
      forward
    }),
    subscribe: subscribe2,
    update
  };
  let forward = true;
  setContext("state", state);
  subscribe2((_state) => {
    index = _state.index;
    forward = _state.forward;
    dispatch("change", images2[index]);
  });
  let prevIndex = index;
  let carouselDiv;
  if ($$props.images === void 0 && $$bindings.images && images2 !== void 0)
    $$bindings.images(images2);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.slideDuration === void 0 && $$bindings.slideDuration && slideDuration !== void 0)
    $$bindings.slideDuration(slideDuration);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.imgClass === void 0 && $$bindings.imgClass && imgClass !== void 0)
    $$bindings.imgClass(imgClass);
  {
    {
      if (!prevIndex || prevIndex < index) {
        update((_state) => ({ ..._state, forward: true, index }));
      } else {
        update((_state) => ({ ..._state, forward: false, index }));
      }
      prevIndex = index;
    }
  }
  return ` ${$$result.head += `<!-- HEAD_svelte-h5oyes_START -->${images2.length > 0 ? `${each(images2, (image) => {
    return `<link rel="preload"${add_attribute("href", image.src, 0)} as="image">`;
  })}` : ``}<!-- HEAD_svelte-h5oyes_END -->`, ""}   <div class="relative" role="button"${add_attribute("aria-label", ariaLabel, 0)} tabindex="0"${add_attribute("this", carouselDiv, 0)}><div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(
          divClass,
          "transition-transform",
          $$props.class
        ))
      }
    ],
    {}
  )}>${slots.slide ? slots.slide({ Slide, index }) : ` ${validate_component(Slide, "Slide").$$render(
    $$result,
    {
      image: images2[index],
      class: imgClass,
      transition
    },
    {},
    {}
  )} `}</div> ${slots.default ? slots.default({ index, Controls, Indicators }) : ``}</div> `;
});
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
const BR = "/_app/immutable/assets/Balloon Races.345a4d8c.jpg";
const HAG = "/_app/immutable/assets/HotAugustNights.6b5b2dcb.jpg";
const RR = "/_app/immutable/assets/RenoRodeo.e8175ee7.jpg";
const images = [
  {
    alt: "Balloon Races",
    src: BR
  },
  {
    alt: "Hot August Nights",
    src: HAG
  },
  {
    alt: "Reno Rodeo",
    src: RR
  }
];
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{max-width:800px;margin:0 auto;padding:20px}.carousel-container.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{text-align:center;margin-top:2rem}.carousel.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{max-width:100%;border-radius:10px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1)}.features.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{display:grid;grid-template-columns:repeat(2, 1fr);gap:20px}.feature.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{border-radius:10px;box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:20px;background-color:#f5f5f5}.feature.s-A-bC3Hke5zSn h2.s-A-bC3Hke5zSn{font-size:2rem;color:#333}.feature.s-A-bC3Hke5zSn p.s-A-bC3Hke5zSn{font-size:1.2rem;color:#666}.hero.s-A-bC3Hke5zSn.s-A-bC3Hke5zSn{text-align:center;background-color:#f5f5f5;padding:2rem 0}.hero.s-A-bC3Hke5zSn p.s-A-bC3Hke5zSn{font-size:1.5rem;color:#333}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="container s-A-bC3Hke5zSn"> <div class="carousel-container s-A-bC3Hke5zSn"><div class="carousel s-A-bC3Hke5zSn">${validate_component(Carousel, "Carousel").$$render($$result, { images }, {}, {
    default: () => {
      return ` ${validate_component(Thumbnails, "Thumbnails").$$render($$result, {}, {}, {})}`;
    }
  })}</div></div>  <div class="features s-A-bC3Hke5zSn">${each(
    [
      {
        title: "Why Plato",
        text: "Unlock your potential with a mentor by your side, guiding you through your career or academic journey. Mentorship is at the heart of what we do."
      },
      {
        title: "Connecting Dreams and Expertise",
        text: "Plato brings together passionate learners and seasoned professionals, creating a dynamic synergy that propels you towards greatness."
      },
      {
        title: "Personalized Mentorship",
        text: "Experience the art of personalization. We pair you with mentors who understand your unique goals and aspirations, providing tailored support."
      },
      {
        title: "Trust and Community",
        text: "Plato is your sanctuary for forging genuine and meaningful connections. Join our community of learners and mentors and start your journey to success."
      }
    ],
    (feature) => {
      return `<div class="feature s-A-bC3Hke5zSn"><h2 class="s-A-bC3Hke5zSn">${escape(feature.title)}</h2> <p class="s-A-bC3Hke5zSn">${escape(feature.text)}</p> </div>`;
    }
  )}</div>  <div class="hero s-A-bC3Hke5zSn"><p class="s-A-bC3Hke5zSn" data-svelte-h="svelte-8giakk">Your journey to personal and professional growth starts here.</p></div></div>`;
});
export {
  Page as default
};
