<script>
  //This code was developed by Mark Marsala
  import { goto } from '$app/navigation';
  import { getAuth, signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";

  let formData = {
    phoneNumber: '',
    code: ''
  };

  async function handleSubmit() {
    console.log('Form submitted:', formData);

    const { phoneNumber, code } = formData;
    const recaptchaResponse = grecaptcha.getResponse();
    const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;

    if(!phoneNumber)
    {
      return;
    }

    if (!recaptchaResponse) {
      console.error('reCAPTCHA not verified');
      return;
    }
    else
    {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        console.log("Recaptcha up! SMS sent!")
        window.confirmationResult = confirmationResult;
      }).catch(error => {
        console.error(error);
      })
        confirmationResult.confirm(code).then((result) => {
          goto('/home')
        }).catch((error) => {
      });
    }
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
      <div class="mb-4">
        <div class="g-recaptcha" id="recaptcha-container" data-sitekey="6Leo44YpAAAAAO6GBX41rkcS-KD3VkPYiqf6XVjm"></div>
      </div>

      <!-- Send Code Button -->
      <button type="button" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Send code
      </button>

      <!-- Verification code -->
      <div class="mb-6 mt-6">
        <label for="code" class="block text-sm font-medium text-gray-600">Code</label>
        <input type="text" id="code" name="code" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.code} required />
      </div>
  
      <!-- Submit Button -->
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Login
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