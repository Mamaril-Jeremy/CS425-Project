<script>
  // This code was developed by Jeremy Mamaril
  import { onMount } from 'svelte';
  import { collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { Avatar, Label, Input, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import Pfp from '$lib/assets/jeremy.png';

  let userUID, firstName, lastName, phoneNumber, occupation, role, major, country, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localPhoneNumber, localOccupation, localRole, localMajor;
  let success = false;

  let countries = [], states = [], cities = [];

  let selectedCountry = '', selectedState = '', selectedCity = '';
  
  const API_KEY = 'Wk5MTzFkRGJvUEx3eExmVjZrWEhJRzFlazZiTE9LYUtFUFJqcWIyWQ==';

  onMount(() => {
    fetchCountries();
  });

  onAuthStateChanged(auth, (user) => {
      if (user) {
          userUID = user.uid;
          fetchData();
      }
  });

  const fetchCountries = () => {
    fetch("https://api.countrystatecity.in/v1/countries", getRequestOptions())
      .then(response => response.json())
      .then(data => {
        countries = data;
      })
      .catch(error => console.error('Error fetching countries:', error));
  };
  
  const fetchStates = () => {
    if (!selectedCountry) return;

    fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, getRequestOptions())
      .then(response => response.json())
      .then(data => {
        states = data;
      })
      .catch(error => console.error('Error fetching states:', error));
  };

  const fetchCities = () => {
    if (!selectedCountry || !selectedState) return;
    console.log(selectedCountry);
    console.log(selectedState)

    fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, getRequestOptions())
      .then(response => response.json())
      .then(data => {
        cities = data;
      })
      .catch(error => console.error('Error fetching cities:', error));
  };

  const getRequestOptions = () => {
    return {
      method: 'GET',
      headers: {
        'X-CSCAPI-KEY': API_KEY
      },
      redirect: 'follow'
    };
  };

  const fetchData = async () => {
      const userRef = collection(db, "users");
      const q = query(userRef, where("userID", "==", userUID));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          {
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
              country = data.userCountry;
          }
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
              userCountry: selectedCountry,
              userCity: selectedCity,
              userState: selectedState
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
            <select class="text-gray-900 bg-gray-50" bind:value={selectedCountry} on:change={fetchStates}>
              <option value="">Select Country</option>
              {#each countries as country (country.iso2)}
                <option value={country.iso2} key={country.iso2}>{country.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <select class="text-gray-900 bg-gray-50" bind:value={selectedState} on:change={fetchCities} if={states.length}>
              <option value="">Select State</option>
              {#each states as state (state.id)}
                <option value={state.iso2} key={state.id}>{state.name}</option>
              {/each}
            </select>
            <select class="text-gray-900 bg-gray-50" bind:value={selectedCity} if={cities.length}>
              <option value="">Select City</option>
              {#each cities as city (city.id)}
                <option value={city.name} key={city.id}>{city.name}</option>
              {/each}
            </select>
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
          <Button type="submit" color="blue">Update</Button>
        </div>
      </form>
    </div>
  </body>




