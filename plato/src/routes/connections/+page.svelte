<script>
    import { Button } from 'flowbite-svelte';
    import Card from '$lib/components/Card.svelte';
</script>

<div class="container">
    <div class="pass">
        <Button color="red" class="tinder-button">Pass</Button>
    </div>
    <Card />
    <div class="connect">
        <Button color="green" class="tinder-button">Connect</Button>
    </div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin-left: auto;
        margin-right: auto;
    }

    .pass {
        text-align: center;
        padding-right: 10px;
    }

    .connect {
        text-align: center;
        padding-left: 10px;
    }
</style>
