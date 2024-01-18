<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
    import Logo from "$lib/assets/plato_logo.png";

    let navbar;
    // let lastScrollTop = 0;

    // window.addEventListener('scroll', () => {
    //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //     if (scrollTop > lastScrollTop) {
    //         navbar.style.top = `-${navbar.offsetHeight}px`;
    //     } else {
    //         navbar.style.top = '0';
    //     }
    //     lastScrollTop = scrollTop;
    // });

    
</script>
  
<div class="navbar-container" bind:this={navbar}>
    <Navbar let:hidden let:toggle>
        <NavBrand href="/home">
            <img src={Logo} class="mr-3 w-10 first-line:sm:w-16" alt="Plato Logo" />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Plato</span>
        </NavBrand>
        <div class="flex md:order-2">
            <Button color="blue" href="/sign-in" class="text-base">Sign In</Button>
            <NavHamburger on:click={toggle} />
        </div>
        <NavUl {hidden} class="order-1">
            <NavLi href="/home"><span class="hover-blue-600 text-xl">Home</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600 text-xl">Chat</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600 text-xl">Connections</span></NavLi>
            <NavLi href="/sign-in"><span class="hover:text-blue-600 text-xl">Events</span></NavLi>
            <NavLi href="/about"><span class="hover:text-blue-600 text-xl">About</span></NavLi>
        </NavUl>
    </Navbar>
</div> 

<style>
    .navbar-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000; 
        width: 100%;
        top: 0;
        transition: top 0.3s;
        height: 45px;
    }
</style>
