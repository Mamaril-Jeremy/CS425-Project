<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
    import { clicked } from '$lib/store.js';
    import { goto } from '$app/navigation';
    import Logo from "$lib/assets/plato_logo.png";
    import Pfp from "$lib/assets/Mark Marsala.jpg";
    

    function handleClick() {
      clicked.set(false);
    }
    const pClicked = async (event) => {
      goto('/profile');
    }
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
        <span class="block text-sm">Mark Marsala</span>
        <span class="block truncate text-sm font-medium">markymark@nevada.unr.edu</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem on:click={pClicked}>Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/home" on:click={handleClick}>Sign out</DropdownItem>
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
        background: linear-gradient(rgb(80, 101, 168), rgb(78, 99, 166));;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-size: large;
    }
</style>