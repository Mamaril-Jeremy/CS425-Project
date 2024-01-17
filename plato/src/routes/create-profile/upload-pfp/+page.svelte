<script>
	import { goto } from '$app/navigation';

    let image;
    let isButtonBlue = false;
  
    const handleImageUpload = (event) => {
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
  
    const handleContinue = () => {
      // Check if an image is uploaded before allowing user to continue
      if (image) {
        // Perform any additional actions before continuing
        goto("/home");
  
        // Add your logic here to proceed further
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
  
      <button on:click={handleContinue} class:blue={isButtonBlue}>Continue</button>
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
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
  
    .blue {
      background-color: #007bff;
    }
  </style>
  