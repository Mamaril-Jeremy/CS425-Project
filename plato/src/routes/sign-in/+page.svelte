<script>
  //This code was developed by Jeremy Mamaril
  import { authHandlers, authStore} from "../../stores/authStore.js"
  import { Card, Button, Label, Input} from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let incorrectEmailOrPassword = false;

  const handleSubmit = async (event) => {
     event.preventDefault();

    if(!email || !password) {
      return;
    }

    try {
      await authHandlers.login(email, password)
      authStore.update((curr) => {
        return {
          ...curr,
          loggedIn: true
        };
      });
      goto('/home')
    } catch (err) {
      console.log(err);
      incorrectEmailOrPassword = true;
    }
  };

  // const handleSubmit = async (event) => {
  //     goto('/home')
  //     clicked.set(true);
  // };
</script>

<div class="body-background h-screen w-screen flex items-center justify-center">
  <div class="card-container">
    <Card class="w-80 max-w-none">
      <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to Plato</h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" bind:value={email} placeholder="name@company.com" required />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" bind:value={password} placeholder="••••••••••••" required />
        </Label>
        {#if incorrectEmailOrPassword}
          <p class="text-red-500 mb-4">Invalid email or password</p>
        {/if}
        <div class="flex items-start">
          <div><input type="checkbox" id="demoCheckbox" name="checkbox" value="1"><a href="/" class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500">Remember me</a></div>
          <a href="/" class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500"> Lost password? </a>
        </div>
        <Button type="submit" class="w-full bg-blue-600 hover:opacity-75 hover:bg-blue-600">Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="/create-account" class="ml-10 text-blue-600 hover:underline dark:text-primary-500"> Create account </a>
        </div>
      </form>
    </Card>
  </div>
</div>

<style>
  .body-background {
    background-image: url('../../lib/assets/backgroundlogin2.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  a{
    margin-left: 10px;
  }
</style>


 <!-- <div class="button-container" >
    <Button color="dark" on:click={handleSubmit}>Mariooo HeHe</Button>
  </div>



<style>
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style> -->
