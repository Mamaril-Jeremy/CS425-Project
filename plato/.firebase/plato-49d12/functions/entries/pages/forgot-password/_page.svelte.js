import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../chunks/Input.js";
import "../../../chunks/firebase.client.js";
import "firebase/auth";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body.svelte-iho3j3{display:flex;flex-direction:column;align-items:center;height:100vh;justify-content:center}.title.svelte-iho3j3{text-align:center;font-size:32px;font-weight:600;margin-bottom:60px}.form-container.svelte-iho3j3{text-align:center;width:50%}.centered-button.svelte-iho3j3{display:flex;justify-content:center;align-items:center;margin-top:16px}.confirmation-dialog.svelte-iho3j3{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background:white;padding:20px;border:1px solid #ccc;border-radius:8px;text-align:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formData = { resetEmail: "" };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<body class="svelte-iho3j3"><div class="title svelte-iho3j3" data-svelte-h="svelte-cc3k4t">Password Reset</div> <div class="form-container svelte-iho3j3"><form><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "email", class: "mb-2" }, {}, {
      default: () => {
        return `Email address`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "email",
        id: "email",
        placeholder: "first.last@company.com",
        required: true,
        value: formData.resetEmail
      },
      {
        value: ($$value) => {
          formData.resetEmail = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="centered-button svelte-iho3j3">${validate_component(Button, "Button").$$render($$result, { type: "submit", color: "blue" }, {}, {
      default: () => {
        return `Submit`;
      }
    })}</div></form></div> ${``} </body>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
