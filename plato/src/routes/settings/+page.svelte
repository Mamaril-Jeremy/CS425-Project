<script>

    //This code is developed by Jeremy Mamaril and Mark Marsala
    import { DarkMode } from 'flowbite-svelte';
    import { authHandlers } from './../../stores/authStore.js';
    import { goto } from '$app/navigation';
  
    let btnClass = 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded';
    let showConfirmationDialog = false

    function handleDelete() {
        showConfirmationDialog = true;       
    };

    const handleConfirmation = async (confirm) => {
      if(confirm){
        await authHandlers.deleteUser();
        goto("/home"); 
      }
      showConfirmationDialog = false;
    }
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 w-screen dark:text-white mt-8">
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-3xl font-semibold mb-6">Settings</h1>
  
      <div class="flex items-center mb-4">
        <p class="flex-grow">Dark Mode</p>
        <DarkMode {btnClass} />
      </div>
  

  
      <!-- Privacy Settings -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Privacy Settings</h2>
        <div class="flex justify-between">
          <p>Make Profile Public</p>
          <span class="text-gray-500">On</span>
        </div>
        <div class="flex justify-between">
          <p>Show Online Status</p>
          <span class="text-gray-500">On</span>
        </div>
      </div>
  
      <div>
        <h2 class="text-xl font-semibold mb-2">Account Settings</h2>
        <div class="flex items-center justify-between">
          Change Email
          <a href="/settings/change-email" class="text-blue-500">Change</a>
        </div>
        <div class="mt-2 mb-2 flex items-center justify-between">
          Change Password
          <a href="/settings/change-password" class="text-blue-500">Change</a>
        </div>
        <div class="flex items-center justify-between mt-2 mb-2">
          Configure MFA
          <a href="/settings/MFA-setup" class="text-blue-500">Setup</a>
        </div>
        <div class="flex items-center justify-between mt-2 mb-2">
          Admin for a University? 
          <a href="create-profile/upload-csv" class="text-blue-500">Create Users</a>
        </div>
        <div class="flex items-center justify-between mt-2 mb-2">
          Delete Account
           <label for="deleteUser" class="text-red-500 cursor-pointer">Delete</label>
            <input id="deleteUser" type="button" class="hidden" on:click={handleDelete} />
        </div>
    </section>
    {#if showConfirmationDialog}
    <div class="confirmation-dialog">
      <p>Are you sure you want to delete your account?</p>
      <button on:click={() => handleConfirmation(true)}>Yes</button>
      <button on:click={() => handleConfirmation(false)}>No</button>
    </div>
    {/if}
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

    .confirmation-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
    }
  </style>
  