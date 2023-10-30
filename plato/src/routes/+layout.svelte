<script>
  import "../app.postcss";
  import { clicked } from '$lib/store.js';
  import NavbarIn from "../lib/components/NavbarIn.svelte";
  import NavbarOut from './../lib/components/NavbarOut.svelte';
  import Logo from '$lib/assets/plato_logo.png';
</script>

<svelte:head>
  <title>Plato</title>
  <link rel="icon" type="image/svg+xml" href={Logo} />
</svelte:head>

{#if $clicked}
  <NavbarIn />
{:else}
  <NavbarOut />
{/if}
<slot />
