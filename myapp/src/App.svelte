<script>
  import {Router, Route} from "svelte-routing";
  import About from "./components/About.svelte";
  import Chat from "./routes/chat/Chat.svelte";
  import Connections from "./routes/connections/Connections.svelte";
  import Event from "./routes/events/Event.svelte";
  import Home from "./routes/home/Home.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Opener from "./components/Opener.svelte";
  import Profile from "./routes/profile/Profile.svelte";
  import SignIn from "./routes/sign-in/Sign-In.svelte";

</script>

<main>
  
  <Router>
		<Route path="/">
			<Opener />
			<Navbar />
		</Route>

		<Route path="/about">
			<About/>
			<Navbar />
		</Route>

		<Route path="/chat">
			<Navbar />
			<Chat />
		</Route>
		
		<Route path="/connections">
			<Navbar />
			<Connections />
		</Route>
		
		<Route path="/events">
			<Navbar />
			<Event />
		</Route>
		
		<Route path="/home">
			<Navbar />
			<Home />
		</Route>
		
		<Route path="/profile">
			<Navbar />
			<Profile />
		</Route>
		
		<Route path="/sign-in">
			<SignIn />
		</Route>		
	</Router>
</main>