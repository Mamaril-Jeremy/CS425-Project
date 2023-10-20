import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, f as add_attribute, i as getContext, v as validate_component, l as escape, h as compute_slots } from "../../../chunks/ssr.js";
import { P as Pfp, A as Avatar } from "../../../chunks/Mark Marsala.js";
import { G as GradientButton } from "../../../chunks/GradientButton.js";
import { twMerge } from "tailwind-merge";
import { W as Wrapper } from "../../../chunks/Wrapper.js";
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelClass;
  let $$restProps = compute_rest_props($$props, ["color", "defaultClass", "show"]);
  let { color = "gray" } = $$props;
  let { defaultClass = "text-sm font-medium block" } = $$props;
  let { show = true } = $$props;
  let node;
  const colorClasses = {
    gray: "text-gray-900 dark:text-gray-300",
    green: "text-green-700 dark:text-green-500",
    red: "text-red-700 dark:text-red-500",
    disabled: "text-gray-400 dark:text-gray-500"
  };
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  {
    {
      color = color;
    }
  }
  labelClass = twMerge(defaultClass, colorClasses[color], $$props.class);
  return `${show ? ` <label${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(labelClass)
      }
    ],
    {}
  )}${add_attribute("this", node, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${slots.default ? slots.default({}) : ``}`} `;
});
function clampSize(s) {
  return s && s === "xs" ? "sm" : s === "xl" ? "lg" : s;
}
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _size;
  let $$restProps = compute_rest_props($$props, ["type", "value", "size", "defaultClass", "color", "floatClass"]);
  let $$slots = compute_slots(slots);
  let { type = "text" } = $$props;
  let { value = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { defaultClass = "block w-full disabled:cursor-not-allowed disabled:opacity-50" } = $$props;
  let { color = "base" } = $$props;
  let { floatClass = "flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400" } = $$props;
  const borderClasses = {
    base: "border-gray-300 dark:border-gray-600",
    tinted: "border-gray-300 dark:border-gray-500",
    green: "border-green-500 dark:border-green-400",
    red: "border-red-500 dark:border-red-400"
  };
  const ringClasses = {
    base: "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500",
    green: "focus:ring-green-500 focus:border-green-500 dark:focus:border-green-500 dark:focus:ring-green-500",
    red: "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
  };
  const colorClasses = {
    base: "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
    tinted: "bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400",
    green: "bg-green-50 text-green-900 placeholder-green-700 dark:text-green-400 dark:placeholder-green-500 dark:bg-gray-700",
    red: "bg-red-50 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500 dark:bg-gray-700"
  };
  let background = getContext("background");
  let group = getContext("group");
  const textSizes = {
    sm: "sm:text-xs",
    md: "text-sm",
    lg: "sm:text-base"
  };
  const leftPadding = { sm: "pl-9", md: "pl-10", lg: "pl-11" };
  const rightPadding = { sm: "pr-9", md: "pr-10", lg: "pr-11" };
  const inputPadding = { sm: "p-2", md: "p-2.5", lg: "p-3" };
  let inputClass;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.floatClass === void 0 && $$bindings.floatClass && floatClass !== void 0)
    $$bindings.floatClass(floatClass);
  _size = size || clampSize(group?.size) || "md";
  {
    {
      const _color = color === "base" && background ? "tinted" : color;
      inputClass = twMerge([
        defaultClass,
        $$slots.left && leftPadding[_size] || $$slots.right && rightPadding[_size] || inputPadding[_size],
        ringClasses[color],
        colorClasses[_color],
        borderClasses[_color],
        textSizes[_size],
        group || "rounded-lg",
        group && "first:rounded-l-lg last:rounded-r-lg",
        group && "border-l-0 first:border-l last:border-r",
        $$props.class
      ]);
    }
  }
  return `${validate_component(Wrapper, "Wrapper").$$render(
    $$result,
    {
      class: "relative w-full",
      show: $$slots.left || $$slots.right
    },
    {},
    {
      default: () => {
        return `${$$slots.left ? `<div class="${escape(twMerge(floatClass, $$props.classLeft), true) + " left-0 pl-2.5 pointer-events-none"}">${slots.left ? slots.left({}) : ``}</div>` : ``} ${slots.default ? slots.default({
          props: { ...$$restProps, class: inputClass }
        }) : ` <input${spread(
          [
            escape_object($$restProps),
            escape_object({ type }),
            {
              class: escape_attribute_value(inputClass)
            }
          ],
          {}
        )}${add_attribute("value", value, 0)}> `} ${$$slots.right ? `<div class="${escape(twMerge(floatClass, $$props.classRight), true) + " right-0 pr-2.5"}">${slots.right ? slots.right({}) : ``}</div>` : ``}`;
      }
    }
  )} `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex items-center space-x-10 mt-12">${validate_component(Avatar, "Avatar").$$render(
    $$result,
    {
      src: Pfp,
      "data-name": "Mark Marsala",
      border: true,
      class: "ring-blue-600 dark:ring-blue-300",
      size: "lg",
      dot: {
        placement: "top-right",
        color: "green",
        size: "lg"
      }
    },
    {},
    {}
  )} <div class="space-y-1 font-medium dark:text-white"><div data-svelte-h="svelte-12i1jlu">Mark Marsala</div> <div class="text-sm text-gray-500 dark:text-gray-400" data-svelte-h="svelte-17ve2fu">Joined in September 2023</div></div></div> <form><div class="grid gap-6 mb-6 md:grid-cols-2 mt-6"><div>${validate_component(Label, "Label").$$render($$result, { for: "first_name", class: "mb-2" }, {}, {
    default: () => {
      return `First name`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "text",
      id: "first_name",
      placeholder: "First",
      required: true
    },
    {},
    {}
  )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "last_name", class: "mb-2" }, {}, {
    default: () => {
      return `Last name`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "text",
      id: "last_name",
      placeholder: "Last",
      required: true
    },
    {},
    {}
  )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "company", class: "mb-2" }, {}, {
    default: () => {
      return `Company`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "text",
      id: "company",
      placeholder: "Plato",
      required: true
    },
    {},
    {}
  )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "phone", class: "mb-2" }, {}, {
    default: () => {
      return `Phone number`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "tel",
      id: "phone",
      placeholder: "123-45-678",
      pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}",
      required: true
    },
    {},
    {}
  )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "website", class: "mb-2" }, {}, {
    default: () => {
      return `Website URL`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "url",
      id: "website",
      placeholder: "plato.com",
      required: true
    },
    {},
    {}
  )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "visitors", class: "mb-2" }, {}, {
    default: () => {
      return `Unique visitors (per month)`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "number",
      id: "visitors",
      placeholder: "",
      required: true
    },
    {},
    {}
  )}</div></div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "email", class: "mb-2" }, {}, {
    default: () => {
      return `Email address`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "email",
      id: "email",
      placeholder: "first.last@company.com",
      required: true
    },
    {},
    {}
  )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "password", class: "mb-2" }, {}, {
    default: () => {
      return `Password`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "password",
      id: "password",
      placeholder: "•••••••••",
      required: true
    },
    {},
    {}
  )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "confirm_password", class: "mb-2" }, {}, {
    default: () => {
      return `Confirm password`;
    }
  })} ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "password",
      id: "confirm_password",
      placeholder: "•••••••••",
      required: true
    },
    {},
    {}
  )}</div>    ${validate_component(GradientButton, "GradientButton").$$render($$result, { type: "submit", color: "purpleToBlue" }, {}, {
    default: () => {
      return `Submit`;
    }
  })}</form>`;
});
export {
  Page as default
};
