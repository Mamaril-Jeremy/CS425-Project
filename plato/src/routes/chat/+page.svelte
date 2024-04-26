<script>
    //This code was developed by Richard Cao
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Avatar, Button, Navbar, NavBrand, NavLi, NavUl, NavHamburger} from 'flowbite-svelte';
    import { writable, get } from "svelte/store";
    import { auth, db } from '$lib/firebase/firebase.client.js';
    import { collection, updateDoc, getDocs, addDoc, query, where, orderBy, onSnapshot, getDoc } from 'firebase/firestore';
    import { onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';
    import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
    import Mpfp from "$lib/assets/default-avatar.jpg";

    let currentUser = '';
    export const messages = writable([]);
    export const chats = writable([]);
    export const recipientNames = writable([]);
    export const recipientUIDs = writable([]);
    export const recipientIcons = writable([]);
    export const currentIndex = writable();
    let messageInput = "";
    let displayInput = "";
    export const currentRecipient = writable();
    export const currentRecipientIcon = writable();
    let timestamp = "";
    let messageOrder = 1;
    export const userID = writable(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userID.set(user.uid);
            handleUserStateChange(user).catch(console.error);
        }
    });
    async function handleUserStateChange(user) {
        if (user) {
            await setCurrentUser();
            await fetchData()
            await determineRecipientUser();
        }
    }

    async function determineRecipientUser(){
        const recipientUID = [];
        const recipientName = [];
        let imageURL = [];
        const promises = [];
        const Chats = get(chats);
        for(let reference of Chats){
            const docSnap = await getDoc(reference);
            const data = docSnap.data();
            const otherUser = get(userID) === data.user1 ? data.user2 : data.user1;
            recipientUID.push(otherUser);
        }
        for(let UID of recipientUID){
            const q = query(collection(db, 'users'), where('userID', '==', UID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                recipientName.push(`${userData.userFirstName} ${userData.userLastName}`);
            });
            promises.push(downloadAvatar(UID));
        }
        imageURL = await Promise.all(promises);
        recipientNames.set(recipientName);
        recipientUIDs.set(recipientUID);
        recipientIcons.set(imageURL);
    }
    async function downloadAvatar(UID){
        try {
            const storage = getStorage();
            const listRef = ref(storage, `images/${UID}`);
            const items = (await listAll(listRef)).items;
            items.sort((a, b) => b.timeCreated - a.timeCreated);
            const latestImageRef = items[items.length-1];
            const url = await getDownloadURL(latestImageRef);
            return url;
        } catch (error) {
            console.error('Error downloading avatar:', error);
        }
    }

    async function fetchData(){
        const uid = get(userID)
        const q = query(collection(db, 'users'), where('userID', '==', uid));
        const querySnap = await getDocs(q);
        if (!querySnap.empty){
            const doc = querySnap.docs[0];
            const userData = doc.data();
            const chatList = userData.Chats;
            chats.set(chatList);
        }
    }
    async function setCurrentUser(){
        try {
            const q = query(collection(db, "users"), where("userID", "==", get(userID)));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
                const doc = querySnap.docs[0];
                const userData = doc.data();
                const firstName = userData.userFirstName;
                const lastName = userData.userLastName;
                currentUser = `${firstName} ${lastName}`;
                console.log(`Current user set to: ${currentUser}`);
            } else {
                console.log("No user found with the specified UID.");
            }
        } catch (error) {
            console.error("Error setting current user:", error);
        }
    }

    function postMessage() {
        messages.update((prevMessages) => [
        {
            user: currentUser,
            text: displayInput,
            timestamp: timestamp,
        },
        ...prevMessages,
        ]);
    }
    async function sendMessage(){
        await setCurrentUser();
        timestamp = new Date().toLocaleString();
        const messageData = {
            user: currentUser,
            text: messageInput,
            timestamp: timestamp,
            messageOrder: messageOrder,
            chatRef: $chats[$currentIndex].id
        };
        displayInput = messageInput
        messageOrder++;
        sendDataToFlask(messageData);
        messageInput = "";
    }

    function setCurrentChatUser(user){
        currentUser = user;
    }

    function setCurrentRecipient(index){
        messages.set([]);
        currentIndex.set(index);
        currentRecipient.set($recipientNames[index]);
        currentRecipientIcon.set($recipientIcons[index]);
        startDataSync($chats[$currentIndex].id);
        unsubscribe();
        // fetchDataFromMiddleware($chats[$currentIndex].id);
    }

    
    function analyzeMessage(data){
        for(let i = 0; i < data.length; i++){
            displayInput = data[i].message_input;
            timestamp = data[i].timestamp;
            currentUser = data[i].current_user;
            postMessage()
        }
    }

    const fetchDataFromMiddleware = async (chatID) => {
        try {
            const response = await fetch(`http://localhost:5000/get_initial_messages/${chatID}`);
            const data = await response.json();
            analyzeMessage(data.messages);
            } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const startDataSync = async (reference) => {
        const numMessages = collection(db, `chat`)
        const queryNumSnapshot = await getDocs(numMessages);
        const subscribe = onSnapshot(query(collection(db, `chat/${reference}/messages`),orderBy("messageOrder", "asc")), (querySnapshot) => {
            messages.set([]);
            querySnapshot.docs.slice(1).forEach((doc) => {
                const data = doc.data();
                timestamp = data.messageTime;
                currentUser = data.user;
                displayInput = data.message;
                postMessage();
            })
        });
    };
    async function sendDataToFlask(data) {
        try {
            const response = await fetch('http://localhost:5000/get_data_from_chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function disconnectUser(){
        const formData = new FormData()
        formData.append('currentUser', $userID)
        formData.append('viewedUser', $recipientUIDs[$currentIndex])
        formData.append('chatRef', $chats[$currentIndex].id)
        try {
            const response = await fetch('http://localhost:5000/disconnect_user', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            console.log(responseData);
            currentRecipient.set('Select a chat');
            currentRecipientIcon.set(Mpfp);
            await fetchData()
            await determineRecipientUser();
        } catch (error) {
            console.error('Error:', error);
        }
        
    }
    onMount(() => {
        startDataSync(chats[0]);
    });
</script>
<div class="main-container">
    <div class="Sidebar">
        <Sidebar>
            <SidebarWrapper>
                <SidebarGroup>
                    <div class="Title">
                        <p class="dark:text-white">Connections</p>
                    </div>
                    {#each $chats as chat, index}
                        <SidebarItem label={$recipientNames[index] || 'Loading...'} on:click={() => setCurrentRecipient(index)}>
                            <svelte:fragment slot="icon">
                                <!-- Properly handle undefined URLs and provide a default -->
                                <Avatar src={$recipientIcons[index]} class="w-5 h-5 ..." />
                            </svelte:fragment>
                        </SidebarItem>
                    {/each}
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </div>
    <div class = "chat-area">
        <div class="chat-header mt-5">
            <div class="chat-header-details">
                <Avatar src={$currentRecipientIcon || Mpfp} class="avatar-large" />
                <span class="recipient-name">{$currentRecipient || 'Select a chat'}</span>
            </div>
            <div class="chat-header-actions">
                <!-- <button class="custom-button" >View Profile</button> -->
                <a href="/report" class="custom-button">Report</a>
                <button class="custom-button" on:click={disconnectUser}>Disconnect</button>
            </div>
        </div>

        <div class = "chatbox">
            {#each $messages as { text, timestamp, user }}
                <div class="message-container">
                    <div class="{user === currentUser ? 'sent-message' : 'received-message'}">
                        <div class="meta">{user} {timestamp}</div>
                        <div class="message">{text}</div>
                    </div>
                </div>
            {/each}
            <div class = "textbox">
                <input type="text" bind:value={messageInput} placeholder="Enter message here" on:keydown={(event) => event.key === 'Enter' && sendMessage(messageInput)} />
            </div>
            <div class = "button"><Button color="blue" on:click={sendMessage(messageInput)}>Send</Button></div>
        </div>
    </div>
</div>
<style>
    .main-container{
        display: flex;
        margin-top:70px;
        height: 90vh;
    }
    .Sidebar{
        position : fixed;
        width: 13%;
        left : 0rem;

        height : 100%;
        box-shadow: rgba(0,0,0,25) 0px 3px 8px;
        background: white;
        overflow-y: auto;
        flex-shrink: 0;
    }
    .chat-area{
        flex-grow: 1;
        padding-top: 40px;
        width: 87%;
        height: 100%;
        margin-left: 13%;
        position: relative;
        
    }
    .message-container {
        display: flex;
        flex-direction: column-reverse;
        overflow-y: auto;
        height: 10%;
        min-width:100%;
        border-bottom: 1px solid #e1e1e1;
        border-top: 1px solid #e1e1e1;
    }
    .chatbox{
        width : 87%;
        height : 85%;
        position: fixed;
        bottom: 6.1%;
        right: 0rem;
        border-radius: .5rem;
        box-shadow: rgba(0,0,0,0.25) -8px 0px 8px -4px;
        background: white;
        z-index: 500;
        overflow-y: auto;
        display: flex;
        flex-direction: column-reverse;
    }  
    .chat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height:6.75vh;
        position: fixed; 
        top: 9vh; 
        width: calc(100% - 13%); 
        left: auto; 
        background-color: rgba(255, 255, 255, 0.603); 
        z-index: 1001; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
    }

    .chat-header-details {
        display: flex;
        align-items: center;
    }
    .custom-button{
        background-color: #e7e7e7; 
        border: #b5b5b5; 
        color: black; 
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 0 10px; 
    }
    .custom-button:hover {
        background-color: #d7d7d7;
    }
    .recipient-name {
        margin-left: 10px;
    }
    .button{
        position: fixed;
        bottom: 1%;
        right: 0%;
        width : 100px;
        height : 2.8rem;
        color:rgb(0, 0, 0); 
        cursor:pointer;
        border-radius: .25rem;
        border:black;
        transition: all ease .25s;
        z-index: 1000;
    } 


    .textbox
    {
        position : fixed;
        bottom: 0%;
        left: 13%;
        width : 80%;
        height: 7.1%;
        box-sizing: border-box;
        font-size: 16px;
        z-index: 1000;
        background-color: black;
        padding: 0;
        margin : 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        box-shadow: rgba(0,0,0,0.25) -8px 0px 8px -4px;
    }
    .textbox input[type="text"] {
        width: 95%;
        color: black;
        text-align: center;
    }

    .Title{
        color:black;
        font-size: 30px;
        
    }

    .message {
        background-color: transparent;
        color: black;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        min-width: 100%;
        word-wrap: break-word;
    }

    .meta, .sent-message {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-left: 1vh;
        font-size: 12px;
        color: #010102;
        z-index: 1000;
        border-bottom: 1px solid #e1e1e1;
    }

    .meta, .received-message{
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-left: 1vh;
        font-size: 12px;
        color: #010102;
        z-index: 1000;
    }



    .sent-message .message {
        align-self: flex-start;
    }

    .received-message .message {
        align-self: flex-start;
    }
</style>