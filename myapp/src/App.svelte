<script>
  import {Router, Route} from "svelte-routing";
  import {GradientButton} from "flowbite-svelte";
  import Navbar from "./components/Navbar.svelte";
  import Home from "./routes/home/Home.svelte";
  import About from "./routes/profile/Profile.svelte";
  import Chat from "./routes/chat/Chat.svelte";
  import Event from "./routes/events/Event.svelte";
  import Connections from "./routes/connections/Connections.svelte";
  import Profile from "./routes/profile/Profile.svelte";
</script>

<main>
  <Navbar/>
  
  <Router>
    <Route path="/">
      <Home/>
    </Route>
    <Route path="/about">
      <About/>
    </Route>
    <Route path="/events">
			<Event />
		</Route>
		<Route path="/connections">
			<Connections />
		</Route>

		<Route path="/chat">
			<Chat />
		</Route>
		
		<Route path="/profile">
			<Navbar />
			<Profile />
		</Route>
  </Router>
</main>