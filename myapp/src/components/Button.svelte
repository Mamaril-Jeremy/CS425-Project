<!-- <script>
	let buttonProps = {class:[$$restProps.class]}
</script>
	
<button on:click
	{...buttonProps}>
	<slot/>
</button>

<style>
	.connect{
		color:green;
        position: absolute;
        top: 400px;
        left: 1300px;
        width: 100px;
        height: 40px;
	}
	.green{
		font-size:1em;
		padding:0.1em;
	}
    .pass{
		color:red;
        position: absolute;
        top: 400px;
        left: 200px;
        width: 100px;
        height: 40px;
	}
	.red{
		font-size:1em;
		padding:0.1em;
	}
</style> -->


<style>
    .button {
        top: 100px;
        left: 0px;
    }
</style>

<script>
    import { Button, GradientButton } from 'flowbite-svelte';
</script>

<div class="button">
    <Button>
        Connect 
    </Button>
</div>