<script>
    import { Avatar, Label, Input, GradientButton, Checkbox, A } from 'flowbite-svelte';
</script>

<p>Profile</p>

<div class="flex items-center space-x-10 mt-6">
    <Avatar src="src/routes/profile/Mark Marsala.jpg" data-name="Mark Marsala" border class="ring-blue-600 dark:ring-blue-300" size="lg" dot={{ placement: 'top-right', color: 'green', size: 'lg' }}/>
    <div class="space-y-1 font-medium dark:text-white">
      <div>Mark Marsala</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Joined in September 2023</div>
    </div>
</div>

  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2 mt-6">
      <div>
        <Label for="first_name" class="mb-2">First name</Label>
        <Input type="text" id="first_name" placeholder="First" required />
      </div>
      <div>
        <Label for="last_name" class="mb-2">Last name</Label>
        <Input type="text" id="last_name" placeholder="Last" required />
      </div>
      <div>
        <Label for="company" class="mb-2">Company</Label>
        <Input type="text" id="company" placeholder="Plato" required />
      </div>
      <div>
        <Label for="phone" class="mb-2">Phone number</Label>
        <Input type="tel" id="phone" placeholder="123-45-678" pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"} required />
      </div>
      <div>
        <Label for="website" class="mb-2">Website URL</Label>
        <Input type="url" id="website" placeholder="plato.com" required />
      </div>
      <div>
        <Label for="visitors" class="mb-2">Unique visitors (per month)</Label>
        <Input type="number" id="visitors" placeholder="" required />
      </div>
    </div>
    <div class="mb-6">
      <Label for="email" class="mb-2">Email address</Label>
      <Input type="email" id="email" placeholder="first.last@company.com" required />
    </div>
    <div class="mb-6">
      <Label for="password" class="mb-2">Password</Label>
      <Input type="password" id="password" placeholder="•••••••••" required />
    </div>
    <div class="mb-6">
      <Label for="confirm_password" class="mb-2">Confirm password</Label>
      <Input type="password" id="confirm_password" placeholder="•••••••••" required />
    </div>
    <!-- <Checkbox class="mb-6 space-x-1" required> -->
      <!-- I agree with the <A href="/" class="text-primary-600 dark:text-primary-600 hover:underline">terms and conditions</A>. -->
    <!-- </Checkbox> -->
    <GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
  </form>