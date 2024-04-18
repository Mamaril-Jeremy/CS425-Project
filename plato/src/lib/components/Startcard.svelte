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
      background-color: lightblue;
      border: 2px solid #ccc;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 20px;
      color: black;
      font-size: 30px;
  }
</style>

<div class="card">
  <div>Let's get you connected!</div>
</div>
