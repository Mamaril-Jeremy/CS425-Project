import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { B as Button } from "../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../chunks/Input.js";
import "../../../../chunks/firebase.client.js";
import "firebase/auth";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body.svelte-19kiuuh{display:flex;flex-direction:column;align-items:center;height:100vh;justify-content:center}.title.svelte-19kiuuh{text-align:center;font-size:32px;font-weight:600;margin-bottom:60px}.form-container.svelte-19kiuuh{text-align:center;width:50%}.centered-button.svelte-19kiuuh{display:flex;justify-content:center;align-items:center;margin:auto}.confirmation-dialog.svelte-19kiuuh{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);background:white;padding:20px;border:1px solid #ccc;border-radius:8px;text-align:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let newPassword;
  let confirmNewPassword;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<body class="svelte-19kiuuh"><div class="title svelte-19kiuuh" data-svelte-h="svelte-867p2o">Update Your Password</div> <div class="form-container svelte-19kiuuh"><form><div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "email", class: "mb-2" }, {}, {
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
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "password", class: "mb-2" }, {}, {
      default: () => {
        return `New password`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "password",
        id: "password",
        placeholder: "•••••••••",
        required: true,
        value: newPassword
      },
      {
        value: ($$value) => {
          newPassword = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="mb-6">${validate_component(Label, "Label").$$render($$result, { for: "confirm_password", class: "mb-2" }, {}, {
      default: () => {
        return `Confirm new password`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "password",
        id: "confirm_password",
        placeholder: "•••••••••",
        required: true,
        value: confirmNewPassword
      },
      {
        value: ($$value) => {
          confirmNewPassword = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${``} ${``} ${``} <div class="centered-button svelte-19kiuuh">${validate_component(Button, "Button").$$render($$result, { type: "submit", color: "blue" }, {}, {
      default: () => {
        return `Submit`;
      }
    })}</div></form> ${``}</div> </body>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
