<script>
  import { collection, setDoc, getDoc, doc } from 'firebase/firestore';
  import { Avatar, Label, Input, GradientButton } from 'flowbite-svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import Pfp from "$lib/assets/Mark Marsala.jpg";

  let userUID, firstName, lastName, email, phoneNumber, occupation, role, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localEmail, localPhoneNumber, localOccupation, localRole;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
    }
  });

  const fetchData = async () => {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      lastName = data.userLastName
      emailAddress = data.userEmailAddress
      occupation = data.userOccupation
      role = data.userRole
      connectsRemaining = data.userConnectsRemaining
      phoneNumber = data.userPhoneNumber
      passesRemaining = data.userPassesRemaining
      userUID = data.userID
      firstName = data.userFirstName

    } else {
      console.log("No such document!");
    }
  };

  const handleClick = async (e) => {
    if (!userUID) {
      console.error('User not authenticated');
      return;
    }

    firstName = localFirstName;
    lastName = localLastName;
    email = localEmail;
    phoneNumber = localPhoneNumber;
    occupation = localOccupation;
    role = localRole;

    const docRef = await setDoc(collection(db, "users", userUID), {
      userLastName: lastName,
      userEmailAddress: email,
      userOccupation: occupation,
      userRole: role.toLowerCase(),
      userConnectsRemaining: connectsRemaining,
      userPhoneNumber: phoneNumber,
      userPassesRemaining: passesRemaining,
      userID: userUID,
      userFirstName: firstName
    });
    console.log("Document written with ID: ", docRef.id);
  };

  $: fetchData();
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
    margin-top: 200px;
  }

  .centered-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
  }

  .constants{
    display: flex;
    margin: 25px auto;
    font-size: 20px;
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
        <div>{firstName} {lastName}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Joined in September 2023</div>
      </div>
    </div>
  </div>

  <div class="form-container">
    <form on:submit={handleClick}>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label for="first_name" class="mb-2">First name</Label>
          <Input type="text" id="first_name" placeholder="First" bind:value={localFirstName} required />
        </div>
        <div>
          <Label for="last_name" class="mb-2">Last name</Label>
          <Input type="text" id="last_name" placeholder="Last" bind:value={localLastName} required />
        </div>
        <div>
          <Label for="company" class="mb-2">Occupation</Label>
          <Input type="text" id="company" placeholder="Plato" bind:value={localOccupation} required />
        </div>
        <div>
          <Label for="phone" class="mb-2">Phone number</Label>
          <Input type="tel" id="phone" placeholder="123-456-7890"
            bind:value={localPhoneNumber} required />
        </div>
        <div>
          <Label for="role" class="mb-2">Role</Label>
          <Input type="text" id="role" placeholder="mentor/mentee" bind:value={localRole} required />
        </div>
        <div>
          <Label for="role" class="mb-2">Role</Label>
          <Input type="text" id="role" placeholder="mentor/mentee" required />
        </div>
        <div>
          <Label for="visitors" class="mb-2">Connects Remaining</Label>
          <div class="constants">{connectsRemaining}</div>
        </div>
        <div>
          <Label for="visitors" class="mb-2">Passes Remaining</Label>
          <div class="constants">{passesRemaining}</div>
        </div>
      </div>
      <div>
        <Label for="email" class="mb-2">Email</Label>
        <Input class="mb-3" type="email" id="email" placeholder="name@domain.com" bind:value={localEmail} required />
      </div>
      <div class="centered-button">
        <GradientButton type="submit" color="purpleToBlue">Submit</GradientButton>
      </div>
    </form>
  </div>
</body>
