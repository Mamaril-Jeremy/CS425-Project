<script>
    //import "../app.postcss";
    import { onMount } from 'svelte'
    import { auth } from '../../lib/firebase/firebase.client'
    import { authStore } from '../../stores/authStore'
  
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            authStore.update((curr) => {
                return { ...curr, isLoading: false, currentUser: user };
            });
        });
    });
  
</script>

<slot />