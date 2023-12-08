<script>
  import {onMount, onDestroy} from 'svelte';
  import { authHandlers } from "../../stores/authStore.js";
  import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    NavBrand,
    NavHamburger,
    NavLi,
    Navbar,
    NavUl
  } from 'flowbite-svelte';
  import { collection, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { goto } from '$app/navigation';
  import Logo from '$lib/assets/plato_logo.png';
  import Pfp from '$lib/assets/Mark Marsala.jpg';

  async function handleClick() {
    try {
      await authHandlers.logout();
      goto('/home');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }

  const pClicked = async () => {
    goto('/profile');
  };

  const sClicked = async () => {
    goto('/settings');
  };

  let userUID, firstName, lastName, email;

  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        userUID = user.uid;
        fetchData();
      }
    });
  });

  const fetchData = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("userID", "==", userUID));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      firstName = data.userFirstName;
      lastName = data.userLastName;
      email = data.userEmail;
      userUID = data.userID;
    } else {
      console.log('No such document!');
    }
  };
</script>
  
  <div class="navbar-container">
  <Navbar>
    <NavBrand href="/home">
      <img src={Logo} class="mr-3 w-14 first-line:sm:w-16" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"><span class="plato">Plato</span></span>
    </NavBrand>
    <div class="flex items-center md:order-2">
      <Avatar id="avatar-menu" src={Pfp} />
      <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
      <DropdownHeader>
        {#if firstName && lastName}
          <span class="block text-sm">{firstName} {lastName}</span>
        {/if}
        <span class="block truncate text-sm font-medium">{email}</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem on:click={sClicked}>Settings</DropdownItem>
      <DropdownItem on:click={pClicked}>Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem on:click={handleClick}><span class="text-blue-600">Sign out</span></DropdownItem>
    </Dropdown>
    <NavUl>
      <NavLi href="/home"><span class="hover:text-blue-600 text-base">Home</span></NavLi>
      <NavLi href="/chat"><span class="hover:text-blue-600 text-base">Chat</span></NavLi>
      <NavLi href="/connections"><span class="hover:text-blue-600 text-base">Connections</span></NavLi>
      <NavLi href="/events"><span class="hover:text-blue-600 text-base">Events</span></NavLi>
      <NavLi href="/about"><span class="hover:text-blue-600 text-base">About</span></NavLi>
    </NavUl>
  </Navbar>
</div>

<style>
    .navbar-container {
        position: fixed;
        top: 17px;
        left: 0;
        right: 0;
        z-index: 1000; 
        display: flex;
        justify-content: space-between; 
        align-items: center;
        height: 30px;
    }
    .plato{
        background: linear-gradient(rgb(80, 101, 168), rgb(78, 99, 166));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: large;
    }
</style>