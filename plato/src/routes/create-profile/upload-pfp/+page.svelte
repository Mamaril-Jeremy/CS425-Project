<script>

/*
  ----------------------------------------------------------------------
  Michael Nia - Dev Log
  Updated: 3/3/2024
  SightEngine Image Filter Implementation for Upload-pfp
  Michael worked on the image filter: 
    >Checks image file for inappropriate content and blocks or approves.
    Improved take on the image filter system using SightEngine API.
    >Replaced 'fs' with direct image upload with axios component.
  -----------------------------------------------------------------------
*/

  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';
  import { getStorage, ref, uploadBytes } from 'firebase/storage';
  import { goto } from '$app/navigation';
  //import { analyzeImageWithSightengine } from '$lib/assets/imagefilterNew'
  //Import image filter packages
  import axios from 'axios';
  import FormData from 'form-data';

  let image;
  let isButtonBlue = false, userUID;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
    }
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (file && allowedTypes.includes(file.type)) {
      image = file;
      isButtonBlue = true;
    } else {
      alert("Please upload a valid image file (png, jpg, jpeg).");
      isButtonBlue = false;
    }
  };

  const handleContinue = async () => {
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${userUID}/${image.name}`);

      const metadata = {
        contentType: image.type
      }

      //filtered = analyzeImageWithSightengine(image); //Commented out, no longer useful.
      const data = new FormData();
      data.append('media', image); //Pretty straightforward
      data.append('models', 'nudity-2.0,offensive,gore');
      data.append('api_user', '814034437'); //User data
      data.append('api_secret', 'TyzDvp3zEYqFDJmBPJe6EgozSSMayrXG'); //API secret
      
      //Here goes...
      let header = {'Content-Type': 'multipart/form-data'};
      axios({
        url: 'https://api.sightengine.com/1.0/check.json',
        method: 'post',
        data: data,
        headers: header
      })
        .then((response) => {
          // Handle the response here
          console.log('Sightengine response:', response.data);
          //Nice, it works. Now check ranges before upload

            // -- Code to be added

          //Upload image
          //const uploadTask = uploadBytes(storageRef, image, metadata);  
          //goto("/create-profile/upload-resume") //Direct user to resume upload.
        })
        .catch((error) => {
          console.error('Error analyzing image:', error);
          // Handle the error
        });
    }
  };
</script>

<main>
  <div class="center">
    <h1>Upload A Professional Image</h1>

    <label for="upload">Upload Image (png, jpg, jpeg):</label>
    <input type="file" id="upload" accept=".png, .jpg, .jpeg" on:change={handleImageUpload} />

    <button on:click={handleContinue} class="{isButtonBlue ? 'continue' : 'no-continue'}">Continue</button>
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

  .no-continue{
    background-color: #ffffff;
    color: #007bff;
  }
</style>