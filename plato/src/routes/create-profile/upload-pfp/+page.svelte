<script>
  import { getStorage, ref, uploadBytes } from 'firebase/storage';
  import { goto } from '$app/navigation';

  let image;
  let isButtonBlue = false;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];

    if (file && allowedTypes.includes(file.type)) {
      image = file;
      isButtonBlue = true;
    } else {
      alert("Please upload a valid image file (png, jpg, jpeg, pdf).");
      isButtonBlue = false;
    }
  };

  const handleContinue = async () => {
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + image.name);

      await uploadBytes(storageRef, image);

      goto("/home");
    } else {
      alert("Please upload a valid image file (png, jpg, jpeg, pdf) before continuing.");
    }
  };
</script>

<main>
  <div class="center">
    <h1>Upload A Professional Image</h1>

    <label for="upload">Upload Image (png, jpg, jpeg, pdf):</label>
    <input type="file" id="upload" accept=".png, .jpg, .jpeg, .pdf" on:change={handleImageUpload} />

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
    background-color: #007bff;
    color: white;
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

  

<!-- function isContentLikelyBlocked(safeSearchAnnotation) {
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