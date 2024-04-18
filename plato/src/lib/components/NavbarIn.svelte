<script>
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
  import { goto } from '$app/navigation';
  import { collection, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import Logo from '$lib/assets/plato_logo.png';
  import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
  
  let userUID;
  let firstName, lastName, userEmail;
  let avatarUrl;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
      userEmail = user.email;
      fetchData(); 
      downloadAvatar(userUID)
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
      userUID = data.userID;
    } else {
      console.log('No such document!');
    }
  };

  const downloadAvatar = async (userUID) => {
    try {
        const storage = getStorage();
        const listRef = ref(storage, `images/${userUID}`);

        const items = (await listAll(listRef)).items;

        items.sort((a, b) => b.timeCreated - a.timeCreated);

        const latestImageRef = items[items.length-1];

        const url = await getDownloadURL(latestImageRef);
        
        avatarUrl = url;
    } catch (error) {
        console.error('Error downloading avatar:', error);
    }
  };

  async function handleClick() {
    try {
      await authHandlers.logout();
      goto('/home');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }
</script>
  
<div class="navbar-container">
  <Navbar>
    <NavBrand href="/home">
      <img src={Logo} class="mr-3 w-14 first-line:sm:w-16" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap font-semibolddark:text-white"><span class="plato">Plato</span></span>
    </NavBrand>
    <div class="flex items-center md:order-2">
      {#if avatarUrl}
        <Avatar id="avatar-menu" class="h-13 w-11" src={avatarUrl} />
      {/if}
      <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
    </div>
    {#if avatarUrl}
      <Dropdown placement="bottom" triggeredBy="#avatar-menu">
        <DropdownHeader>
          {#if firstName && lastName}
            <span class="block text-sm">{firstName} {lastName}</span>
          {/if}
          <span class="block truncate text-sm font-medium">{userEmail}</span>
        </DropdownHeader>
        <DropdownItem href="/settings" class="text-black">Settings</DropdownItem>
        <DropdownItem href="/profile" class="text-black">Profile</DropdownItem>
        <DropdownDivider />
        <DropdownItem on:click={handleClick}><span class="text-blue-600">Sign out</span></DropdownItem>
      </Dropdown>
    {/if}
    <NavUl>
      <NavLi href="/home"><span class="hover:text-blue-600 text-lg">Home</span></NavLi>
      <NavLi href="/chat"><span class="hover:text-blue-600 text-lg">Chat</span></NavLi>
      <NavLi href="/connections"><span class="hover:text-blue-600 text-lg">Connections</span></NavLi>
      <NavLi href="/events"><span class="hover:text-blue-600 text-lg">Events</span></NavLi>
      <NavLi href="/about"><span class="hover:text-blue-600 text-lg">About</span></NavLi>
    </NavUl>
  </Navbar>
</div>

<style>
  
  .navbar-container {
      position: fixed;
      top: 17px;
      left: 0;
      right: 0;
      z-index: 1000000; 
      display: flex;
      justify-content: space-between; 
      align-items: center;
      height: 40px;
  }
  .plato{
      background: linear-gradient(rgb(80, 101, 168), rgb(78, 99, 166));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-size: x-large;
  }
</style>