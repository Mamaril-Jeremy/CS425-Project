<script>
    import { onMount } from 'svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
    import { getStorage, ref, uploadBytes } from 'firebase/storage';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';

    let file;
    let isButtonBlue = false;
    let userUID;
    const reload = writable(sessionStorage.getItem('reload') === 'true');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
    });

    reload.subscribe(value => {
        if (value && !sessionStorage.getItem('isReloading')) {
            sessionStorage.setItem('isReloading', 'true');
            location.reload();
        }
    });

    const handlefileUpload = async (event) => {
        const new_file = event.target.files[0];
        const allowedTypes = ["application/pdf"];

        if (new_file && allowedTypes.includes(new_file.type)) {
            file = new_file;
            isButtonBlue = true;
        } else {
            alert("Please upload a valid file (pdf).");
            isButtonBlue = false;
        }
    };

    const handleContinue = async () => {
        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, `resumes/${userUID}/${file.name}`);

            const metadata = {
                contentType: file.type
            };
            const uploadTask = uploadBytes(storageRef, file, metadata);
            goto("/home");
        }
    };

    onMount(() => {
        reload.set(true); 
    });
</script>

<main>
  <div class="center">
    <h1>Upload A Professional Resume</h1>

    <label for="upload">Upload Resume (pdf):</label>
    <input type="file" id="upload" accept=".pdf" on:change={handlefileUpload} />

    <button on:click={handleContinue} class:continue={isButtonBlue} class:no-continue={!isButtonBlue}>
      Continue
    </button>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    line-height: 2.5;
  }

  .center {
    text-align: center;
  }

  label {
    display: block;
    margin-bottom: 1rem;
  }

  input {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }

  .continue {
    background-color: #007bff;
    color: #ffffff;
  }

  .no-continue {
    background-color: #ffffff;
    color: #007bff;
  }
</style>
