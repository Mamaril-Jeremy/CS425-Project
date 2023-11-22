<script>
    import { Button } from 'flowbite-svelte';
    import Card from '$lib/components/Card.svelte';
</script>

<div class="pass">
    <Button color="red" class="ml-100">Pass</Button>
</div>
<div class="container">
    <Card />
</div>
<div class="connect">
    <Button color="green" class="mr-100">Connect</Button> 
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .pass {
        margin-left: 450px;
    }

    .connect {
        margin-right: 450px;
    }
</style>
