import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/lib/index'
import { goto } from '$app/navigation'

let email;
let password;
let success;

createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    goto('src/routes/profile/+page.svelte')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(errorCode, errorMessage);
    success = false;
  });


signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });