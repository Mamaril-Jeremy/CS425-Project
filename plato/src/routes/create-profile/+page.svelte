<script>
    import { collection, setDoc, getDoc, doc, addDoc } from 'firebase/firestore';
    import { Avatar, Label, Input, GradientButton } from 'flowbite-svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth, db } from '$lib/firebase/firebase.client.js';
    import { goto } from '$app/navigation';
  
    let userUID, username, firstName, lastName, email, phoneNumber, occupation, role, connectsRemaining = 5, passesRemaining = 10;
    let success = false;
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userUID = user.uid;
      }
    });
  
    const fetchData = async () => {
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        lastName = data.userLastName;
        email = data.userEmailAddress;
        occupation = data.userOccupation;
        role = data.userRole;
        connectsRemaining = data.userConnectsRemaining;
        phoneNumber = data.userPhoneNumber;
        passesRemaining = data.userPassesRemaining;
        userUID = data.userID;
        firstName = data.userFirstName;
      } else {
        console.log("No such document!");
      }
    };
  
    fetchData();
  
    const handleSubmit = async (e) => {
      if (!userUID) {
        console.error('User not authenticated');
        return;
      }
  
      const docRef = await addDoc(collection(db, "users"), {
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
      console.log("Document written with ID:", docRef.id);
      success = true;
      goto("/home")
    };
  </script>
  
  <main class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
    <section class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 class="text-3xl font-semibold mb-6">Create Your Profile</h1>
    
      <form on:submit={handleSubmit}>
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
            <Input type="tel" id="phone" placeholder="123-456-7890" bind:value={phoneNumber} required />
          </div>
          <div>
            <Label for="role" class="mb-2">Role</Label>
            <Input type="text" id="role" placeholder="mentor/mentee" bind:value={role} required />
          </div>
        </div>
        <div>
          <Label for="email" class="mb-2">Email</Label>
          <Input class="mb-3" type="email" id="email" placeholder="name@domain.com" bind:value={email} required />
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Create Account
        </button>
  
        <div class="mt-6">
         Already have an account? <a href="/sign-in">Sign In</a> Instead!
        </div>
      </form>
    </section>
  </main>
  
  <style>
    main {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    section {
      background: white;
    }

    button {
      cursor: pointer;
    }
  </style>

  {#if success}
    <div class="success">
      Successfully created profile!
    </div>
  {/if}
  