<script>
  //This code was developed by Mark Marsala
import { Label, Input, GradientButton } from 'flowbite-svelte';
import { authHandlers } from "../../stores/authStore.js"
import { goto } from '$app/navigation';

let email;
let newPassword;
let confirmNewPassword;
let showConfirmationDialog = false;
let passwordMatchError = false;
let passwordLengthError = false;
let passwordRequirementsError = false;

const MIN_PASSWORD_LENGTH = 8;

async function handleSubmit() {
  if (!email || !newPassword || !confirmNewPassword) {
    return;
  }

  // Reset error flags
  passwordMatchError = false;
  passwordLengthError = false;
  passwordRequirementsError = false;

  if (newPassword === confirmNewPassword) {
    if (newPassword.length >= MIN_PASSWORD_LENGTH) {
      // Check for additional password requirements
      if (newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        // Show confirmation dialog only if no errors
        showConfirmationDialog = true;
      } else {
        passwordRequirementsError = true;
      }
    } else {
      passwordLengthError = true;
    }
  } else {
    passwordMatchError = true;
  }
}

function handleConfirmation(confirm) {
  showConfirmationDialog = false;
  if (confirm) {
    // User confirmed, update the password
    updatePassword();
  }
}

async function updatePassword() {
  try {
    await authHandlers.updatePassword(newPassword);
    goto('/home');
  } catch (err) {
    console.log(err);
  }
}
</script>

<body>
  <div class="title">Update Your Password</div>
  <div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="first.last@company.com" required bind:value={email} />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">New password</Label>
      <Input type="password" id="password" placeholder="•••••••••" required bind:value={newPassword}/>
    </div>
    <div class="mb-6">
      <Label for="confirm_password" class="mb-2">Confirm new password</Label>
      <Input type="password" id="confirm_password" placeholder="•••••••••" required bind:value={confirmNewPassword}/>
    </div>
    
    {#if passwordMatchError}
      <p class="text-red-500 mb-2">Passwords must match</p>
    {/if}
    
    {#if passwordLengthError}
      <p class="text-red-500 mb-2">Password must be at least {MIN_PASSWORD_LENGTH} characters long</p>
    {/if}
    
    {#if passwordRequirementsError}
      <p class="text-red-500 mb-2">Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character</p>
    {/if}
    
    <div class="centered-button">
      <GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
    </div>
    </form>
    
    {#if showConfirmationDialog}
    <div class="confirmation-dialog">
      <p>Are you sure you want to change your password?</p>
      <button on:click={() => handleConfirmation(true)}>Yes</button>
      <button on:click={() => handleConfirmation(false)}>No</button>
    </div>
    {/if}
    </div>
</body>


<style>
body {
  display: flex;
  flex-direction: column; 
  align-items: center;
  height: 100vh;
  justify-content: center;
}

.title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 60px;
}

.form-container {
  text-align: center;
  width: 50%;
}

.centered-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
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