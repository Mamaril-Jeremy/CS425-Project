<script>
      import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
      import { onAuthStateChanged } from 'firebase/auth';
      import { auth } from '$lib/firebase/firebase.client.js';

      let userUID, status;

      onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
            fetchData();
            // downloadAvatar(userUID);
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
    }

    .name {
        width: 100%;
        text-align: center;
        font-size: 24px;
        padding: 20px 0;
        background-color: #333;
        color: #fff;
        order: 2;
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
        user-select: none; 
        position: relative;
    }

    .section:hover {
        background-color: rgb(44, 102, 244);
    }

    .section span {
        text-decoration: none;
        font-size: 18px;
        font-weight: 600; 
        color: rgb(51, 51, 51); 
        outline: none; 
        transition: background-color 0.3s, color 0.3s; 
        display: block; 
        padding: 10px; 
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
    <div class="section"><span>Status</span></div>
    <div class="section"><span>Skills</span></div>
    <div class="section"><span>Info</span></div>
    <div class="section"><span>Hours</span></div>
    <div class="name">Jeremy Mamaril</div>
    <div class="circle"></div>
</div>
