<script>
  // This code was developed by Jeremy Mamaril
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getStorage, getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { Avatar, Label, Input, Button} from 'flowbite-svelte';
  import axios from 'axios';

  let image, userUID, userEmail, firstName, lastName, phoneNumber, occupation, role, major, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localPhoneNumber, localOccupation, localRole, localMajor;
  let success = false, avatarUrl;

  let countries = [], states = [], cities = [];

  let selectedCountry = '', selectedState = '', selectedCity = '';
  
  const API_KEY = 'Wk5MTzFkRGJvUEx3eExmVjZrWEhJRzFlazZiTE9LYUtFUFJqcWIyWQ==';

  onMount(() => {
    fetchCountries();
  });

  onAuthStateChanged(auth, (user) => {
      if (user) {
          userUID = user.uid;
          userEmail = user.email;
          fetchData();
          downloadAvatar(userUID);
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

    fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry.iso2}/states`, getRequestOptions())
      .then(response => response.json())
      .then(data => {
        states = data;
      })
      .catch(error => console.error('Error fetching states:', error));
  };

  const fetchCities = () => {
    if (!selectedCountry || !selectedState) return;

    fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry.iso2}/states/${selectedState.iso2}/cities`, getRequestOptions())
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
    const data = { "user_id": userUID }; 
    try {
        const response = await fetch('http://localhost:5000/get_user_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        let user_data = responseData.users;
        firstName = user_data.userFirstName;
        lastName = user_data.userLastName;
        phoneNumber = user_data.userPhoneNumber;
        occupation = user_data.userOccupation;
        role = user_data.userRole;
        major = user_data.userMajor;
    } catch (error) {
        console.error('Error:', error);
    }
}

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

    const data =  {
      userCity: selectedCity,
      userConnectsRemaining: connectsRemaining,
      userCountry: selectedCountry.name,
      userEmailAddress: userEmail,
      userFirstName: firstName,
      userID: userUID,
      userLastName: lastName,
      userMajor: major,
      userOccupation: occupation,
      userPassesRemaining: passesRemaining,
      userPhoneNumber: phoneNumber,
      userRole: role,
      userState: selectedState.name
    };
    sendDataToFlask(data);
    goto("/profile");
  };

async function sendDataToFlask(data) {
  try {
      const response = await fetch('http://localhost:5000/update_user_data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log(responseData);
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const timestamp = new Date().getTime(); 
    const filename = `${timestamp}_${file.name}`;

    if (file && allowedTypes.includes(file.type)) {
        image = file;
    } else {
        alert("Please upload a valid image file (png, jpg, jpeg).");
    }
    
    if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${userUID}/${filename}`);

        const metadata = {
            contentType: image.type
        };

        const data = new FormData();
        data.append('media', image);
        data.append('models', 'nudity-2.0,offensive,gore');
        data.append('api_user', '814034437');
        data.append('api_secret', 'TyzDvp3zEYqFDJmBPJe6EgozSSMayrXG');

        let header = {'Content-Type': 'multipart/form-data'};

        try {
            const response = await axios({
                url: 'https://api.sightengine.com/1.0/check.json',
                method: 'post',
                data: data,
                headers: header
            });

            let goreValue = response.data.gore.prob
            let offensiveValue = response.data.offensive.prob
            let nudityValue = 1 - response.data.nudity.none
            let skullValue = response.data.skull.prob
            let totalThreshold = (goreValue + offensiveValue + nudityValue + skullValue) - 0.04

            //Check threshold
            if (totalThreshold > 0.7) {
                alert('Image Denied')
            } else {
                const uploadTask = uploadBytes(storageRef, image, metadata);  
                avatarUrl = getDownloadURL(storageRef);
                downloadAvatar(userUID);
                location.reload();
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
        }
    }
};



  const downloadAvatar = async (userUID) => {
    try {
        const storage = getStorage();
        const listRef = ref(storage, `images/${userUID}`);

        const items = (await listAll(listRef)).items;

        items.sort((a, b) => b.timeCreated - a.timeCreated);

        const latestImageRef = items[items.length-1];
        const url = await getDownloadURL(latestImageRef);
        avatarUrl = url;
    } catch (error) {
        console.error('Error downloading avatar:', error);
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
      margin-top: 170px;
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
        <div class="flex items-center space-x-8 text-xl">
          <div>
            <Avatar src={avatarUrl} data-name="profile-picture" border class="ring-blue-600 dark:ring-blue-300" size="lg"
            dot={{ placement: 'top-right', color: 'green', size: 'lg' }} />
            <label for="uploadInput" class="text-blue-600 text-sm mt-2 cursor-pointer text-center ml-4">Change</label>
            <input id="uploadInput" type="file" accept="image/*" style="display: none" on:change={handleImageUpload}>
          </div>
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
            <select class="text-gray-900 bg-gray-50 w-full" bind:value={localOccupation}>
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
            <Label for="phone" class="mb-2 text-l">Phone number: {phoneNumber}</Label>
            <Input type="tel" id="phone" placeholder="123-456-7890" title="Please enter a valid phone number (e.g., 123-456-7890)" bind:value={localPhoneNumber} required />
          </div>        
          <div>
            <Label for="role" class="mb-2 text-l">Role: {role}</Label>
            <select class="text-gray-900 bg-gray-50 w-full" bind:value={localRole}>
              <option value="Mentor">Mentor</option>
              <option value="Mentee">Mentee</option>
            </select>
          </div>
          <div>
            <Label for="major" class="mb-2 text-l">Major: {major}</Label>
            <select class="text-gray-900 bg-gray-50 w-full" bind:value={localMajor}>
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
            <select class="text-gray-900 bg-gray-50" bind:value={selectedCountry} on:change={fetchStates}>
              <option value="">Select Country</option>
              {#each countries as country (country.iso2)}
                <option value={country} key={country.iso2}>{country.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <select class="text-gray-900 bg-gray-50 w-6/12" bind:value={selectedState} on:change={fetchCities} if={states.length}>
              <option value="">Select State</option>
              {#each states as state (state.id)}
                <option value={state} key={state.id}>{state.name}</option>
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




