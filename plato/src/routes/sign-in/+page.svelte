<script>
  import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';

  let email = '';
  let password = '';

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // Perform form data processing, validation, and submission logic here

    // Redirect the user to the home page after successful login
    window.location.href = '/home';
  };
</script>

<!-- <div class="body-background h-screen w-screen flex items-center justify-center">
  <div class="card-container">
    <Card class="w-72 max-w-none">
      <form class="flex flex-col space-y-6" on:submit={handleSubmit}>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to Plato</h3>
        <Label class="space-y-2">
          <span>Email</span>
          <Input type="email" bind:value={email} placeholder="name@company.com" required />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" bind:value={password} placeholder="••••••••" required />
        </Label>
        <div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a href="/" class="ml-auto text-sm text-blue-600 hover:underline dark:text-primary-500"> Lost password? </a>
        </div>
        <Button type="submit" class="w-full bg-blue-600 hover:opacity-75 hover:bg-blue-600">Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="/" class="text-blue-600 hover:underline dark:text-primary-500"> Create account </a>
        </div>
      </form>
    </Card>
  </div>
</div>

<style>
  .body-background {
    background-image: url('../../lib/assets/placeholderbackground_login.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
</style> -->


<Button color="dark" on:click{handleSubmit}>Mariooo HeHe</Button>