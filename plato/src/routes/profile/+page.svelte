<script>
  //This code was developed by Jeremy Mamaril
  import { collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { Avatar, Label, Input, GradientButton } from 'flowbite-svelte';
  import Pfp from '$lib/assets/jeremy.png';

  let userUID, firstName, lastName, phoneNumber, occupation, role, major, city, state, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localPhoneNumber, localOccupation, localRole, localMajor, localCity, localState;
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
    margin-top: 50px; 
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
      <div class="flex items-center space-x-10 text-xl">
        <Avatar src="{Pfp}" data-name="Mark Marsala" border class="ring-blue-600 dark:ring-blue-300" size="lg"
          dot={{ placement: 'top-right', color: 'green', size: 'lg' }} />
        <div class="space-y-1 font-medium dark:text-black">
          <div>{firstName} {lastName}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Joined in December 2023</div>
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
          <Label for="first_name" class="mb-2 text-l">First name: {firstName}</Label>
          <Input type="text" id="first_name" placeholder="First" bind:value={localFirstName} required />
        </div>
        <div>
          <Label for="last_name" class="mb-2 text-l">Last name: {lastName}</Label>
          <Input type="text" id="last_name" placeholder="Last" bind:value={localLastName} required />
        </div>
        <div>
          <Label for="company" class="mb-2 text-l">Occupation: {occupation}</Label>
          <Input type="text" id="company" placeholder="Tutor" bind:value={localOccupation} required />
        </div>
        <div>
          <Label for="phone" class="mb-2 text-l">Phone number: {phoneNumber}</Label>
          <Input type="tel" id="phone" placeholder="123-456-7890" title="Please enter a valid phone number (e.g., 123-456-7890)" bind:value={localPhoneNumber} required />
        </div>        
        <div>
          <Label for="role" class="mb-2 text-l">Role: {role}</Label>
          <Input type="text" id="role" placeholder="Mentor/Mentee" bind:value={localRole} required />
        </div>
        <div>
          <Label for="major" class="mb-2 text-l">Major: {major}</Label>
          <Input type="text" id="major" placeholder="Engineering" bind:value={localMajor} required />
        </div>
        <div>
          <Label for="city" class="mb-2 text-l">City: {city}</Label>
          <Input type="text" id="city" placeholder="Dallas" bind:value={localCity} required />
        </div>
        <div>
          <div>
            <Label for="state" class="mb-2 text-l">State: {state}</Label>
            <Input type="text" id="state" placeholder="Texas" bind:value={localState} required />
          </div>
        </div>
        <div>
          <Label for="visitors" class="mb-2 text-l">Connects Remaining</Label>
          <div class="constants">{connectsRemaining}</div>
        </div>
        <div>
          <Label for="visitors" class="mb-2 text-l">Passes Remaining</Label>
          <div class="constants">{passesRemaining}</div>
        </div>
      </div>
      <div class="centered-button">
        <GradientButton type="submit" color="purpleToBlue">Update</GradientButton>
      </div>
    </form>
  </div>

</body>
