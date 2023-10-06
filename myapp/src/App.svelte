<script>
  import {Router, Route} from "svelte-routing";
  import About from "./components/About.svelte";
  import Chat from "./routes/chat/Chat.svelte";
  import Connections from "./routes/connections/Connections.svelte";
  import Event from "./routes/events/Event.svelte";
  import Home from "./routes/home/Home.svelte";
  import NavbarIn from "./components/NavbarIn.svelte";
  import NavbarOut from "./components/NavbarOut.svelte";
  import Profile from "./routes/profile/Profile.svelte";
  import SignIn from "./routes/sign-in/Sign-In.svelte";
</script>

<svelte:head>
	<title>Plato</title>
</svelte:head>

<main>
  
  <Router>
		<Route path="/">
			<Home />
			<NavbarOut />
		</Route>

		<Route path="/about-out">
			<About/>
			<NavbarOut />
		</Route>
		
		<Route path="/about-in">
			<About/>
			<NavbarIn />
		</Route>

		<Route path="/chat">
			<Chat />
			<NavbarIn />
		</Route>
		
		<Route path="/connections">
			<Connections />
			<NavbarIn />
		</Route>
		
		<Route path="/events">
			<Event />
			<NavbarIn />
		</Route>
		
		<Route path="/home">
			<Home />
			<NavbarIn />
		</Route>
		
		<Route path="/profile">
			<Profile />
			<NavbarIn />
		</Route>
		
		<Route path="/sign-in">
			<SignIn />
		</Route>		
	</Router>
</main>