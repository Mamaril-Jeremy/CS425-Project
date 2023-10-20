<script>
  import "../app.postcss";
  import NavbarIn from "$lib/components/NavbarIn.svelte";
  // import Logo from '$lib/assets/plato_logo.png';
</script>

<!-- <svelte:head>
      <title>Plato</title>
      <link rel="icon" href={Logo} />
</svelte:head> -->

<NavbarIn/>
<slot />
