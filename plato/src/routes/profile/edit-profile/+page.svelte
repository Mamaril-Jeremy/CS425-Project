<script>
  // This code was developed by Jeremy Mamaril
  import { collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase.client.js';
  import { Avatar, Label, Input, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';
  import Pfp from '$lib/assets/jeremy.png';

  let userUID, firstName, lastName, phoneNumber, occupation, role, major, city, state, connectsRemaining = 5, passesRemaining = 10;
  let localFirstName, localLastName, localPhoneNumber, localOccupation, localRole, localMajor, localCity, localState;
  let success = false;

  let config = {
      cUrl: 'https://api.countrystatecity.in/v1/countries',
      ckey: ''
  }

  let countrySelect, stateSelect, citySelect;

  onAuthStateChanged(auth, (user) => {
      if (user) {
          userUID = user.uid;
          fetchData();
          loadCountries();
      }
  });

  function loadCountries() {
      let apiEndPoint = config.cUrl

      fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
          .then(response => response.json())
          .then(data => {
              countrySelect = data.map(country => ({ value: country.iso2, text: country.name }));
          })
          .catch(error => console.error('Error loading countries:', error))

      stateSelect = [];
      citySelect = [];
  }

  function loadStates() {
      stateSelectDisabled = false;
      citySelectDisabled = true;
      stateSelectPointerEvents = 'auto';
      citySelectPointerEvents = 'none';

      const selectedCountryCode = countrySelect.value;
      // Clear existing states and city options using Svelte bindings
      stateSelect = [{ value: '', text: 'Select State' }];
      citySelect = [{ value: '', text: 'Select City' }];

      fetch(`${config.cUrl}/${selectedCountryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
          .then(response => response.json())
          .then(data => {
              stateSelect = data.map(state => ({ value: state.iso2, text: state.name }));
          })
          .catch(error => console.error('Error loading states:', error))
  }

  function loadCities() {
      // Enable/disable and set pointer events for Svelte bindings
      citySelectDisabled = false;
      citySelectPointerEvents = 'auto';

      const selectedCountryCode = countrySelect.value;
      const selectedStateCode = stateSelect.value;

      // Clear existing city options using Svelte bindings
      citySelect = [{ value: '', text: 'Select City' }];

      fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } })
          .then(response => response.json())
          .then(data => {
              // Replace document.createElement with Svelte binding
              citySelect = data.map(city => ({ value: city.iso2, text: city.name }));
          })
          .catch(error => console.error('Error loading cities:', error))
  }

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
            <Button>Select Country<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
            <Dropdown>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
          </div>
          <div>
            <Button>Select Country<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" bind:value={countrySelect} /></Button>
            <Dropdown>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
          </div>
          <div>
            <Button>Select City<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" bind:value={stateSelect}/></Button>
            <Dropdown>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
          </div>
          <div>
            <Button>Select State<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" bind:value={citySelect}/></Button>
            <Dropdown>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
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
          <Button type="submit" color="blue">Update</Button>
        </div>
      </form>
    </div>
  </body>
  