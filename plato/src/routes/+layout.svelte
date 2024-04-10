<script>
  //This code is developed by Jeremy Mamaril
  import "../app.postcss";
  import { onMount } from 'svelte';
  import { auth } from '$lib/firebase/firebase.client';
  import { authStore } from '../stores/authStore';
  import NavbarIn from "$lib/components/NavbarIn.svelte";
  import NavbarOut from '$lib/components/NavbarOut.svelte';
  import Logo from '$lib/assets/plato_logo.png';
  
  onMount(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          console.log(user)
          authStore.update((curr) => {
              return { ...curr, isLoading: false, currentUser: user, loggedIn: !!user};
          });
      });
  });  
</script>

<svelte:head>
  <title>Plato</title>
  <link rel="icon" type="image/svg+xml" href={Logo} />
</svelte:head>

{#if $authStore.isLoading}
  <div><p>Loading...</p></div>
{:else}
  {#if $authStore.loggedIn}
    <NavbarIn />
    <slot />
  {:else}
    <NavbarOut />
    <slot />
  {/if}
{/if}

<style>
  div {
    display: flex;
    height: 100vh; 
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 34px;
    text-align: center;
  }
</style>