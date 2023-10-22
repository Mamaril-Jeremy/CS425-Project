import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
const Card_svelte_svelte_type_style_lang = "";
const css = {
  code: "body.s-26GQofvqM1w4{display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.container.s-26GQofvqM1w4{width:450px;height:300px;position:relative}.quadrant.s-26GQofvqM1w4{width:50%;height:50%;position:absolute;border:solid}.quadrant.s-26GQofvqM1w4:nth-child(1){top:0;left:0;border:solid}.quadrant.s-26GQofvqM1w4:nth-child(2){top:0;left:50%;border:solid}.quadrant.s-26GQofvqM1w4:nth-child(3){top:50%;left:0;border:solid}.quadrant.s-26GQofvqM1w4:nth-child(4){top:50%;left:50%}",
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<body class="s-26GQofvqM1w4"><div class="container s-26GQofvqM1w4"><div class="quadrant s-26GQofvqM1w4"></div> <div class="quadrant s-26GQofvqM1w4"></div> <div class="quadrant s-26GQofvqM1w4"></div> <div class="quadrant s-26GQofvqM1w4"></div></div> </body>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
