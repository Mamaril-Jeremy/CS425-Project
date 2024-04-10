<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        setTimeout(() => {
            goto("/create-account");
        }, 2000);
    });
</script>

<main>
    <div class="bar"><h1>Let's Create Your Profile!</h1></div>
</main>

<style>
    .bar{
        display: flex;
        height: 100vh;
        align-items: center;
        justify-content: center;
        width: 50%;
        position: absolute;
        left: 25%;
    }
</style>
