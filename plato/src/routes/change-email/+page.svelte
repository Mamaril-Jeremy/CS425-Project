<script>
  //This code was developed by Mark Marsala
  import { Label, Input, GradientButton } from 'flowbite-svelte';
  import { authHandlers } from "../../stores/authStore.js"
  import { goto } from '$app/navigation';

  let formData = {
    newEmail: '',
    password: ''
  };

  async function handleSubmit() {
    const { newEmail, password } = formData;

    if (!newEmail || !password) {
      return;
    }

    try {
      await authHandlers.verifyNewEmail(newEmail);
      goto('/home');
    } catch (err) {
      console.log(err);
    }
  }
</script>

<body>
  <div class="title">Update Your Email</div>
  <div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-6">
        <Label for="email" class="mb-2">New email address</Label>
        <Input type="email" id="email" placeholder="first.last@company.com" required bind:value={formData.newEmail} />
      </div>
      <div class="mb-6">
        <Label for="password" class="mb-2">Password</Label>
        <Input type="password" id="password" placeholder="•••••••••" required bind:value={formData.password}/>
      </div>
      <div class="centered-button">
        <GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
      </div>
    </form>
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
  margin-top: 16px; 
}
</style>
