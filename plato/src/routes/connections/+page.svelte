<script>
    import { Button } from 'flowbite-svelte';
    import Card from '$lib/components/Card.svelte';
</script>

<div class="container">
    <Card />
    <div class="button-container">
        <Button color="dark">Dark</Button>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
