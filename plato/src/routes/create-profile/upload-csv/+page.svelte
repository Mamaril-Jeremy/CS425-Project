<!-- Created by: Mark Marsala -->
<script>
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';
  import { goto } from '$app/navigation';

  let file;
  let isButtonBlue = false;
  let userUID;
  let selectedUniversity = '';
  let uploadError = false;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
    }
  });

  const universities = [
    { name: 'University of Nevada, Reno', logoSrc: '/src/routes/create-profile/upload-csv/unrlogo.png' },
    { name: 'University of Nevada, Las Vegas', logoSrc: '/src/routes/create-profile/upload-csv/unlv.png' }
  ];
  
  const selectUniversity = (universityName) => {
    selectedUniversity = universityName;
  };

  const handleSelection = (universityName) => {
    selectUniversity(universityName);
  };

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

      if(selectedUniversity == "University of Nevada, Reno"){
        try {
          const response = await fetch('http://localhost:5000/add_unr_users', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            goto("/home");
          } else {
            throw new Error('Failed to upload file');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else if (selectedUniversity == "University of Nevada, Las Vegas"){
        try {
          const response = await fetch('http://localhost:5000/add_unlv_users', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            goto("/home");
          } else {
            throw new Error('Failed to upload file');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        uploadError = true;
      }
    }
  };
</script>

<main class="bg-gray-100">
  <div class="center mt-10">
    <h1 class="text-blue-600">Upload Your Organization's CSV File</h1>
    <h2 class="mt-8">Format: First,Last,Occupation,Phone,Role,Major,Country,State,City</h2>

    <div class="flex justify-center space-x-6 mb-6 mt-8">
      {#each universities as university}
      <button 
          on:click={() => handleSelection(university.name)}
          class="flex flex-col items-center space-y-2 focus:outline-none"
      >
          <img src={university.logoSrc} alt={university.name + " logo"} class="h-24" />
          <span class="text-lg font-semibold">{university.name}</span>
      </button>
      {/each}
    </div>

    {#if selectedUniversity}
      <p class="text-lg mb-4 mt-5">You have selected: {selectedUniversity}</p>
    {/if}

    {#if selectedUniversity}
      <label for="upload" class="mt-4 text-blue-600">Upload (.csv) file:</label>
      <input type="file" id="upload" accept=".csv" on:change={handlefileUpload} />
      <button on:click={handleContinue} class:continue={isButtonBlue} class:no-continue={!isButtonBlue}>
        Continue
      </button>
    {/if}

    {#if uploadError}
      <p class="text-red-500 text-center">Please upload a valid CSV file in the correct format.</p>
    {/if}
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
    background-color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.2s ease;
    margin: 0 10px;
  }

  .continue {
    background-color: #007bff;
    color: #ffffff;
  }

  .no-continue {
    background-color: #ffffff;
    color: #007bff;
  }

  button:hover {
    transform: translateY(-5px);
  }
</style>