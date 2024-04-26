<script>
  import { multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from "firebase/auth";
  import { getAuth, RecaptchaVerifier } from "firebase/auth";
  import { goto } from '$app/navigation';
  import { Progressbar } from 'flowbite-svelte';

  let formData = {
    phoneNumber: '',
    code: ''
  };
  let verificationId = '';
  let appVerifier = null;
  let login = false;
  let phoneNumberError = '';
  let recaptchaVerifier = null;
  
  const mfaDisplayName = "Phone Auth"

  async function sendCode() {
    const { phoneNumber } = formData;

    if (!phoneNumber) {
      console.error('Invalid phone number or reCAPTCHA not verified');
      return;
    }

    // const phoneRegex = /^\+\d{4}-\d{3}-\d{4}$/;

    // if (!phoneRegex.test(phoneNumber)) {
    //   phoneNumberError = 'Please enter a valid phone number in the format: +1 123-456-7890';
    //   return;
    // } else {
    //   phoneNumberError = '';
    // }

    try {
      const auth = getAuth();

      appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      await appVerifier.render();
      const multiFactorSession = await multiFactor(auth.currentUser).getSession();

      const phoneInfoOptions = {
        phoneNumber: phoneNumber,
        session: multiFactorSession
      };

      const phoneAuthProvider = new PhoneAuthProvider(auth);
      verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);

      console.log("Recaptcha up! SMS sent!");
    } catch (error) {
      console.error(error);
    }
  }

  async function loginWithCode() {
    const { code } = formData;

    try {
      const auth = getAuth(); 
      const cred = PhoneAuthProvider.credential(verificationId, code);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      login = true;
      await multiFactor(auth.currentUser).enroll(multiFactorAssertion, mfaDisplayName);
      goto('/organization');
    } catch (error) {
      console.error(error);
    }
  }

  async function goHome() {
    try {
      if (login) {
        goto('/home');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function skip(){
    goto('/organization');
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
  <Progressbar class="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="37.5"/>
  <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full mt-40">
    <h1 class="text-2xl font-semibold mb-6">Multi-Factor Authentication</h1>
  
    <form on:submit|preventDefault={goHome}>

      <div class="mb-6">
        <label for="phoneNumber" class="block text-sm font-medium text-gray-600">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="+1 123-456-7890" autocomplete="tel" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.phoneNumber} required />
        {#if phoneNumberError}
          <p class="text-red-500">{phoneNumberError}</p>
        {/if}
      </div>

      <div class="mb-4">
        <div id="recaptcha-container"></div>
      </div>

      <button type="button" on:click={sendCode} class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Send code
      </button>

      <div class="mb-6 mt-6">
        <label for="code" class="block text-sm font-medium text-gray-600">Code</label>
        <input type="text" id="code" name="code" placeholder="123456" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.code} required />
      </div>
  
      <button type="button" on:click={loginWithCode} class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Verify
      </button>

      <div class="flex justify-center">
        <button type="button" on:click={skip} class="mt-5 w-24 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Skip
        </button>
      </div>
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