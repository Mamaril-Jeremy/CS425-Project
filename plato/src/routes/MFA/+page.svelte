<script>
  //This code was developed by Mark Marsala
  import { goto } from '$app/navigation';
  import { auth } from '../../lib/firebase/firebase.client'
  import { RecaptchaVerifier } from "firebase/auth";

  let formData = {
    phoneNumber: ''
  };

  async function handleSubmit() {
    console.log('Form submitted:', formData);

    const { phoneNumber } = formData;

    if(!phoneNumber)
    {
      return;
    }

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",

      // Optional reCAPTCHA parameters.
      {
        "size": "normal",
        "callback": function(response) {
          // reCAPTCHA solved, you can proceed with
          // phoneAuthProvider.verifyPhoneNumber(...).
          onSolvedRecaptcha();
        },
        "expired-callback": function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth
  );

}
</script>
  
<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
  <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
    <h1 class="text-2xl font-semibold mb-6">Multi-Factor Authentication</h1>
  
    <form on:submit|preventDefault={handleSubmit}>
      <!-- Phone Number -->
      <div class="mb-6">
        <label for="phoneNumber" class="block text-sm font-medium text-gray-600">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" autocomplete="tel" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.phoneNumber} required />
      </div>

      <!-- reCAPTCHA -->
      <div id="recaptcha-container"></div>
  
      <!-- Submit Button -->
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Send code
      </button>
    </form>
  </section>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  section {
    background: white;
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