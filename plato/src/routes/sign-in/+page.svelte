<script>
  //This code was developed by Jeremy Mamaril & Mark Marsala
  //Local storage by Michael Nia
  import { authStore } from "../../stores/authStore.js";
  import { Card, Button, Label, Input } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import { getAuth, getMultiFactorResolver, signInWithEmailAndPassword, PhoneAuthProvider, PhoneMultiFactorGenerator } from "firebase/auth";

  let email = '';
  let password = '';
  let phoneNumber = '';
  let code = '';
  let incorrectEmailOrPassword = false;
  let appVerifier = null;
  let showCode = false;
  let showLogin = true;
  let multiFactorResolver = null;
  let showInstructions = false;
  let rememberMe = false;

  const auth = getAuth();

  //Enigma cipher Encryption
  const enigma = {
    encrypt: (message, A, B, C) => {
      let result = "";
      for (let char of message) {
        //Enigma portion - Does not return same decrypted words
        C = (C + 1) % 26;
        if (C === 0) {
          B = (B + 1) % 26;
          if (B === 0) {
            A = (A + 1) % 26;
          }
        }
        //--------------
        //console.log(char);
        let value = char.charCodeAt(0);
        if (value > 96) {
          //Lowercase
          value -= 97;
          value = (value + A) % 26;
          value = (value + B) % 26;
          value = (value + C) % 26;
          result += String.fromCharCode(value + 97);
          continue;
        }
        if (value > 64) {
          //Uppercase
          value -= 65;
          value = (value + A) % 26;
          value = (value + B) % 26;
          value = (value + C) % 26;
          result += String.fromCharCode(value + 65);
          continue;
        }
        if (value > 47) {
          //Numbers
          value -= 48;
          value = (value + A) % 10;
          value = (value + B) % 10;
          value = (value + C) % 10;
          result += String.fromCharCode(value + 48);
          continue;
        }
        result += char;
      }
      return result;
    },
    decrypt: (message, A, B, C) => {
      let result = "";
      for (let char of message) {
        //Enigma portion
        C = (C + 1) % 26;
        if (C === 0) {
          B = (B + 1) % 26;
          if (B === 0) {
            A = (A + 1) % 26;
          }
        }
        //--------------
        //console.log(char);
        let value = char.charCodeAt(0);
        if (value > 96) {
          //Lowercase
          value -= 97;
          value = (value - C + 26) % 26;
          value = (value - B + 26) % 26;
          value = (value - A + 26) % 26;
          result += String.fromCharCode(value + 97);
          continue;
        }
        if (value > 64) {
          //Uppercase
          value -= 65;
          value = (value - C + 26) % 26;
          value = (value - B + 26) % 26;
          value = (value - A + 26) % 26;
          result += String.fromCharCode(value + 65);
          continue;
        }
        if (value > 47) {
          //Numbers
          value -= 48; //We need some multiple of 10 to guarentee we move forth (i.e. 30)
          value = (value - C + 30) % 10;
          value = (value - B + 30) % 10;
          value = (value - A + 30) % 10;
          result += String.fromCharCode(value + 48);
          continue;
        }
        result += char;
      }
      return result;
    },
  };

  //Test Encryption-Decryption
  //console.log(enigma.decrypt(enigma.encrypt("ILikePlato96!", 5, 9, 3), 5, 9, 3));
  //Targeted Autofill
  if (localStorage.getItem("email") !== null) {
    email = localStorage.getItem("email");
  }
  if (localStorage.getItem("password") !== null) {
    password = enigma.decrypt(localStorage.getItem("password"), 5, 9, 3); //Have to be between 0-9
  }

  async function handleSubmit(event) {
    //event.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
            //If rememberMe then set
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", enigma.encrypt(password, 5, 9, 3));
        } //Local email-password storage
      authStore.update((curr) => {
        return {
          ...curr,
          loggedIn: true,
        };
      });
      goto("/home");
    } catch (err) {
      console.log(err);
      if (err.code === 'auth/multi-factor-auth-required') {
        showCode = true;
        showLogin = false;
        multiFactorResolver = getMultiFactorResolver(auth, err);
        const phoneInfoOptions = {
          multiFactorHint: multiFactorResolver.hints[0],
          session: multiFactorResolver.session
        };
        try {
          appVerifier = window.recaptchaVerifier;
          const phoneAuthProvider = new PhoneAuthProvider(auth);
          const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);
          return verificationId;
        } catch (err) {
          if (err.code === 'auth/code-expired') {
            console.log("Verification code expired. Please request a new code.");
          } else {
            console.log("Error during multi-factor authentication:", err);
          }
        }
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        incorrectEmailOrPassword = true;
      } else {
        console.log(err);
      }
    }
  }

  async function enterCode(){
    if(!code)
    {
      showInstructions = true;
    }
    try{
      if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", enigma.encrypt(password, 5, 9, 3));
      } //Local email-password storage
      const verificationId = await handleSubmit();
      const cred = PhoneAuthProvider.credential(verificationId, code);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
      multiFactorResolver.resolveSignIn(multiFactorAssertion);
      authStore.update((curr) => {
        return {
          ...curr,
          loggedIn: true
        };
      });
      goto("/home")
    } catch (error) {
      showInstructions = true;
    }
  }
</script>


<div class="body-background h-screen w-screen flex items-center justify-center">
  <div class="card-container">
    <Card class="w-80 max-w-none">
      <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to Plato
        </h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input
            type="email"
            bind:value={email}
            placeholder="name@company.com"
            required
            autocomplete="email"
          />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input
            type="password"
            bind:value={password}
            placeholder="••••••••••••"
            required
            autocomplete="password"
          />
        </Label>

        <div class="mb-4">
          <div id="recaptcha-container"></div>
        </div>

        {#if showCode}
        <div class="mb-6 mt-6">
          <label for="code" class="block text-sm font-medium text-gray-600">Code</label>
          <input type="text" id="code" name="code" placeholder="123456" class="mt-1 p-2 w-full border rounded-md" bind:value={code} required />
        </div>

        <button type="button" on:click={enterCode} class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Sign in with MFA
        </button>
        {/if}

        {#if showInstructions}
        <p class="text-red-500 mb-4">Solve a recaptcha, input the code, check the recaptcha box again, and press Sign in with MFA</p>
        {/if}

        {#if incorrectEmailOrPassword}
          <p class="text-red-500 mb-4 text-center">Invalid email or password</p>
        {/if}
        <div class="flex items-start">
          <div>
            <input
              type="checkbox"
              id="demoCheckbox"
              name="checkbox"
              bind:value={rememberMe}
            />
            <p
              class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500"
            >
              Remember me
            </p>
            <a
              href="/forgot-password"
              class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500"
              >Lost password?</a
            >
          </div>
        </div>
        {#if showLogin}
          <Button type="submit" class="w-full bg-blue-600 hover:opacity-75 hover:bg-blue-600">Login to your account</Button>
        {/if}

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 ml-3">
          Not registered? <span class="ml-3"> </span><a
            href="/start"
            class="ml-2 text-blue-600 hover:underline dark:text-primary-500"
          >
            Create account
          </a>
        </div>
      </form>
    </Card>
  </div>
</div>

<style>
  .body-background {
    background-image: url("../../lib/assets/backgroundlogin2.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  p {
    display: inline;
    margin-left: 10px;
  }

  a {
    margin-left: 45px;
  }
</style>
