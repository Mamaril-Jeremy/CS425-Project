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
        <Progressbar progress="100"/>
        <h1 style="text-align: center; margin-top: 50px;">Profile Creation Completed!</h1>
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

