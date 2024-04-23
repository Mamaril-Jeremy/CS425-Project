<script>
  import Card from '$lib/components/Card.svelte';
  import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
  import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';

  let userUID, firstName, lastName, user_status, user_skills = [], user_bio;
  let avatarUrl;
  let user_hours;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
      fetchData();
      downloadAvatar(userUID);
    }
  });

  const fetchData = async () => {
    const data = { "user_id" : userUID }; 
    try {
        const db = getFirestore();
        const q = query(collection(db, 'users'), where('userID', '==', userUID));
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs[0];
        
        firstName = doc.data().userFirstName;
        lastName = doc.data().userLastName;
        user_bio = doc.data().userBio;
        user_status = doc.data().userStatus;
        user_hours = doc.data().userOfficeHours;
        user_skills = doc.data().Skills;
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

<body>
    <Card firstname={firstName} lastname={lastName} info={user_bio} status={user_status} hours={user_hours} skills={user_skills} avatarUrl={avatarUrl}/>
</body>

<style>
    body{
       display: flex;
       justify-content: center;
       align-items: center;
       height: 100vh;

    }
</style>