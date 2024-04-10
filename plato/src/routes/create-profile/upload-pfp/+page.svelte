<script>  
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
    import { getStorage, ref, uploadBytes } from 'firebase/storage';
    import { goto } from '$app/navigation';
    //import { analyzeImageWithSightengine } from '$lib/assets/imagefilterNew'
    //Import image filter packages
    import axios from 'axios';
    import FormData from 'form-data';
    import { Progressbar } from 'flowbite-svelte';
  
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
        const timestamp = new Date().getTime(); 
        const filename = `${timestamp}_${image.name}`
        const storage = getStorage();
        const storageRef = ref(storage, `images/${userUID}/${filename}`);
  
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
            //console.log('Sightengine response:', response.data);
            //Nice, it works. Now check ranges before upload
            let goreValue = response.data.gore.prob
            let offensiveValue = response.data.offensive.prob
            let nudityValue = 1 - response.data.nudity.none
            let skullValue = response.data.skull.prob
            let totalThreshold = (goreValue + offensiveValue + nudityValue + skullValue) - 0.04
  
            console.log('Gore:', goreValue);
            console.log('Offensive:', offensiveValue);
            console.log('Nudity:', nudityValue);
            console.log('Skull:', skullValue);
            console.log('TOTAL:', totalThreshold);
  
            //Check threshold
            if (totalThreshold > 0.7) {
                alert('Image Denied')
            } else {
                console.log('[Image Accepted]')
                const uploadTask = uploadBytes(storageRef, image, metadata);  
                goto("/create-profile/upload-resume");
            }
          })
          .catch((error) => {
            console.error('Error analyzing image:', error);
  
          });
      }
    };
  </script>

    <main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
      <Progressbar class="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="75"/>
    
      <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full mt-16">
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
      color: black;
    }
  
    .no-continue{
      background-color: #ffffff;
      color: #007bff;
    }
  </style>