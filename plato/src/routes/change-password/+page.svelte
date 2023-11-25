<script>
    import { Label, Input, GradientButton } from 'flowbite-svelte';
    import { authHandlers } from "../../stores/authStore.js"
    import { goto } from '$app/navigation';
    let email;
    let newPassword;
    let confirmNewPassword;

    async function handleSubmit() {
      if(!email || !newPassword || !confirmNewPassword)
      {
        return
      }

      if(newPassword === confirmNewPassword) {
        try {
          await authHandlers.updatePassword(newPassword);
          goto('/home')
        } catch (err) {
          console.log(err)
        }
      }
    }
</script>

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
    <div class="centered-button"><GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
    </div>
  </form>
</div>


<style>
    .form-container {
      position: relative;
      margin-top: 75px;
    }

    .centered-button{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
</style>