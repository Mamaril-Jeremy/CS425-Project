<script>
  import { collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { Avatar, Label, Input, GradientButton } from 'flowbite-svelte';
  import Pfp from '$lib/assets/Mark Marsala.jpg';

  let userUID, firstName, lastName, email, phoneNumber, occupation, role, major, city, state, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localEmail, localPhoneNumber, localOccupation, localRole, localMajor, localCity, localState;
  let success = false;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
      fetchData();
    }
  });

  const fetchData = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("userID", "==", userUID));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      firstName = data.userFirstName;
      lastName = data.userLastName;
      email = data.userEmailAddress;
      occupation = data.userOccupation;
      role = data.userRole;
      connectsRemaining = data.userConnectsRemaining;
      phoneNumber = data.userPhoneNumber;
      passesRemaining = data.userPassesRemaining;
      userUID = data.userID;
      major = data.userMajor;
      city = data.userCity;
      state = data.userState;
    } else {
      console.log('No such document!');
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

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
    major = localMajor;
    city = localCity;
    state = localState;

    const userRef = collection(db, "users");
    const q = query(userRef, where("userID", "==", userUID));

    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0].ref;

    try {
      await updateDoc(docRef, {
        userLastName: lastName,
        userEmailAddress: email,
        userOccupation: occupation,
        userRole: role.toLowerCase(),
        userConnectsRemaining: connectsRemaining,
        userPhoneNumber: phoneNumber,
        userPassesRemaining: passesRemaining,
        userID: userUID,
        userFirstName: firstName,
        userMajor: major,
        userCity: city,
        userState: state
      });
      console.log('Document updated with ID:', docRef.id);
      success = true;
    } catch (error) {
      console.error('Error updating document:', error.message);
      success = false;
    }
  };
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-info-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    margin-top: 150px;
  }

  .success {
    margin: 25px auto;
    font-size: 20px;
    color: rgb(113, 174, 21);
    text-align: center;
  }

  .form-container {
    margin-top: 20px; 
  }

  .centered-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
  }

  .constants {
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
  <div class="wrapper">
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

    {#if success}
    <div class="success">
      Successfully updated profile!
    </div>
    {/if}

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
          <Input type="text" id="company" placeholder="Tutor" bind:value={localOccupation} required />
        </div>
        <div>
          <Label for="phone" class="mb-2">Phone number</Label>
          <Input type="tel" id="phone" placeholder="123-456-7890" bind:value={localPhoneNumber} required />
        </div>
        <div>
          <Label for="role" class="mb-2">Role</Label>
          <Input type="text" id="role" placeholder="Mentor/Mentee" bind:value={localRole} required />
        </div>
        <div>
          <Label for="major" class="mb-2">Major</Label>
          <Input type="text" id="major" placeholder="Engineering" bind:value={localMajor} required />
        </div>
        <div>
          <Label for="city" class="mb-2">City</Label>
          <Input type="text" id="city" placeholder="Dallas" bind:value={localCity} required />
        </div>
        <div>
          <div>
            <Label for="state" class="mb-2">State</Label>
            <Input type="text" id="state" placeholder="Texas" bind:value={localState} required />
          </div>
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
        <GradientButton type="submit" color="purpleToBlue">Update</GradientButton>
      </div>
    </form>
  </div>

</body>
