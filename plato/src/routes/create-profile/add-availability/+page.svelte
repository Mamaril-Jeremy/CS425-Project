<script>
    // Define days of the week and initial office hours
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let officeHours = {};
  
    // Function to handle changes in office hours
    function handleOfficeHoursChange(day, event) {
      officeHours[day] = event.target.value;
      officeHours = {...officeHours}; // Trigger reactivity
    }
  
    // Function to save office hours
    function saveOfficeHours() {
      // Here you can implement saving functionality, e.g., sending data to a server
      console.log('Office hours saved:', officeHours);
    }
  </script>
  
  <style>
    /* Add your custom styles here */
  </style>
  
  <h1>Set Office Hours</h1>
  
  <div class="office-hours">
    {#each days as day}
      <div class="day">
        <p>{day}</p>
        <select on:change={e => handleOfficeHoursChange(day, e)}>
            <option value="">Select Time</option>
            <option value="12:00 AM">12:00 AM</option>
            <option value="1:00 AM">1:00 AM</option>
            <option value="2:00 AM">2:00 AM</option>
            <option value="3:00 AM">3:00 AM</option>
            <option value="4:00 AM">4:00 AM</option>
            <option value="5:00 AM">5:00 AM</option>
            <option value="6:00 AM">6:00 AM</option>
            <option value="7:00 AM">7:00 AM</option>
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="8:00 PM">8:00 PM</option>
            <option value="9:00 PM">9:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
            <option value="11:00 PM">11:00 PM</option>
          </select>          
      </div>
    {/each}
  </div>
  
  <button on:click={saveOfficeHours}>Save</button>
  