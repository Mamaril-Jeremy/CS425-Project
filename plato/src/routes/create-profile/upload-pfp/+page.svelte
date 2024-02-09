<script>
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { getStorage, ref, uploadBytes } from 'firebase/storage';
  import { testExplicitContentDetectionFromFile } from '$lib/assets/imagefilter.js'; // Import content detection functions
  import { goto } from '$app/navigation';

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
      const uploadTask = uploadBytes(storageRef, image, metadata);

      uploadTask.then(async () => {
        // Call content detection function
        const contentBlocked = await testExplicitContentDetectionFromFile(storageRef);
        
        if (!contentBlocked) {
          // Proceed to the next page
          goto("/home");
        } else {
          // Content is blocked, handle accordingly
          alert("Content is blocked due to explicit content. Please upload a different image.");
        }
      }).catch((error) => {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image. Please try again later.");
      });
    } else {
      alert("Please upload a valid image file (png, jpg, jpeg) before continuing.");
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


  

<!-- const { ImageAnnotatorClient } = require('@google-cloud/vision');
const fs = require('fs');

// Assuming the credentials JSON file is named 'your-credentials-file.json' in the same directory.
const credentialsPath = './safesearch-api-test-978a34fe91ce.json';

// Check if the credentials file exists before creating the client.
if (!fs.existsSync(credentialsPath)) {
  console.error('Error: Credentials file not found. Make sure it exists in the current directory.');
  process.exit(1);
}

const client = new ImageAnnotatorClient({ keyFilename: credentialsPath });

// Get the command-line arguments
const command = process.argv[2];
const input = process.argv[3];

// Decide whether to use a link or a local file based on the command-line argument
if (command === 'link') {
  testExplicitContentDetection(input);
} else if (command === 'file') {
  testExplicitContentDetectionFromFile(input);
} else {
  console.error('Error: Please specify whether to use "link" or "file" and provide the corresponding input.');
  console.error('Link: node vision-api-proof.js link <insertimagelinkhere>');
  console.error('Image: node vision-api-proof.js file <path/to/local/file>');
  process.exit(1);
}

async function testExplicitContentDetection(input) {
  try {
    const [result] = await client.safeSearchDetection(input);
    processResults(result.safeSearchAnnotation);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
}

async function testExplicitContentDetectionFromFile(input) {
  try {
    const content = fs.readFileSync(input);
    const [result] = await client.safeSearchDetection(content);
    processResults(result.safeSearchAnnotation);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
}

function processResults(safeSearchAnnotation) {
  console.log('Safe Search Annotation:');
  console.log(`Adult: ${safeSearchAnnotation.adult}`);
  console.log(`Spoof: ${safeSearchAnnotation.spoof}`);
  console.log(`Medical: ${safeSearchAnnotation.medical}`);
  console.log(`Violence: ${safeSearchAnnotation.violence}`);
  console.log(`Racy: ${safeSearchAnnotation.racy}`);

  if (isContentLikelyBlocked(safeSearchAnnotation)) {
    console.log('Content has been blocked.');
  } else {
    console.log('Content is allowed.');
  }
}

function isContentLikelyBlocked(safeSearchAnnotation) {
  // Check if any category is likely
  if (
    safeSearchAnnotation.adult === 'LIKELY' ||
    safeSearchAnnotation.medical === 'LIKELY' ||
    safeSearchAnnotation.violence === 'LIKELY' ||
    safeSearchAnnotation.racy === 'LIKELY'
  ) {
    console.log('Likely blocked content:');
    if (safeSearchAnnotation.adult === 'LIKELY') {
      console.log('- Adult content');
    }
    if (safeSearchAnnotation.medical === 'LIKELY') {
      console.log('- Medical content');
    }
    if (safeSearchAnnotation.violence === 'LIKELY') {
      console.log('- Violent content');
    }
    if (safeSearchAnnotation.racy === 'LIKELY') {
      console.log('- Racy content');
    }
    return true;
  }

  return false;
} -->