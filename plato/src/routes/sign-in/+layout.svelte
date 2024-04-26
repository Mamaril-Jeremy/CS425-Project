<slot />
<!-- Developed by Mark Marsala -->
<script>
  import { onMount } from 'svelte';
  import { getAuth, RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";
  import { goto } from '$app/navigation';

  const auth = getAuth();
  
  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    // script.async = true;
    // script.defer = true;
    document.head.appendChild(script);
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible'});
    
    try {
      if (window.recaptchaVerifier) {
        console.log('RecaptchaVerifier initialized successfully.');
      } else {
        console.error('RecaptchaVerifier initialization failed.');
      }
    } catch (error) {
      console.error('Error during RecaptchaVerifier initialization:', error);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        goto('/home'); // Route user to /home if signed in
      } else {
        console.log('User is signed out.');
      }
    });
    return unsubscribe;
  });
</script>