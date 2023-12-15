<script>
  //This code was developed by Jeremy Mamaril
  import Home from "$lib/components/Home.svelte";
  import { auth } from '../../lib/firebase/firebase.client';
  import { authStore } from '../../stores/authStore';

  let email;
  authStore.subscribe((curr) => {
    console.log('CURR', curr)
    email = curr?.currentUser?.email;
  });
</script>

{#if $authStore.currentUser}
  <div>
    <h1>CURRENT USER: {email}</h1>
  </div>
{:else}
<div>Loading...</div>
{/if}

<Home/>