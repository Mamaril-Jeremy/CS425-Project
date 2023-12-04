<script>
  import { collection, addDoc } from 'firebase/firestore';
  import { Avatar, Label, Input, GradientButton, Checkbox, A } from 'flowbite-svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import Pfp from "$lib/assets/Mark Marsala.jpg";

  let userUID, firstName, lastName, email, phoneNumber, occupation, role, connectsRemaining, passesRemaining;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
    }
  });

  const handleClick = async (e) => {
    if (!userUID) {
      console.error('User not authenticated');
      return;
    }

    const docRef = await addDoc(collection(db, "users"), {
      userLastName: lastName,
      userEmailAddress: email,
      userOccupation: occupation,
      userRole: role.toLowerCase() === 'mentor',
      userConnectsRemaining: connectsRemaining,
      userPhoneNumber: phoneNumber,
      userPassesRemaining: passesRemaining,
      userID: userUID,
      userFirstName: firstName
    });
    console.log("Document written with ID: ", docRef.id);
  };
</script>

<style>
  .user-info-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-top: 60px;
  }

  .form-container {
    position: relative;
    margin-top: 150px;
  }

  .centered-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>

<body>
  <div class="user-info-container">
    <div class="flex items-center space-x-10">
      <Avatar src="{Pfp}" data-name="Mark Marsala" border class="ring-blue-600 dark:ring-blue-300" size="lg"
        dot={{ placement: 'top-right', color: 'green', size: 'lg' }} />
      <div class="space-y-1 font-medium dark:text-black">
        <div>Mark Marsala</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Joined in September 2023</div>
      </div>
    </div>
  </div>

  <div class="form-container">
    <form on:submit={handleClick}>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label for="first_name" class="mb-2">First name</Label>
          <Input type="text" id="first_name" placeholder="First" bind:value={firstName} required />
        </div>
        <div>
          <Label for="last_name" class="mb-2">Last name</Label>
          <Input type="text" id="last_name" placeholder="Last" bind:value={lastName} required />
        </div>
        <div>
          <Label for="company" class="mb-2">Occupation</Label>
          <Input type="text" id="company" placeholder="Plato" bind:value={occupation} required />
        </div>
        <div>
          <Label for="phone" class="mb-2">Phone number</Label>
          <Input type="tel" id="phone" placeholder="123-456-7890"
            bind:value={phoneNumber} required />
        </div>
        <div>
          <Label for="role" class="mb-2">Role</Label>
          <Input type="text" id="role" placeholder="mentor/mentee" bind:value={role} required />
        </div>
        <div>
          <Label for="visitors" class="mb-2">Connects Remaining</Label>
          <Input type="number" id="visitors" placeholder="" bind:value={connectsRemaining} required />
        </div>
      </div>
      <div>
        <Label for="passes" class="mb-2">Passes Remaining</Label>
        <Input class="mb-3" type="number" id="passes" placeholder="" bind:value={passesRemaining} required />
      </div>
      <div>
        <Label for="email" class="mb-2">Email</Label>
        <Input class="mb-3" type="email" id="email" placeholder="name@domain.com" bind:value={email} required />
      </div>
      <div class="centered-button">
        <GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
      </div>
    </form>
  </div>
</body>
