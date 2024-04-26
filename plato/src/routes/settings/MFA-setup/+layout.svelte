<slot />
<!-- Developed by Mark Marsala -->
<!-- <script>
  import { onMount } from 'svelte';
  import { getAuth, RecaptchaVerifier } from "firebase/auth";

  const auth = getAuth();
  
  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    // script.async = true;
    // script.defer = true;
    document.head.appendChild(script);
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    
    try {
      if (window.recaptchaVerifier) {
        console.log('RecaptchaVerifier initialized successfully.');
      } else {
        console.error('RecaptchaVerifier initialization failed.');
      }
    } catch (error) {
      console.error('Error during RecaptchaVerifier initialization:', error);
    }
  });
</script> -->