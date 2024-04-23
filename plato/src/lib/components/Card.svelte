<script>
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';
    import { Modal } from 'flowbite-svelte';

    let userUID, defaultModal = false, selectedInfo = "";
    let parsedHours = "";

    export let firstname, lastname, info, status, hours, skills, avatarUrl = "";

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
        for (const dayKey of Object.keys(hours)) {
            const day = dayKey;
            const daySchedule = hours[dayKey];
            const startHour = daySchedule.startHour;
            const endHour = daySchedule.endHour;

            parsedHours += `${day}: `;
            parsedHours += `${startHour}-`;
            parsedHours += `${endHour}\r\n`;
        }
    });

    function displayModal(sectionInfo, event){
        selectedInfo = sectionInfo;
        defaultModal = !defaultModal; 
    }
</script>

<div class="card">
    <div class="name">{firstname} {lastname}</div>
    <div class="section" role="button" tabindex="" on:click={(event) => displayModal(parsedHours)} on:keypress={(event) => displayModal(parsedHours)}>
        <span>Hours</span>
        <div class="info" style="white-space: pre-line">{parsedHours}</div>
    </div>
    <div class="section" role="button" tabindex="" on:click={(event) => displayModal(skills, event)} on:keypress={(event) => displayModal(skills, event)}>
        <span>Skills</span>
        <div class="info">
            {#each skills as skill}
            <div>{skill}</div>
            {/each}
        </div>
    </div>
    <div class="section" role="button" tabindex="" on:click={(event) => displayModal(info, event)} on:keypress={(event) => displayModal(info, event)}>
        <span>About</span>
        <div class="info">{info}</div>
    </div>
    <div class="section" role="button" tabindex="" on:click={(event) => displayModal(status, event)} on:keypress={(event) => displayModal(status, event)}>
        <span>Status</span>
        <div class="info">{status}</div>
    </div>
    <img class="circle" src={avatarUrl} alt="User Avatar">
</div>

<style>
    .card {
        width: 600px;
        height: 400px;
        background-color: #ffffff;
        border: 2px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        position: relative;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        padding: 22px;
        z-index: 0;
    }

    .name {
        width: 100%;
        text-align: center;
        font-size: 24px;
        padding: 20px 0;
        background-color: #333;
        color: #fff;
        order: 1;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        user-select: text; 
    }

    .section {
        width: 50%;
        height: 40%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        transition: background-color 0.3s, color 0.3s;
        position: relative;
    }

    .section:hover {
        background-color: rgb(44, 102, 244);
    }

    .section span {
        font-size: 18px;
        font-weight: 600; 
        color: rgb(51, 51, 51); 
        outline: none; 
        transition: background-color 0.3s, color 0.3s; 
        display: block; 
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .info {
        text-decoration: none;
        font-size: 18px;
        font-weight: 600; 
        color: rgb(51, 51, 51); 
        outline: none; 
        transition: background-color 0.3s, color 0.3s; 
        display: block; 
        padding: 10px; 
        text-align: center; 
        justify-content: center;
        align-items: center;
        top: 50%;
    }

    .circle {
        width: 25%;
        height: 40%;
        border: 2px solid #ccc; 
        border-radius: 70%;
        background-position: center;
        position: absolute;
        top: 42.5%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .section {
        position: relative;
    }

    .section .info {
        position: absolute;
        top: 25%;
        left: 0;
        width: 100%;
        background-color: white;
        border: 1px solid #ccc;
        z-index: 999;
        padding: 10px;
        display: none;
    }

    .section:hover .info {
        display: block;
    }

    .section:hover span{
        top: 0;
    }
</style>

