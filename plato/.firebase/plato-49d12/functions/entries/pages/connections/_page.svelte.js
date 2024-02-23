import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { onAuthStateChanged } from "firebase/auth";
import "firebase/firestore";
import { a as auth } from "../../../chunks/firebase.client.js";
const Card_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.card.svelte-q6v2oz.svelte-q6v2oz{width:600px;height:400px;background-color:#ffffff;border:2px solid #ccc;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;position:relative;box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);border-radius:20px}.name.svelte-q6v2oz.svelte-q6v2oz{width:100%;text-align:center;font-size:24px;padding:20px 0;background-color:#333;color:#fff;order:2;border-bottom-left-radius:10px;border-bottom-right-radius:10px;user-select:text}.section.svelte-q6v2oz.svelte-q6v2oz{width:50%;height:40%;box-sizing:border-box;border:1px solid #ccc;display:flex;justify-content:center;align-items:center;background-color:#f0f0f0;transition:background-color 0.3s, color 0.3s;user-select:none;position:relative}.section.svelte-q6v2oz.svelte-q6v2oz:hover{background-color:rgb(44, 102, 244)}.section.svelte-q6v2oz a.svelte-q6v2oz{text-decoration:none;font-size:18px;font-weight:600;color:rgb(51, 51, 51);outline:none;transition:background-color 0.3s, color 0.3s;display:block;padding:10px;text-align:center}.section.svelte-q6v2oz:hover a.svelte-q6v2oz{background-color:rgb(44, 102, 244)}.circle.svelte-q6v2oz.svelte-q6v2oz{width:27.5%;height:40%;border:2px solid #ccc;border-radius:70%;background-image:url("$lib/assets/jeremy.png");background-position:center;position:absolute;top:42.5%;left:50%;transform:translate(-50%, -50%);z-index:2}',
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="card svelte-q6v2oz" data-svelte-h="svelte-awwvz2"><div class="section svelte-q6v2oz"><a href="/" class="svelte-q6v2oz"><span>Resume</span></a></div> <div class="section svelte-q6v2oz"><a href="/" class="svelte-q6v2oz"><span>Interests</span></a></div> <div class="section svelte-q6v2oz"><a href="/" class="svelte-q6v2oz"><span>Info</span></a></div> <div class="section svelte-q6v2oz"><a href="/" class="svelte-q6v2oz"><span>Hours</span></a></div> <div class="name svelte-q6v2oz">Jeremy Mamaril</div> <div class="circle svelte-q6v2oz"></div></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-13vf2f4{display:flex;align-items:center;justify-content:center;height:100vh;margin-left:auto;margin-right:auto}.pass.svelte-13vf2f4{text-align:center;padding-right:10px}.connect.svelte-13vf2f4{text-align:center;padding-left:10px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.uid;
    }
  });
  $$result.css.add(css);
  return `<div class="container svelte-13vf2f4"><div class="pass svelte-13vf2f4">${validate_component(Button, "Button").$$render($$result, { color: "red", class: "tinder-button" }, {}, {
    default: () => {
      return `Pass`;
    }
  })}</div> ${validate_component(Card, "Card").$$render($$result, {}, {}, {})} <div class="connect svelte-13vf2f4">${validate_component(Button, "Button").$$render($$result, { color: "green", class: "tinder-button" }, {}, {
    default: () => {
      return `Connect`;
    }
  })}</div> </div>`;
});
export {
  Page as default
};
