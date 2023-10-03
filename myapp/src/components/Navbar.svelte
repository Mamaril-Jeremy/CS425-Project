<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, GradientButton } from 'flowbite-svelte';
  </script>
  

<div class="navbar-container">
<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img src="/images/flowbite-svelte-icon-logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Plato</span>
    </NavBrand>
    <div class="flex md:order-2">
        <GradientButton color="blue" href="/sign-in">Sign In</GradientButton>
        <NavHamburger on:click={toggle} />
    </div>
    <NavUl {hidden} class="order-1">
        <NavLi href="/home"><span class="hover:text-blue-600">Home</span></NavLi>
        <NavLi href="/chat"><span class="hover:text-blue-600">Chat</span></NavLi>
        <NavLi href="/connections"><span class="hover:text-blue-600">Connections</span></NavLi>
        <NavLi href="/events"><span class="hover:text-blue-600">Events</span></NavLi>
        <NavLi href="/profile"><span class="hover:text-blue-600">Profile</span></NavLi>
        <NavLi href="/about"><span class="hover:text-blue-600">About</span></NavLi>
    </NavUl>
    </Navbar>
</div> 

<style>
    /* Apply CSS styles to make Navbar stick to the top */
    .navbar-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000; /* You can adjust the z-index as needed */
    }
</style>



  