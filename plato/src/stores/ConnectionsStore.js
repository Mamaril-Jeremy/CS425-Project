import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase.client.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const ConnectionsStore = writable([]);

let userUID;

onAuthStateChanged(auth, (user) => {
  if (user) {
    userUID = user.uid;
  }
});

const fetchData = async () => {
  const db = getFirestore();
  const q = query(collection(db, 'users'), where('userID', '!=', userUID));
  const querySnapshot = await getDocs(q);
  const data = [];

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({
      id: doc.id,
      info: docData.userBio,
      status: docData.userStatus,
      hours: docData.userOfficeHours,
      skills: docData.userSkills
    });
  });

  return data;
};

// Function to initialize the store with data
export const initializeConnectionsStore = async () => {
  const data = await fetchData();
  ConnectionsStore.set(data);
};

export default ConnectionsStore;