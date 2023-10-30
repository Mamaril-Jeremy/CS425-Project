import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/lib/index';
import { goto } from '$app/navigation';

let email = ''; 
let password = ''; 
export let success = false;

createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    goto('src/routes/profile/+page.svelte');
    success = true;
  })
  .catch((error) => {
    const errorMessage = 'Registration failed. Please try again later.';
    alert(errorMessage);
    console.error(error);
  });

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorMessage = 'Login failed. Please check your credentials and try again.';
    alert(errorMessage);
    console.error(error);
  });