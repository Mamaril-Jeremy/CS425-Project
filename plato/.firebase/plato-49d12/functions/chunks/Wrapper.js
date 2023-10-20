import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object } from "./ssr.js";
import { v as validate_dynamic_element, a as validate_void_dynamic_element, i as is_void } from "./dev.js";
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
  let { tag = "div" } = $$props;
  let { show } = $$props;
  let { use = () => {
  } } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${show ? `${((tag$1) => {
    validate_dynamic_element(tag$1);
    return tag$1 ? (() => {
      validate_void_dynamic_element(tag$1);
      return `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}`;
    })() : "";
  })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
});
export {
  Wrapper as W
};
