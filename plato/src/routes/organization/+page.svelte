<script>
  import { goto } from '$app/navigation';
  import { Progressbar } from 'flowbite-svelte';

  let selectedUniversity = '';
  let firstName = '';
  let lastName = '';
  let showModal = false;

  function closeModal() {
    showModal = false;
  }

  const universities = [
      { name: 'University of Nevada, Reno', logoSrc: 'src/routes/organization/unrlogo.png' },
      { name: 'University of Nevada, Las Vegas', logoSrc: 'src/routes/organization/unlv.png' }
  ];

  const selectUniversity = (universityName) => {
    selectedUniversity = universityName;
    showModal = true;
  };

  const handleSelection = (universityName) => {
      selectUniversity(universityName);
  };

  const createProfile = async () => {
    if (!firstName || !lastName) {
        alert("Please enter both your first and last names.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/check_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedUniversity: selectedUniversity,
                firstName: firstName,
                lastName: lastName
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);
            if (data.exists) {
                let url = `/create-profile?university=${encodeURIComponent(selectedUniversity)}`;
                for (const key in data.userData) {
                    if (data.userData.hasOwnProperty(key)) {
                        url += `&${encodeURIComponent(key)}=${encodeURIComponent(data.userData[key])}`;
                    }
                }
                goto(url);
            } else {
                const encodedUniversity = encodeURIComponent(selectedUniversity);
                goto(`/create-profile?university=${encodedUniversity}`);
            }
        } else {
            // Handle unsuccessful response
            alert("Error checking user.");
        }
    } catch (error) {
        // Handle error
        console.error("Error checking user:", error);
    }
};


  const skip = () => {
      goto('create-profile');
  };
</script>

<main class="flex flex-col items-center mt-20 justify-center ">
  <Progressbar class="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="42.5"/>
      <h1 class="text-3xl font-semibold mb-10 text-blue-600">Select Your University</h1>
          <div class="flex justify-center space-x-6 mb-6">
              {#each universities as university}
              <button 
                  on:click={() => handleSelection(university.name)}
                  class="flex flex-col items-center space-y-2 focus:outline-none"
              >
                  <img src={university.logoSrc} alt={university.name + " logo"} class="h-24" />
                  <span class="text-lg font-semibold">{university.name}</span>
              </button>
              {/each}
          </div>

  {#if showModal}
      <div class="modal-overlay">
          <div class="modal mb-2">
              <p class="mb-2">Please enter your first name:</p>
              <input class="mb-5" type="text" bind:value={firstName} />
              <p class="mb-2">Please enter your last name:</p>
              <input type="text" bind:value={lastName} />
              <div class="button-container">
                <button on:click={createProfile}>Submit</button>
              </div>
              <div class="button-container2">
                <button on:click={closeModal}>Close</button>
              </div>
          </div>
      </div>
  {/if}

  <div class="flex justify-center mt-5">
      <button type="button" on:click={skip} class="mt-5 w-24 bg-blue-500 text-black py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Skip
      </button>
  </div>
</main>

<style>
  main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 200px;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }

  .button-container {
    margin-top: 20px;
    margin-left: 50px;
  }

  .button-container2 {
    margin-top: 20px;
    margin-left: 55px;
  }
</style>
