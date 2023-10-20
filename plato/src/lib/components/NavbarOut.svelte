<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, GradientButton } from 'flowbite-svelte';
    import Logo from "$lib/assets/plato_logo.png";

    let lastScrollTop = 0;
    let navbar;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.style.top = `-${navbar.offsetHeight}px`;
        } else {
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });
</script>
  
<div class="navbar-container" bind:this={navbar}>
    <Navbar let:hidden let:toggle>
        <NavBrand href="/home">
            <img src={Logo} class="mr-3 w-10 first-line:sm:w-16" alt="Plato Logo" />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Plato</span>
        </NavBrand>
        <div class="flex md:order-2">
            <GradientButton color="blue" href="/sign-in">Sign In</GradientButton>
            <NavHamburger on:click={toggle} />
        </div>
        <NavUl {hidden} class="order-1">
            <NavLi href="/home"><span class="hover:text-blue-600">Home</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600">Chat</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600">Connections</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600">Events</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600">Profile</span></NavLi>
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
        width: 100%;
        top: 0;
        transition: top 0.3s;
    }
</style>
