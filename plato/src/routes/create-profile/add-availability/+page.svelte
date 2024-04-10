<script>
  import { goto } from '$app/navigation';
  import { ProgressBar } from 'flowbite-svelte;'

  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  let officeHours = {};

  // Function to handle changes in office hours
  function handleOfficeHoursChange(day, event) {
    officeHours[day] = event.target.value;
    officeHours = {...officeHours}; 
  }

  function saveOfficeHours(e) {
    e.preventDefault();
    console.log('Office hours saved:', officeHours);
    goto("/create-profile/upload-pfp");
  }

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
      align-items: center;
  }

  .title-info-container {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
      margin-bottom: 20px;
  }

  .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
      margin-bottom: 20px;
  }

  .office-hours {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .day {
      margin: 10px;
      display: flex;
      align-items: center;
  }

  .day p {
      margin-right: 10px;
  }

  select {
      margin-right: 10px;
  }

  button {
      margin: 20px 0px 0px 250px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      text-align: center;
  }

  button:hover {
      background-color: #45a049;
  }
</style>

<body>
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
                    <select on:change={e => handleOfficeHoursChange(day, e)}>
                        <option value="">Select Time</option>
                        {#each Array.from({ length: 12 }, (_, i) => i + 1) as hour}
                        <option value="{hour}:00">{hour}:00</option>
                        {/each}
                    </select>
                    <select on:change={e => handleOfficeHoursChange(day, e)}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                    <span>-</span>
                    <select on:change={e => handleOfficeHoursChange(day, e)}>
                        <option value="">Select Time</option>
                        {#each Array.from({ length: 12 }, (_, i) => i + 1) as hour}
                        <option value="{hour}:00">{hour}:00</option>
                        {/each}
                    </select>
                    <select on:change={e => handleOfficeHoursChange(day, e)}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
                {/each}
            </div>
            <button>Save</button>
        </form>
    </div>
  </div>
</body>

