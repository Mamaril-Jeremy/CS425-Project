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
    { name: 'Basketball', checked: false },
    { name: 'Baseball', checked: false },
    { name: 'Tennis', checked: false },
    { name: 'Golf', checked: false },
    { name: 'Swimming', checked: false },
    { name: 'Running', checked: false },
    { name: 'Cycling', checked: false },
    { name: 'Hiking', checked: false },
    { name: 'Cooking', checked: false },
    { name: 'Photography', checked: false },
    { name: 'Painting', checked: false },
    { name: 'Music Production', checked: false },
    { name: 'Graphic Design', checked: false },
    { name: 'Fashion Design', checked: false },
    { name: 'Writing', checked: false },
    { name: 'Reading', checked: false },
    { name: 'Traveling', checked: false },
    { name: 'Yoga', checked: false },
    { name: 'Meditation', checked: false },
    { name: 'Gardening', checked: false },
    { name: 'DIY Projects', checked: false },
];

    
    function addInterest() {
        const selectedInterests = interests.filter(i => i.checked).map(i => i.name);
        console.log('Adding interests:', selectedInterests);
        goto("/create-profile/upload-pfp");
    }
</script>

<Progressbar class="absolute top-28 left-1/2 transform -translate-x-1/2 w-1/2 z-10" progress="70"/>
<div class="area mt-20">
    <div class="add-interests-container mt-12">
        <h1 class="text-center">Add Interests</h1>
        <div class="interests-grid">
            {#each interests as interest}
            <label class="interest-entry">
                <input class="mr-2" type="checkbox" bind:checked={interest.checked}>
                <span>{interest.name}</span>
            </label>
            {/each}
        </div>
        <button class="mt-5" on:click={addInterest}>Add</button>
    </div>
</div>

<style>
    .area {
        width: 100%;
        height: 100vh;
        background-color: #f3f4f6;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .add-interests-container {
        max-width: 400px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .area h1 {
        margin-top: 0;
        text-align: center;
        font-size: 32px;
        margin-bottom: 20px;
    }
    
    .interests-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(100px, 1fr));
        grid-gap: 10px;
    }
    
    .interest-entry {
        display: flex;
        align-items: center;
    }
  
    button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    button:hover {
        background-color: #0056b3;
    }
</style>