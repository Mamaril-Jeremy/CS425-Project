<script>
  //This code is developed by Jeremy Mamaril and Mark Marsala
    import { DarkMode } from 'flowbite-svelte';
  
    let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 w-screen mt-8">
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-3xl font-semibold mb-6">Settings</h1>
  
      <div class="flex items-center mb-4">
        <p class="flex-grow">Dark Mode</p>
        <DarkMode {btnClass} />
      </div>
  
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Notification Settings</h2>
        <div class="flex justify-between">
          <p>Receive Notifications</p>
          <span class="text-gray-500">On</span>
        </div>
        <div class="flex justify-between">
          <p>Email Notifications</p>
          <span class="text-gray-500">On</span>
        </div>
      </div>

      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Privacy Settings</h2>
        <div class="flex justify-between">
          <p>Make Profile Public</p>
          <span class="text-gray-500">Off</span>
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
        <div class="mt-2 mb-2 flex items-center justify-between">
          Configure MFA
          <a href="/settings/MFA-setup" class="text-blue-500 ml-4">Setup</a>
        </div>
         <div class="mt-2 mb-2 flex items-center justify-between">
           Admin for a University? 
           <a href="create-profile/upload-csv" class="text-blue-500 ml-4">Create Users</a>
         </div>

      </div>
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
  </style>
  