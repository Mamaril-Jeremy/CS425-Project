<script>

  //This code was developed by Mark Marsala
  import { Button } from 'flowbite-svelte';
  import { authHandlers } from "../../stores/authStore"
  import { auth } from '$lib/firebase/firebase.client.js';
  import { goto } from '$app/navigation';
  import { onAuthStateChanged } from 'firebase/auth';
  import { Progressbar } from 'flowbite-svelte';

  let isEmailVerified = false;
  let emailVerifiedWarning = false;
  let timer;
  let countdown = 300;

  function startTimer() {
    timer = setInterval(() => {
      countdown--;
      console.log(countdown);
      if (countdown <= 0) {
        clearInterval(timer);
        console.log("Timer expired!");
        authHandlers.deleteUser();
      }
    }, 1000);
  }

  startTimer();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isEmailVerified = user.emailVerified;
    }
  });


  async function handleSubmit() {
    try {
      if(isEmailVerified)
      {
        goto('/MFA');
        clearInterval(timer);
      }
      else{
        emailVerifiedWarning = true;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>
  
<main class="bg-gray-100">
  <Progressbar class="absolute top-40 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="25"/>
  <body>
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full mt-16">
    <div class="title">Verify Your Email Before Continuing</div>
    <div class="form-container">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="centered-button">
          <Button type="submit" color="blue">Continue</Button>
        </div>
      </form>
    </div>
    {#if emailVerifiedWarning}
      <p class="text-blue-500 ml-6 mb-4 mt-10">Please verify your email, then refresh the page.</p>
    {/if}
  </section>
  </body>
</main>
  
<style>
  body {
    display: flex;
    flex-direction: column; 
    align-items: center;
    height: 100vh;
    justify-content: center;
  }
  
  .title {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 40px;
  }
  
  .form-container {
    text-align: center;
    width: 50%;
  }
  
  .centered-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 16px;
    margin-left: 175px; 
  }
</style>
  