<script>	
	import { Router, Route } from "svelte-routing";
	import Navbar from "./components/Navbar.svelte";
	import SignIn from "./routes/sign-in/Sign-In.svelte";
    import Home from "./routes/home/Home.svelte";
    import Event from "./routes/event/Event.svelte";
    import Connections from "./routes/connections/Connections.svelte";
    import Chat from "./routes/chat/Chat.svelte";
    import Profile from "./routes/profile/Profile.svelte";
</script>

<svelte:head>
    <title>Welcome to Plato</title> 
</svelte:head>

<body>
<main>
	<Router>
		<Route path="/">
			<SignIn />
		</Route>

		<Route path="/home">
			<Navbar />
			<Home />
		</Route>

		<Route path="/event">
			<Navbar />
			<Event />
		</Route>

		<Route path="/connections">
			<Navbar />
			<Connections />
		</Route>

		<Route path="/chat">
			<Navbar />
			<Chat />
		</Route>
		
		<Route path="/profile">
			<Navbar />
			<Profile />
		</Route>
	</Router>
</main>
</body>
 
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	/* body{
		background: linear-gradient(to bottom, #87CEEB, #ADD8E6);
	} */

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>