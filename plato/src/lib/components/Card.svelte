<script>
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth } from '$lib/firebase/firebase.client.js';

    let userUID;
    export let info, status, hours, skills;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
            fetchData();
        }
    });
</script>

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
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .circle {
        width: 27.5%;
        height: 40%;
        border: 2px solid #ccc; 
        border-radius: 70%;
        background-image: url("$lib/assets/jeremy.png"); 
        background-position: center;
        position: absolute;
        top: 42.5%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

</style>


<div class="card">
    <div class="name">Jeremy Mamaril</div>
    <div class="section"><span>Status</span><span>{status}</span></div>
    <div class="section"><span>Skills</span><span>{skills}</span></div>
    <div class="section"><span>Info</span><span>{info}</span></div>
    <div class="section"><span>Hours</span><span>{hours}</span></div>    
    <div class="circle"></div>
</div>

