<script>
  import NavbarIn from "../lib/components/NavbarIn.svelte";
  import "../app.postcss";
  import Logo from '$lib/assets/plato_logo.png';
</script>

<svelte:head>
  <title>Plato</title>
  <link rel="icon" type="image/svg+xml" href={Logo} />
</svelte:head>

<NavbarIn/>
<slot />
