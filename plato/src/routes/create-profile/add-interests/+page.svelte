<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Progressbar } from "flowbite-svelte";
    let interests = [
        { name: 'Computer Science', checked: false },
        { name: 'Psychology', checked: false },
        { name: 'Cybersecurity', checked: false },
        { name: 'Machine Learning', checked: false },
        { name: 'Mathematics', checked: false },
        { name: 'Robotics', checked: false },
        { name: 'Front-end Development', checked: false },
        { name: 'Back-end Development', checked: false },
        { name: 'Football', checked: false },
    ];
    
    function addInterest() {
        const selectedInterests = interests.filter(i => i.checked).map(i => i.name);
        console.log('Adding interests:', selectedInterests);
        goto("/create-profile/upload-pfp");
    }
</script>

<div class="area">
    <h2>Add Interests</h2>
    <div class="add-interests-container">
        <div class="interests-wrapper">
            <div class="interests-grid">
                {#each interests as interest}
                <label class="interest-entry">
                    <input type="checkbox" bind:checked={interest.checked}>
                    <span>{interest.name}</span>
                </label>
                {/each}
            </div>
        </div>
    </div>
    <button on:click={addInterest}>Add</button>
</div>

<style>
    .area {
        width: 100%; 
        height: 90vh; 
        background-color: #f3f4f6; 
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
        position:fixed;
        bottom: 0%;
    }
    .add-interests-container {
        display: flex;
        flex-direction: column;
        max-width: fit-content; 
        top: 100%;
        margin: auto;
    }
    
    .area h2 {
        position: fixed;
        text-align: center;
        top: 10%;
        font: 20px;
    }
    .interests-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; 
        justify-content: flex-start;
    }
    .interests-wrapper {
        width: 50%; 
        margin: 0 auto; 
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .interest-entry {
        display: flex;
        margin-bottom: 10px; 
        align-items: center;
    }
  
    button {
        position: absolute;
        width: 100px; /* Adjust width as needed */
        margin-top: 20px;
        bottom:2%;
        align-self: center; /* Center the button */
        background-color: blue;
        color:white;
    }
</style>