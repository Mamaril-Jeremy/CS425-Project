<script>
  import {Router, Route} from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import Home from "./routes/home/Home.svelte";
  import About from "./routes/profile/Profile.svelte";
  import Chat from "./routes/chat/Chat.svelte";
  import Event from "./routes/events/Event.svelte";
  import Connections from "./routes/connections/Connections.svelte";
  import Profile from "./routes/profile/Profile.svelte";
  import SignIn from "./routes/sign-in/Sign-In.svelte";
  //Hi
</script>

<main>
  
  <Router>
		<Route path="/">
			<SignIn />
		</Route>

		<Route path="/home">
			<Navbar />
			<Home />
		</Route>

		<Route path="/events">
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