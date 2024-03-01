import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../chunks/Input.js";
import "../../../../chunks/firebase.client.js";
import "firebase/auth";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body.svelte-s3xs3h{display:flex;flex-direction:column;align-items:center;height:100vh;justify-content:center}.title.svelte-s3xs3h{text-align:center;font-size:32px;font-weight:600;margin-bottom:60px}.form-container.svelte-s3xs3h{text-align:center;width:50%}.centered-button.svelte-s3xs3h{display:flex;justify-content:center;align-items:center;margin-top:16px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formData = { newEmail: "", password: "" };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<body class="svelte-s3xs3h"><div class="title svelte-s3xs3h" data-svelte-h="svelte-qrj1d5">Update Your Email</div> <div class="form-container svelte-s3xs3h"><form><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "email", class: "mb-2" }, {}, {
      default: () => {
        return `New email address`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "email",
        id: "email",
        placeholder: "first.last@company.com",
        required: true,
        value: formData.newEmail
      },
      {
        value: ($$value) => {
          formData.newEmail = $$value;
          $$settled = false;
        }
      },
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
        required: true,
        value: formData.password
      },
      {
        value: ($$value) => {
          formData.password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="centered-button svelte-s3xs3h">${validate_component(Button, "Button").$$render($$result, { type: "submit", color: "blue" }, {}, {
      default: () => {
        return `Submit`;
      }
    })}</div></form></div> </body>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
