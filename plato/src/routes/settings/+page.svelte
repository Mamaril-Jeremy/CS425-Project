<script>
    import { DarkMode } from 'flowbite-svelte';
  
    let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 w-screen">
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-3xl font-semibold mb-6">Settings</h1>
  
      <!-- Dark Mode Toggle -->
      <div class="flex items-center mb-4">
        <p class="flex-grow">Dark Mode</p>
        <DarkMode {btnClass} />
      </div>
  
      <!-- Notification Settings -->
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
        <!-- Add more notification-related settings as needed -->
      </div>
  
      <!-- Privacy Settings -->
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
        <!-- Add more privacy-related settings as needed -->
      </div>
  
      <!-- Account Settings -->
      <div>
        <h2 class="text-xl font-semibold mb-2">Account Settings</h2>
        <div class="flex items-center justify-between">
          <p>Change Email</p>
          <a href="/change-email" class="text-blue-500">Change</a>
          <p>Change Password</p>
          <a href="/change-password" class="text-blue-500">Change</a>
        </div>
        <!-- Add more account-related settings as needed -->
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
  