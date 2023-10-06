<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';
  </script>
  
  <div class="navbar-container">
  <Navbar>
    <NavBrand href="/home">
      <img src="src/assets/plato_logo.png" class="mr-3 w-10 first-line:sm:w-16" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"><span class="plato">Plato</span></span>
    </NavBrand>
    <div class="flex items-center md:order-2">
      <Avatar id="avatar-menu" src="src/routes/profile/Mark Marsala.jpg" />
      <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
      <DropdownHeader>
        <span class="block text-sm">Mark Marsala</span>
        <span class="block truncate text-sm font-medium">markymark@nevada.unr.edu</span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/">Sign out</DropdownItem>
    </Dropdown>
    <NavUl>
      <NavLi href="/home"><span class="hover:text-blue-600">Home</span></NavLi>
      <NavLi href="/chat"><span class="hover:text-blue-600">Chat</span></NavLi>
      <NavLi href="/connections"><span class="hover:text-blue-600">Connections</span></NavLi>
      <NavLi href="/events"><span class="hover:text-blue-600">Events</span></NavLi>
      <NavLi href="/profile"><span class="hover:text-blue-600">Profile</span></NavLi>
      <NavLi href="/about-in"><span class="hover:text-blue-600">About</span></NavLi>
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
    .plato{
        background: linear-gradient(rgb(80, 101, 168), rgb(78, 99, 166));;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
</style>