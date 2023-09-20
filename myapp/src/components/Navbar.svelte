<script>
    import { Link } from "svelte-routing";
</script>

<svelte:head>
    <title>Plato</title> 
</svelte:head>

<nav>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="logo">Plato</label>
    <ul>
        <li>    
            <Link to="/home"><span class="link">Home</span></Link>
        </li>
        <li>    
            <Link to="/event"><span class="link">Event</span></Link>
        </li>
        <li>    
            <Link to="/connections"><span class="link">Connections</span></Link>
        </li>
        <li>    
            <Link to="/chat"><span class="link">Chat</span></Link>
        </li>
        <li>    
            <Link to="/profile"><span class="link">Profile</span></Link>
        </li>
    </ul>
</nav>

<style lang="css">
    * {
        padding: 0;
        margin: 0;
        text-decoration: none;
        list-style: none;
        box-sizing: border-box;
        color:white;
    }

    nav {
        font-family: Montserrat;
        background: #0082e6;
        height: 80px;
        width: 100%;
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 0 20px; 
    }

    label.logo {
        color: white;
        font-size: 35px;
        font-weight: bold;
    }

    nav ul {
        display: flex;
    }

    nav ul li {
        margin: 0 10px; 
    }

    span{
        color: white; 
        font-size: 17px;
        padding: 7px 13px;
        border-radius: 3px;
        text-transform: uppercase;
        font-weight: bold;
    }

    span:hover{ 
        background: #1b9bff;
        transition: 0.5s;
        cursor: pointer;
    }
</style>
