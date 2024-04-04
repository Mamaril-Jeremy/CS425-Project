<!-- <script>
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
    import { getStorage, ref, uploadBytes } from 'firebase/storage';
    import { goto } from '$app/navigation';
  
    let file;
    let isButtonBlue = false;
    let userUID;
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userUID = user.uid;
      }
    });
  
    const handlefileUpload = async (event) => {
      const new_file = event.target.files[0];
      const allowedTypes = ["text/csv"];
  
      if (new_file && allowedTypes.includes(new_file.type)) {
        file = new_file;
        isButtonBlue = true;
      } else {
        alert("Please upload a valid file (csv).");
        isButtonBlue = false;
      }
    };
  
    const handleContinue = async () => {
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `CSVs/${userUID}/${file.name}`);
  
        const metadata = {
          contentType: file.type
        };
        const uploadTask = uploadBytes(storageRef, file, metadata);
        goto("/home");
      }
    };
</script> -->

<script>
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';
  import { goto } from '$app/navigation';

  let file;
  let isButtonBlue = false;
  let userUID;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
    }
  });

  const handlefileUpload = async (event) => {
    const new_file = event.target.files[0];
    const allowedTypes = ["text/csv"];

    if (new_file && allowedTypes.includes(new_file.type)) {
      file = new_file;
      isButtonBlue = true;
    } else {
      alert("Please upload a valid file (csv).");
      isButtonBlue = false;
    }
  };

  const handleContinue = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      //formData.append('userUID', userUID);

      try {
        const response = await fetch('http://localhost:5000/add_org_user', {
          method: 'POST',
          body: formData // Let the browser set the correct Content-Type
        });

        if (response.ok) {
          goto("/home");
        } else {
          throw new Error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
</script>

  
<main>
    <div class="center">
      <h1>Upload Your Organization's CSV File</h1>
  
      <label for="upload">Upload CSV (csv):</label>
      <input type="file" id="upload" accept=".csv" on:change={handlefileUpload} />
  
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