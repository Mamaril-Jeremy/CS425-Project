<script>
    import { Link } from "svelte-routing";
</script>

<main>
<p>Welcome to Plato</p>
<p>Username: </p>
<input type="text">
<p>Password: </p>
<input type="text">
<p></p>
<button><Link to="/home">Sign In</Link></button>
</main>

 <style>
    button{
        background:#03a9f4;
    }
 </style>