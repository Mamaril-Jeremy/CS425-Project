<script>
    import { Button } from 'flowbite-svelte';
    import Card from '$lib/components/Card.svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { collection, updateDoc, getDocs, query, where } from 'firebase/firestore';
    import { auth, db } from '$lib/firebase/firebase.client.js';

    let userUID;
    let connectsRemaining;
    let passesRemaining;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
    });

    const updateLimit = async (action) => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("userID", "==", userUID));

        const querySnapshot = await getDocs(q);
        const docRef = querySnapshot.docs[0].ref;

        try {
            if (action === 'connect' && connectsRemaining > 0) {
                connectsRemaining = data.userConnectsRemaining - 1;
                await updateDoc(docRef, {
                    userConnectsRemaining: connectsRemaining,
                });
            } else if (action === 'pass' && passesRemaining > 0) {
                passesRemaining = data.userPassesRemaining - 1;
                await updateDoc(docRef, {
                    userPassesRemaining: passesRemaining,
                });
            }
            console.log('Document updated with ID:', docRef.id);
        } catch (error) {
            console.error('Error updating document:', error.message);
        }
    }
</script>

<div class="container">
    <div class="pass">
        <Button color="red" class="tinder-button" on:click={() => updateLimit('pass')}>Pass</Button>
    </div>
    <Card />
    <div class="connect">
        <Button color="green" class="tinder-button" on:click={() => updateLimit('connect')}>Connect</Button>
     </div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin-left: auto;
        margin-right: auto;
    }

    .pass {
        text-align: center;
        padding-right: 10px;
    }

    .connect {
        text-align: center;
        padding-left: 10px;
    }
</style>
