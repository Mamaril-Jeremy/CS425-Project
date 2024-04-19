<script>
    import { goto } from '$app/navigation';
    import { Progressbar } from 'flowbite-svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
  
    let userUID;
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let officeHours = {};

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
    });
  
    function handleOfficeHoursChange(day, event) {
      const { name, value } = event.target;
      officeHours[day] = { ...officeHours[day], [name]: value };
    }
  
    function saveOfficeHours(e) {
      e.preventDefault();
      console.log('Office hours saved:', officeHours);
      const data = {
        userID : userUID,
        userOfficeHours : officeHours
      }
      sendDataToFlask(data);
      goto("/create-profile/upload-pfp");
    }

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
</script>

<style>
    body {
        margin: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        margin-top: 100px;
    }

    .title-info-container, .form-container {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
        display: flex;
        align-items: center;
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .office-hours {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .day {
        margin: 10px 0;
        display: flex;
        align-items: center;
    }

    .day p {
        margin-right: 20px;
        width: 100px; 
    }

    select {
        margin-right: 20px; 
        width: 150px;
    }

    button {
        margin: 20px auto;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        text-align: center;
        display: block; 
    }

    button:hover {
        background-color: #45a049;
    }
</style>


<body>
    <Progressbar class="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="62.5"/>
    <div class="wrapper">
        <div class="title-info-container">
            <div class="flex items-center space-x-8 text-xl">
                Indicate your availability for office hours.
            </div>
        </div>
        <div class="form-container">
            <form on:submit={saveOfficeHours}>
                <div class="office-hours">
                    {#each days as day}
                    <div class="day">
                        <p>{day}</p>
                        <select name="startHour" on:change={e => handleOfficeHoursChange(day, e)}>
                            <option value="">Select Time</option>
                            {#each Array.from({ length: 12 }, (_, i) => i) as hour}
                            <option value="{hour+1}:00 AM">{hour+1}:00 AM</option>
                            <option value="{hour+1}:30 AM">{hour+1}:30 AM</option>
                            {/each}
                            {#each Array.from({ length: 12 }, (_, i) => i) as hour}
                            <option value="{hour+1}:00 PM">{hour+1}:00 PM</option>
                            <option value="{hour+1}:30 PM">{hour+1}:30 PM</option>
                            {/each}
                        </select>
                        <span class="mr-2">-</span>
                        <select name="endHour" on:change={e => handleOfficeHoursChange(day, e)}>
                            <option value="">Select Time</option>
                            {#each Array.from({ length: 12 }, (_, i) => i) as hour}
                            <option value="{hour+1}:00 AM">{hour+1}:00 AM</option>
                            <option value="{hour+1}:30 AM">{hour+1}:30 AM</option>
                            {/each}
                            {#each Array.from({ length: 12 }, (_, i) => i) as hour}
                            <option value="{hour+1}:00 PM">{hour+1}:00 PM</option>
                            <option value="{hour+1}:30 PM">{hour+1}:30 PM</option>
                            {/each}
                        </select>
                    </div>
                    {/each}
                </div>
                <button>Save</button>
            </form>
        </div>
    </div>
</body>
