import { c as create_ssr_component, v as validate_component, j as escape, l as each, b as add_attribute } from "../../../../chunks/ssr.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { a as auth, d as db } from "../../../../chunks/firebase.client.js";
import { A as Avatar } from "../../../../chunks/Avatar.js";
import { B as Button } from "../../../../chunks/Button.js";
import { L as Label, I as Input } from "../../../../chunks/Input.js";
import { P as Pfp } from "../../../../chunks/jeremy.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".wrapper.svelte-lib3bd{display:flex;flex-direction:column;align-items:center}.user-info-container.svelte-lib3bd{background-color:white;padding:20px;border-radius:10px;box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);margin-top:150px}.success.svelte-lib3bd{margin:25px auto;font-size:20px;color:rgb(113, 174, 21);text-align:center}.form-container.svelte-lib3bd{margin-top:50px}.centered-button.svelte-lib3bd{display:flex;justify-content:center;align-items:center;margin:25px auto}.constants.svelte-lib3bd{display:flex;margin:25px auto;font-size:20px}body.svelte-lib3bd{margin:0;display:flex;justify-content:center;align-items:center;height:100vh}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userUID, firstName, lastName, phoneNumber, occupation, role, major, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localPhoneNumber, localOccupation, localRole, localMajor;
  let countries = [], states = [], cities = [];
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
      fetchData();
    }
  });
  const fetchData = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("userID", "==", userUID));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      {
        firstName = data.userFirstName;
        lastName = data.userLastName;
        occupation = data.userOccupation;
        role = data.userRole;
        connectsRemaining = data.userConnectsRemaining;
        phoneNumber = data.userPhoneNumber;
        passesRemaining = data.userPassesRemaining;
        userUID = data.userID;
        major = data.userMajor;
        city = data.userCity;
        state = data.userState;
        data.userCountry;
      }
    } else {
      console.log("No such document!");
    }
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<body class="svelte-lib3bd"><div class="wrapper svelte-lib3bd"><div class="user-info-container svelte-lib3bd"><div class="flex items-center space-x-10 text-xl">${validate_component(Avatar, "Avatar").$$render(
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
    )} <div class="space-y-1 font-medium dark:text-black"><div>${escape(firstName)} ${escape(lastName)}</div> <div class="text-sm text-gray-500 dark:text-gray-400" data-svelte-h="svelte-k9n678">Joined in December 2023</div></div></div></div> ${``} <div class="form-container svelte-lib3bd"><form><div class="grid gap-6 mb-6 md:grid-cols-2"><div>${validate_component(Label, "Label").$$render($$result, { for: "first_name", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `First name: ${escape(firstName)}`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "first_name",
        placeholder: "First",
        required: true,
        value: localFirstName
      },
      {
        value: ($$value) => {
          localFirstName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "last_name", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Last name: ${escape(lastName)}`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "last_name",
        placeholder: "Last",
        required: true,
        value: localLastName
      },
      {
        value: ($$value) => {
          localLastName = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "company", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Occupation: ${escape(occupation)}`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "company",
        placeholder: "Tutor",
        required: true,
        value: localOccupation
      },
      {
        value: ($$value) => {
          localOccupation = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "phone", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Phone number: ${escape(phoneNumber)}`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "tel",
        id: "phone",
        placeholder: "123-456-7890",
        title: "Please enter a valid phone number (e.g., 123-456-7890)",
        required: true,
        value: localPhoneNumber
      },
      {
        value: ($$value) => {
          localPhoneNumber = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "role", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Role: ${escape(role)}`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "role",
        placeholder: "Mentor/Mentee",
        required: true,
        value: localRole
      },
      {
        value: ($$value) => {
          localRole = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div>${validate_component(Label, "Label").$$render($$result, { for: "major", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Major: ${escape(major)}`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        type: "text",
        id: "major",
        placeholder: "Engineering",
        required: true,
        value: localMajor
      },
      {
        value: ($$value) => {
          localMajor = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div><select class="text-gray-900 bg-gray-50"><option value="" data-svelte-h="svelte-ucx3s">Select Country</option>${each(countries, (country) => {
      return `<option${add_attribute("value", country.iso2, 0)}${add_attribute("key", country.iso2, 0)}>${escape(country.name)}</option>`;
    })}</select></div> <div><select class="text-gray-900 bg-gray-50"${add_attribute("if", states.length, 0)}><option value="" data-svelte-h="svelte-97c5nx">Select State</option>${each(states, (state2) => {
      return `<option${add_attribute("value", state2.iso2, 0)}${add_attribute("key", state2.id, 0)}>${escape(state2.name)}</option>`;
    })}</select> <select class="text-gray-900 bg-gray-50"${add_attribute("if", cities.length, 0)}><option value="" data-svelte-h="svelte-1xm49tr">Select City</option>${each(cities, (city2) => {
      return `<option${add_attribute("value", city2.name, 0)}${add_attribute("key", city2.id, 0)}>${escape(city2.name)}</option>`;
    })}</select></div> <div>${validate_component(Label, "Label").$$render($$result, { for: "visitors", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Connects Remaining`;
      }
    })} <div class="constants svelte-lib3bd">${escape(connectsRemaining)}</div></div> <div>${validate_component(Label, "Label").$$render($$result, { for: "visitors", class: "mb-2 text-l" }, {}, {
      default: () => {
        return `Passes Remaining`;
      }
    })} <div class="constants svelte-lib3bd">${escape(passesRemaining)}</div></div></div> <div class="centered-button svelte-lib3bd">${validate_component(Button, "Button").$$render($$result, { type: "submit", color: "blue" }, {}, {
      default: () => {
        return `Update`;
      }
    })}</div></form></div></div></body>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
