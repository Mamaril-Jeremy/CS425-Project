<script>
  // This code was developed by Mark Marsala
  import { authHandlers, authStore } from "../../stores/authStore.js";
  import { goto } from '$app/navigation';
  import { Progressbar } from 'flowbite-svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';

  let formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  let emailError = false;
  let passwordMatchError = false;
  let passwordLengthError = false;
  let passwordRequirementsError = false;
  const MIN_PASSWORD_LENGTH = 8;

  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let userUID = user.uid;
    }
  });

  async function handleSubmit() {
    //console.log('Form submitted:', formData);

    const { username, email, password, confirmPassword } = formData;

    if(!username || !email || !password || !confirmPassword)
    {
      return;
    }

    if (password === confirmPassword) {
      if (password.length >= MIN_PASSWORD_LENGTH) {
        // Check for additional password requirements
        if (password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
          try {
            await authHandlers.signup(email, password);
            await authHandlers.verifyEmail();
            const unsubscribe = auth.onAuthStateChanged((user) => {
                authStore.update((curr) => {
                  return { ...curr, isLoading: false, currentUser: user, loggedIn: false};
                });
            });
            goto('/verify-email')
          } catch (err) {
            emailError = true;
            console.log(err);
          }
        } else {
          passwordRequirementsError = true;
          passwordLengthError = false;
          passwordMatchError = false;
        }
      } else {
        passwordLengthError = true;
        passwordRequirementsError = false;
        passwordMatchError = false;
      }
    } else {
      passwordMatchError = true;
      passwordRequirementsError = false;
      passwordLengthError = false;
    }
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
  <Progressbar class="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="12.5"/>

  <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full mt-16">

    <h1 class="text-3xl font-semibold mb-6">Create Account</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <!-- Username -->
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input type="text" id="username" name="username" autocomplete="username" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.username} required />
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-600">Email Address</label>
        <input type="email" id="email" name="email" autocomplete="email" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.email} required />
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
        <input type="password" id="password" name="password" autocomplete="new-password" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.password} required />
      </div>

      <!-- Confirm Password -->
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.confirmPassword} required />
      </div>

      <div class="mb-4">
        <p class="text-gray-600 text-sm mb-2">Password must:</p>
        <ul class="list-disc list-inside text-gray-600 text-sm">
          <li>Contain at least 8 characters</li>
          <li>Include at least one uppercase letter</li>
          <li>Include at least one digit</li>
          <li>Include at least one special character (@ $ ! % * ? &)</li>
        </ul>
      </div>

      {#if emailError}
      <p class="text-red-500 mb-4">Email invalid</p>
      {/if}

      {#if passwordMatchError}
      <p class="text-red-500 mb-4">Passwords must match</p>
      {/if}

      {#if passwordLengthError}
      <p class="text-red-500 mb-4">Password must contain at least 8 characters</p>
      {/if}

      {#if passwordRequirementsError}
      <p class="text-red-500 mb-4">Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character</p>
      {/if}

      <div class="mt-6">
        Already have an account? <a href="/sign-in">Sign In</a>
       </div>

      <!-- Submit Button -->
      <button type="submit" class="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Create Account
      </button>
    </form>
  </section>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
  }

  section {
    background: white;
    padding: 2rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
  }

  button {
    cursor: pointer;
  }
</style>
