<script>
    import { Button } from 'flowbite-svelte';
    import Card from '$lib/components/Card.svelte';
    import { onAuthStateChanged } from 'firebase/auth';
    import { collection, setDoc, doc } from 'firebase/firestore';
    import { auth, db } from '$lib/firebase/firebase.client.js';

    let userUID;
    let userConnectsRemaining = 5; // Set your initial values
    let userPassesRemaining = 10; // Set your initial values

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
    });

    const updateLimit = async (e) => {
        if (!userUID) {
            console.error('User not authenticated');
            return;
        }

        const userDocRef = doc(db, "users", userUID);

        try {
            await setDoc(userDocRef, {
                userConnectsRemaining: userConnectsRemaining - 1,
                userPassesRemaining: userPassesRemaining - 1,
            }, { merge: true });

            console.log("Document updated successfully");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }
</script>

<div class="pass">
    <Button color="red" class="ml-100" on:click={updateLimit}>Pass</Button>
</div>
<div class="container">
    <Card />
</div>
<div class="connect">
    <Button color="green" class="mr-100" on:click={updateLimit}>Connect</Button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .pass {
        margin-left: 450px;
    }

    .connect {
        margin-right: 450px;
    }
</style>
