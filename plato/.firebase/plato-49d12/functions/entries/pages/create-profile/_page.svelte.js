import { c as create_ssr_component, v as validate_component, l as each, b as add_attribute, j as escape } from "../../../chunks/ssr.js";
import "firebase/firestore";
import { L as Label, I as Input } from "../../../chunks/Input.js";
import { onAuthStateChanged } from "firebase/auth";
import { a as auth } from "../../../chunks/firebase.client.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1wrlyfy{display:flex;align-items:center;justify-content:center}section.svelte-1wrlyfy{background:white}button.svelte-1wrlyfy{cursor:pointer}a.svelte-1wrlyfy{margin-left:70px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let firstName, lastName, phoneNumber, occupation, role, major;
  let countries = [], states = [], cities = [];
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.uid;
      user.email;
    }
  });
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<main class="flex items-center mt-10 justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen svelte-1wrlyfy"><section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full svelte-1wrlyfy"><h1 class="text-3xl font-semibold mb-6" data-svelte-h="svelte-1nv23vh">Create Your Profile</h1> <form><div class="grid gap-6 mb-6 md:grid-cols-2"><div>${validate_component(Label, "Label").$$render($$result, { for: "first_name", class: "mb-2" }, {}, {
      default: () => {
        return `First name`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "first_name",
        placeholder: "First",
        required: true,
        value: firstName
      },
      {
        value: ($$value) => {
          firstName = $$value;
          $$settled = false;
        }
      },
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
        required: true,
        value: lastName
      },
      {
        value: ($$value) => {
          lastName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "company", class: "mb-2" }, {}, {
      default: () => {
        return `Occupation`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "company",
        placeholder: "Tutor",
        required: true,
        value: occupation
      },
      {
        value: ($$value) => {
          occupation = $$value;
          $$settled = false;
        }
      },
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
        placeholder: "123-456-7890",
        required: true,
        value: phoneNumber
      },
      {
        value: ($$value) => {
          phoneNumber = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "role", class: "mb-2" }, {}, {
      default: () => {
        return `Role`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "role",
        placeholder: "Mentor/Mentee",
        required: true,
        value: role
      },
      {
        value: ($$value) => {
          role = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "major", class: "mb-2" }, {}, {
      default: () => {
        return `Major`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "major",
        placeholder: "Engineering",
        required: true,
        value: major
      },
      {
        value: ($$value) => {
          major = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div><select class="text-gray-900 bg-gray-50 mb-5"><option value="" data-svelte-h="svelte-ucx3s">Select Country</option>${each(countries, (country) => {
      return `<option${add_attribute("value", country.iso2, 0)}${add_attribute("key", country.iso2, 0)}>${escape(country.name)}</option>`;
    })}</select> <select class="text-gray-900 bg-gray-50 mb-5"${add_attribute("if", states.length, 0)}><option value="" data-svelte-h="svelte-97c5nx">Select State</option>${each(states, (state) => {
      return `<option${add_attribute("value", state.iso2, 0)}${add_attribute("key", state.id, 0)}>${escape(state.name)}</option>`;
    })}</select> <select class="text-gray-900 bg-gray-50 mb-5"${add_attribute("if", cities.length, 0)}><option value="" data-svelte-h="svelte-1xm49tr">Select City</option>${each(cities, (city) => {
      return `<option${add_attribute("value", city.name, 0)}${add_attribute("key", city.id, 0)}>${escape(city.name)}</option>`;
    })}</select></div></div> <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 svelte-1wrlyfy" data-svelte-h="svelte-7fawmd">Create Account</button> <div class="mt-6" data-svelte-h="svelte-1k2ch4w">Already have an account? <a href="/sign-in" class="svelte-1wrlyfy">Sign In</a> Instead!</div></form></section></main>  ${``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
