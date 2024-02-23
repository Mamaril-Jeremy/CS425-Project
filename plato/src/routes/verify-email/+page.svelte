<script>
    //This code was developed by Mark Marsala
    import { Button } from 'flowbite-svelte';
    import { authHandlers } from "../../stores/authStore"
    import { auth } from '$lib/firebase/firebase.client.js';
    import { goto } from '$app/navigation';
    import { onAuthStateChanged } from 'firebase/auth';
  
    let isEmailVerified = false;
    let emailVerifiedWarning = false;
    let timer;
    let countdown = 600;

    function startTimer() {
      timer = setInterval(() => {
        countdown--;
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
          //goto('/create-profile');
          goto('/MFA');
        }
        else{
          emailVerifiedWarning = true;
        }
      } catch (err) {
        console.log(err);
      }
    }
  </script>
  
  <body>
    <div class="title">Verify Your Email Before Continuing</div>
    <div class="form-container">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="centered-button">
          <Button type="submit" color="blue">Continue</Button>
        </div>
      </form>
    </div>
    {#if emailVerifiedWarning}
      <p class="text-blue-500 mb-4 mt-10">Please verify your email, then refresh the page.</p>
    {/if}
  </body>
  
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
    margin-bottom: 60px;
  }
  
  .form-container {
    text-align: center;
    width: 50%;
  }
  
  .centered-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px; 
  }
  </style>
  