import { writable } from 'svelte/store';


const ConnectionsStore = writable([
    {
        id: 1,
        question: 'Python or JavaScript?',
        answerA: 'Python',
        answerB: 'JavaScript',
        votesA: 9,
        votesB: 15,
      },
      {
        id: 2,
        question: 'Python or JavaScript?',
        answerA: 'Python',
        answerB: 'JavaScript',
        votesA: 9,
        votesB: 15,
      },
      {
        id: 3,
        question: 'Python or JavaScript?',
        answerA: 'Python',
        answerB: 'JavaScript',
        votesA: 9,
        votesB: 15,
      },
      {
        id: 4,
        question: 'Python or JavaScript?',
        answerA: 'Python',
        answerB: 'JavaScript',
        votesA: 9,
        votesB: 15,
      },
]);

export default ConnectionsStore;



// // stores/firestoreData.js
// import { writable } from 'svelte/store';
// import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { getUserId } from 'your-authentication-library'; // Implement this function to get the user id

// const firestoreData = writable([]);

// // Function to fetch data from Firestore
// const fetchData = async () => {
//   const db = getFirestore();
//   const userId = getUserId(); // Get the user id
//   const q = query(collection(db, 'your_collection'), where('id', '!=', userId));
//   const querySnapshot = await getDocs(q);
//   const data = [];

//   querySnapshot.forEach((doc) => {
//     const docData = doc.data();
//     data.push({
//       id: doc.id,
//       education: docData.education,
//       status: docData.status,
//       info: docData.info,
//       skills: docData.skills
//     });
//   });

//   return data;
// };

// // Function to initialize the store with data
// export const initializeFirestoreData = async () => {
//   const data = await fetchData();
//   firestoreData.set(data);
// };

// // Subscribe to updates in the store
// export const subscribeToFirestoreData = firestoreData.subscribe;

// // Function to update the store with new data
// export const updateFirestoreData = async () => {
//   const data = await fetchData();
//   firestoreData.set(data);
// };

// // Function to delete a document from Firestore and update the store
// export const deleteDocument = async (itemId) => {
//   const db = getFirestore();
//   try {
//     await deleteDoc(doc(db, 'your_collection', itemId));
//     // Update the store after deletion
//     await updateFirestoreData();
//   } catch (error) {
//     console.error('Error deleting document: ', error);
//   }
// };
