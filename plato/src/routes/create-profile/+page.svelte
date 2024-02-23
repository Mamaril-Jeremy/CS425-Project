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
            <select class="text-gray-900 bg-gray-50 w-full" bind:value={occupation}>
              <option value="Accountant">Accountant</option>
              <option value="Actor">Actor</option>
              <option value="Archaeologist">Archaeologist</option>
              <option value="Architect">Architect</option>
              <option value="Artist">Artist</option>
              <option value="Astronomer">Astronomer</option>
              <option value="Athlete">Athlete</option>
              <option value="Biologist">Biologist</option>
              <option value="Chemist">Chemist</option>
              <option value="Chef">Chef</option>
              <option value="Civil Engineer">Civil Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Dentist">Dentist</option>
              <option value="Detective">Detective</option>
              <option value="Doctor">Doctor</option>
              <option value="Electrician">Electrician</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Event Planner">Event Planner</option>
              <option value="Fashion Designer">Fashion Designer</option>
              <option value="Filmmaker">Filmmaker</option>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="Geologist">Geologist</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Historian">Historian</option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Journalist">Journalist</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Mathematician">Mathematician</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Mechanical Engineer">Mechanical Engineer</option>
              <option value="Musician">Musician</option>
              <option value="Network Administrator">Network Administrator</option>
              <option value="Nurse">Nurse</option>
              <option value="Paramedic">Paramedic</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Phlebotomist">Phlebotomist</option>
              <option value="Photographer">Photographer</option>
              <option value="Physicist">Physicist</option>
              <option value="Pilot">Pilot</option>
              <option value="Police Officer">Police Officer</option>
              <option value="Psychologist">Psychologist</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Software Architect">Software Architect</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Social Worker">Social Worker</option>
              <option value="Teacher">Teacher</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Writer">Writer</option>
              <option value="Zoologist">Zoologist</option>
            </select>
          </div>
          <div>
            <Label for="phone" class="mb-2">Phone number</Label>
            <Input type="tel" id="phone" placeholder="123-456-7890" bind:value={phoneNumber} required />
          </div>
          <div>
            <Label for="role" class="mb-2">Role</Label>
            <select class="text-gray-900 bg-gray-50 w-full" bind:value={role}>
              <option value="Mentor">Mentor</option>
              <option value="Mentee">Mentee</option>
            </select>
          </div>
          <div>
            <Label for="major" class="mb-2">Major</Label>
            <select class="text-gray-900 bg-gray-50 w-full" bind:value={major}>
              <option value="accounting">Accounting</option>
              <option value="agriculture">Agriculture</option>
              <option value="anthropology">Anthropology</option>
              <option value="architecture">Architecture</option>
              <option value="art">Art and Design</option>
              <option value="biology">Biology</option>
              <option value="business">Business Administration</option>
              <option value="chemistry">Chemistry</option>
              <option value="communication">Communication Studies</option>
              <option value="computerScience">Computer Science</option>
              <option value="economics">Economics</option>
              <option value="education">Education</option>
              <option value="engineering">Engineering</option>
              <option value="english">English Literature</option>
              <option value="environmentalScience">Environmental Science</option>
              <option value="finance">Finance</option>
              <option value="geography">Geography</option>
              <option value="healthScience">Health Science</option>
              <option value="internationalRelations">International Relations</option>
              <option value="linguistics">Linguistics</option>
              <option value="management">Management</option>
              <option value="marineBiology">Marine Biology</option>
              <option value="microbiology">Microbiology</option>
              <option value="nutrition">Nutrition</option>
              <option value="philosophy">Philosophy</option>
              <option value="physics">Physics</option>
              <option value="politicalScience">Political Science</option>
              <option value="psychology">Psychology</option>
              <option value="graphicDesign">Graphic Design</option>
              <option value="sociology">Sociology</option>
          </select>
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
  