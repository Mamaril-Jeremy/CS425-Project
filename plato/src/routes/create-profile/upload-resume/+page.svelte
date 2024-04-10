<script>
    import { onMount } from 'svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
    import { getStorage, ref, uploadBytes } from 'firebase/storage';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { Progressbar } from 'flowbite-svelte';

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
            console.log(file)
            await uploadBytes(storageRef, file, metadata);
            await sendResumeToFlask(file, userUID)
            goto("/home");
        }
    };
    async function sendResumeToFlask(resumeFile, UID) {
        const formData = new FormData()
        formData.append('file', resumeFile)
        formData.append('userUID', UID)
        try {
          const response = await fetch('http://localhost:5000/parse_resume_skills', {
            method: 'POST',
            body: formData
        });

          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    onMount(() => {
        reload.set(true); 
    });
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
  <Progressbar class="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="100"/>

  <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full mt-16">
    <div class="center">
    <h1>Upload A Professional Resume</h1>

    <label for="upload">Upload Resume (pdf):</label>
    <input type="file" id="upload" accept=".pdf" on:change={handlefileUpload} />

    <button on:click={handleContinue} class:continue={isButtonBlue} class:no-continue={!isButtonBlue}>
      Continue
    </button>
  </div>
  </section>
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
      color: black;
    }
  
    .no-continue{
      background-color: #ffffff;
      color: #007bff;
    }
</style>
