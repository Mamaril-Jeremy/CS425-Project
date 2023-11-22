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
<!-- <script>
  import { onMount } from 'svelte'
  import { auth } from '../lib/firebase/firebase.client.js'
  import { authStore } from '../stores/authStore.js'
  onMount(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          console.log(user)
          authStore.update((curr) => {
              return { ...curr, isLoading: false, currentUser: user };
          });
      });
  });
</script> -->
<!-- <slot/> -->
