import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase.client.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";

const ConnectionsStore = writable([]);

let userUID;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userUID = user.uid;

    const db = getFirestore();
    const q = query(collection(db, 'users'), where('userID', '!=', userUID));
    const querySnapshot = await getDocs(q);

    const connections = [];

    for (const doc of querySnapshot.docs) {
      const docData = doc.data();
      const userId = docData.userID;

      const storage = getStorage();
      const listRef = ref(storage, `images/${userId}`);
      const items = (await listAll(listRef)).items;
      items.sort((a, b) => b.timeCreated - a.timeCreated);
      const latestImageRef = items[items.length - 1];
      const avatarUrl = await getDownloadURL(latestImageRef);


      connections.push({
        id: doc.id,
        userID: docData.userID,
        firstname: docData.userFirstName,
        lastname: docData.userLastName,
        info: docData.userBio,
        status: docData.userStatus,
        hours: docData.userOfficeHours,
        skills: docData.Skills,
        major: docData.userMajor,
        avatarUrl: avatarUrl
      });
    }

    // Update the Svelte store with the fetched data
    ConnectionsStore.set(connections);
  }
});

export default ConnectionsStore;
