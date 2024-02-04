<script>
    //This code was developed by Jeremy Mamaril
    import { onMount } from 'svelte';
    import { collection, addDoc } from 'firebase/firestore';
    import { Label, Input } from 'flowbite-svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth, db } from '$lib/firebase/firebase.client.js';
    import { goto } from '$app/navigation';
  
    let userUID, userEmail, firstName, lastName, phoneNumber, occupation, role, major, city, state, connectsRemaining = 5, passesRemaining = 10;
    let success = false;

    let countries = [], states = [], cities = [];
    let selectedCountry = '', selectedState = '', selectedCity = '';

    const API_KEY = 'Wk5MTzFkRGJvUEx3eExmVjZrWEhJRzFlazZiTE9LYUtFUFJqcWIyWQ==';

    onMount(() => {
      fetchCountries();
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
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userUID = user.uid;
        userEmail = user.email;
      }
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!userUID) {
        console.error('User not authenticated');
        return;
      }
  
      const docRef = await addDoc(collection(db, "users"), {
        userCity: selectedCity,
        userConnectsRemaining: connectsRemaining,
        userCountry: selectedCountry,
        // userDateCreated: serverTimestamp(), 
        userEmailAddress: userEmail,
        userFirstName: firstName,
        userID: userUID,
        userLastName: lastName,
        userMajor: major,
        userOccupation: occupation,
        userPassesRemaining: passesRemaining,
        userPhoneNumber: phoneNumber,
        userRole: role.toLowerCase(),
        userState: selectedState
      });
      console.log("Document written with ID:", docRef.id);
      goto("/create-profile/upload-pfp");
    };
  </script>
  
  <main class="flex items-center mt-10 justify-center min-h-screen bg-gray-100 dark:bg-black-800 w-screen">
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
            <Input type="text" id="company" placeholder="Tutor" bind:value={occupation} required />
          </div>
          <div>
            <Label for="phone" class="mb-2">Phone number</Label>
            <Input type="tel" id="phone" placeholder="123-456-7890" bind:value={phoneNumber} required />
          </div>
          <div>
            <Label for="role" class="mb-2">Role</Label>
            <Input type="text" id="role" placeholder="Mentor/Mentee" bind:value={role} required />
          </div>
          <div>
            <Label for="major" class="mb-2">Major</Label>
            <Input type="text" id="major" placeholder="Engineering" bind:value={major} required />
          </div>
          <div>
            <select class="text-gray-900 bg-gray-50 mb-5" bind:value={selectedCountry} on:change={fetchStates}>
              <option value="">Select Country</option>
              {#each countries as country (country.iso2)}
                <option value={country.iso2} key={country.iso2}>{country.name}</option>
              {/each}
            </select>
            <select class="text-gray-900 bg-gray-50 mb-5" bind:value={selectedState} on:change={fetchCities} if={states.length}>
              <option value="">Select State</option>
              {#each states as state (state.id)}
                <option value={state.iso2} key={state.id}>{state.name}</option>
              {/each}
            </select>
            <select class="text-gray-900 bg-gray-50 mb-5" bind:value={selectedCity} if={cities.length}>
              <option value="">Select City</option>
              {#each cities as city (city.id)}
                <option value={city.name} key={city.id}>{city.name}</option>
              {/each}
            </select>
          </div>
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

    a{
      margin-left: 70px;
    }
  </style>

  {#if success}
    <div class="success">
      Successfully created profile!
    </div>
  {/if}
  