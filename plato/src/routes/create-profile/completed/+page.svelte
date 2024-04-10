<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Progressbar } from "flowbite-svelte";

    onMount(() => {
        setTimeout(() => {
            goto("/home");
        }, 2000);
    });
</script>

<main>
    <div class="bar">
        <h1 style="text-align: center; margin-bottom: 20px;">Profile Creation Completed!</h1>
        <Progressbar progress="100"/>
    </div>
</main>

<style>
    .bar{
        display: flex;
        flex-direction: column;
        height: 100vh;
        align-items: center;
        justify-content: center;
        width: 50%;
        position: absolute;
        left: 25%;
    }
</style>

