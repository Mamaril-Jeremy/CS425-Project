<script>
    let formData = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  
    function handleSubmit() {
      // Add your account creation logic here
      console.log('Form submitted:', formData);
    }
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 w-screen">
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-3xl font-semibold mb-6">Create Account</h1>
  
      <form on:submit|preventDefault={handleSubmit}>
        <!-- Username -->
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
          <input type="text" id="username" name="username" autocomplete="username" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.username} required />
        </div>
  
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email address</label>
          <input type="email" id="email" name="email" autocomplete="email" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.email} required />
        </div>
  
        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" name="password" autocomplete="new-password" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.password} required />
        </div>
  
        <!-- Confirm Password -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password" class="mt-1 p-2 w-full border rounded-md" bind:value={formData.confirmPassword} required />
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Create Account
        </button>
      </form>
    </section>
  </main>
  
  <style>
    main {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    section {
      background: white;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
  
    input {
      width: 100%;
    }
  
    button {
      cursor: pointer;
    }
  </style>
  