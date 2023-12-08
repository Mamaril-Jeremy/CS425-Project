<script>
  import "../app.postcss";
  import NavbarIn from "../lib/components/NavbarIn.svelte";
  import NavbarOut from './../lib/components/NavbarOut.svelte';
  import Logo from '$lib/assets/plato_logo.png';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { auth } from '../lib/firebase/firebase.client';
  import { authStore } from '../stores/authStore';
  
  onMount(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          console.log(user)
          authStore.update((curr) => {
              return { ...curr, isLoading: false, currentUser: user };
          });
      });
  });
  
</script>

<svelte:head>
  <title>Plato</title>
  <link rel="icon" type="image/svg+xml" href={Logo} />
</svelte:head>

{#if $authStore.isLoading}
  <p>Loading...</p>
{:else}
  {#if $authStore.currentUser}
    <NavbarIn />
    <slot />
  {:else}
    <NavbarOut />
    <slot />
  {/if}
{/if}

