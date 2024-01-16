<script>
  //This code was developed by Jeremy Mamaril
  import { collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { Avatar, Label, Input, Button } from 'flowbite-svelte';
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

<body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div class="wrapper">
    <div class="user-info-container">
      <div class="flex items-center space-x-10 text-xl">
        <Avatar src="{Pfp}" data-name="Mark Marsala" border class="ring-blue-600 dark:ring-blue-300" size="lg"
          dot={{ placement: 'top-right', color: 'green', size: 'lg' }} />
        <div class="space-y-1 font-medium dark:text-black">
          <div>{firstName} {lastName}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Joined in December 2023</div>
          <div class="text-sm dark:text-black"><span class="material-symbols-outlined">edit</span><a href="/profile/edit-profile">Edit Profile</a></div>
        </div>
      </div>
    </div>

  <div class="form-container">
    <form on:submit={handleClick}>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label for="first_name" class="mb-2 text-l">Name: {firstName} {lastName}</Label>
        </div>
        <div>
          <Label for="company" class="mb-2 text-l">Occupation: {occupation}</Label>
        </div>
        <div>
          <Label for="phone" class="mb-2 text-l">Phone number: {phoneNumber}</Label>
        </div>        
        <div>
          <Label for="role" class="mb-2 text-l">Role: {role}</Label>
        </div>
        <div>
          <Label for="major" class="mb-2 text-l">Major: {major}</Label>
        </div>
        <div>
          <Label for="city" class="mb-2 text-l">City: {city}</Label>
        </div>
        <div>
          <div>
            <Label for="state" class="mb-2 text-l">State: {state}</Label>
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
    </form>
  </div>

</body>

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

  .form-container {
    margin-top: 50px; 
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

  .material-symbols-outlined {
    font-size: 20px; 
    margin: 10px px auto;
  }

  a{
    color: black;
  }
</style>


