import { c as create_ssr_component, v as validate_component, j as escape } from "../../../chunks/ssr.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { a as auth, d as db } from "../../../chunks/firebase.client.js";
import { A as Avatar } from "../../../chunks/Avatar.js";
import { P as Pfp } from "../../../chunks/jeremy.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "a.svelte-1d345wq.svelte-1d345wq{color:black}body.svelte-1d345wq.svelte-1d345wq{margin:0;display:flex;justify-content:center;align-items:left;height:100vh}div.svelte-1d345wq>p.svelte-1d345wq{font-size:20px}.wrapper.svelte-1d345wq.svelte-1d345wq{display:flex;flex-direction:column;align-items:center}.user-info-container.svelte-1d345wq.svelte-1d345wq{background-color:white;padding:20px;border-radius:10px;box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);margin-top:100px}.material-symbols-outlined.svelte-1d345wq.svelte-1d345wq{font-size:15px;margin:10px auto}.main.svelte-1d345wq.svelte-1d345wq{position:relative;font-size:24px;margin-right:10px;top:5px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userUID, firstName, lastName, phoneNumber, occupation, role, major, city, country, state, connectsRemaining = 5, passesRemaining = 10;
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
      country = data.userCountry;
      state = data.userState;
    } else {
      console.log("No such document!");
    }
  };
  $$result.css.add(css);
  return `<body class="svelte-1d345wq"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"> <div class="wrapper svelte-1d345wq"><div class="user-info-container svelte-1d345wq"><div class="flex items-center space-x-10 text-xl"><div style="position: relative; display: inline-block;">${validate_component(Avatar, "Avatar").$$render(
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
  )} </div> <div class="space-y-1 font-medium dark:text-black"><div>${escape(firstName)} ${escape(lastName)}</div> <div class="text-sm text-gray-500 dark:text-gray-400" data-svelte-h="svelte-k9n678">Joined in December 2023</div> <div class="text-sm dark:text-black" data-svelte-h="svelte-7swbup"><span class="material-symbols-outlined svelte-1d345wq">edit</span><a href="/profile/edit-profile" class="svelte-1d345wq">Edit Profile</a></div></div></div></div> <div class="grid gap-8 mt-10 md:grid-cols-2"><div class="svelte-1d345wq"><p for="first_name" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-q15m8w">account_circle</span>Name: ${escape(firstName)} ${escape(lastName)}</p></div> <div class="svelte-1d345wq"><p for="company" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-uyrstb">work</span>Occupation: ${escape(occupation)}</p></div> <div class="svelte-1d345wq"><p for="phone" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-d67qog">phone</span>Phone number: ${escape(phoneNumber)}</p></div> <div class="svelte-1d345wq"><p for="role" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-bnyaav">supervised_user_circle</span>Role: ${escape(role)}</p></div> <div class="svelte-1d345wq"><p for="major" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-1k2hjm0">school</span>Major: ${escape(major)}</p></div> <div class="svelte-1d345wq"><p for="country" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-hy1zif">public</span>Country: ${escape(country)}</p></div> <div class="svelte-1d345wq"><p for="state" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-hssz62">flag</span>State: ${escape(state)}</p></div> <div class="svelte-1d345wq"><p for="city" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-7xyvpe">apartment</span>City: ${escape(city)}</p></div> <div class="svelte-1d345wq"><p for="visitors" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-8p3psv">person_add</span>Connects Remaining: ${escape(connectsRemaining)}</p></div> <div class="svelte-1d345wq"><p for="visitors" class="mb-2 text-l svelte-1d345wq"><span class="material-symbols-outlined main svelte-1d345wq" data-svelte-h="svelte-14r400m">person_remove</span>Passes Remaining: ${escape(passesRemaining)}</p></div></div></div> </body>`;
});
export {
  Page as default
};
