<script>
  //This code was developed by Jeremy Mamaril
  import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';
  import { Avatar } from 'flowbite-svelte';

  let userUID, firstName, lastName, status, occupation, role, major, city, country, state, connectsRemaining = 5, passesRemaining = 10;
  let avatarUrl;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
      fetchData();
      downloadAvatar(userUID)
    }
  });

  const fetchData = async () => {
    const data = { "user_id" : userUID }; 
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
        occupation = user_data.userOccupation;
        role = user_data.userRole;
        major = user_data.userMajor;
        city = user_data.userCity;
        state = user_data.userState;
        country = user_data.userCountry;
        status = user_data.userStatus
    } catch (error) {
        console.error('Error:', error);
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

<body class="bg-gray-100">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div class="wrapper">
    <div class="user-info-container">
      <div class="flex items-center space-x-10 text-xl">
          <div style="position: relative; display: inline-block;">
            <Avatar src={avatarUrl} data-name="Mark Marsala" border class="ring-blue-600 dark:ring-blue-300" size="lg"
            dot={{ placement: 'top-right', color: 'green', size: 'lg' }} />
            <!-- <span class="material-symbols-outlined" style="position: absolute; top: 0; left: 0;">edit</span> -->
        </div>
        <div class="space-y-1 font-medium dark:text-black">
          <div>{firstName} {lastName}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Joined in December 2024</div>
          <div class="text-sm dark:text-black"><span class="material-symbols-outlined">edit</span><a href="/profile/edit-profile">Edit Profile</a></div>
        </div>
      </div>
    </div>

      <div class="grid gap-8 mt-10 md:grid-cols-2 bg-white border-1 border-black rounded-lg p-3">
        <div>
          <p for="first_name" class="mb-2 text-l"><span class="material-symbols-outlined main">account_circle</span>Name: {firstName} {lastName}</p>
        </div>
        <div>
          <p for="company" class="mb-2 text-l"><span class="material-symbols-outlined main">work</span>Occupation: {occupation}</p>
        </div>
        <div>
          <p for="phone" class="mb-2 text-l"><span class="material-symbols-outlined main">grade</span>Current Academic Status: {status}</p>
        </div>        
        <div>
          <p for="role" class="mb-2 text-l"><span class="material-symbols-outlined main">supervised_user_circle</span>Role: {role}</p>
        </div>
        <div>
          <p for="major" class="mb-2 text-l"><span class="material-symbols-outlined main">school</span>Major: {major}</p>
        </div>
        <div>
          <p for="country" class="mb-2 text-l"><span class="material-symbols-outlined main">public</span>Country: {country}</p>
      </div>
        <div>
          <p for="state" class="mb-2 text-l"><span class="material-symbols-outlined main">flag</span>State: {state}</p>
        </div>
        <div>
          <p for="city" class="mb-2 text-l"><span class="material-symbols-outlined main">apartment</span>City: {city}</p>
        </div>
        <div>
          <p for="visitors" class="mb-2 text-l"><span class="material-symbols-outlined main">person_add</span>Connects Remaining: {connectsRemaining}</p>
        </div>
        <div>
          <p for="visitors" class="mb-2 text-l"><span class="material-symbols-outlined main">person_remove</span>Passes Remaining: {passesRemaining}</p>
        </div>
      </div>
  </div>

</body>

<style>
  a{
    color: black;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: left;
    height: 100vh;
  }

  div > p{
    font-size: 20px;
  }

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
    margin-top: 100px;
  }

  .material-symbols-outlined {
    font-size: 15px; 
    margin: 10px auto;
  }

  .main{
    position: relative;
    font-size: 24px;
    margin-right: 10px;
    top: 5px;
  }
</style>


