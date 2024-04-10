<script>
    //This code was developed by Richard Cao
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Avatar, Button, Navbar, NavBrand, NavLi, NavUl, NavHamburger} from 'flowbite-svelte';
    import { writable } from "svelte/store";
    import Mpfp from "$lib/assets/Mark Marsala.jpg";
    import Mipfp from "$lib/assets/mike.png";
    import Rpfp from "$lib/assets/Richard Cao.png";
    import { auth, db } from '$lib/firebase/firebase.client.js';
    import { collection, updateDoc, getDocs, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
    import { onAuthStateChanged } from 'firebase/auth';

    let currentUser = '';
    let messages = writable([]);
    let tempUser = '';
    let messageInput = "";
    let displayInput = "";
    let currentRecipient = 'Mark Marsala';
    let timestamp = "";
    let messageOrder = 1;
    let userUID;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userUID = user.uid;
        }
    });

    async function setCurrentUser(){
        const q = query(collection(db, "users"), where("userID", "==", userUID));
        const querySnap = await getDocs(q);
        const doc = querySnap.docs[0];
        const userData = doc.data();
        const firstName = userData.userFirstName;
        const lastName = userData.userLastName;
        currentUser = `${firstName} ${lastName}`;
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
        timestamp = new Date().toLocaleString();
        await setCurrentUser();
        const messageData = {
            user: currentUser,
            text: messageInput,
            timestamp: timestamp,
            messageOrder: messageOrder
        };
        displayInput = messageInput
        messageOrder++;
        sendDataToFlask(messageData);
        setCurrentChatUser(tempUser);
        messageInput = "";
    }

    function setCurrentChatUser(user){
        currentUser = user;
    }

    function setCurrentRecipient(user){
        if (currentRecipient !== user){
            messages.set([]);
            fetchDataFromMiddleware();
        }
        currentRecipient = user;
    }

    
    function analyzeMessage(data){
        for(let i = 0; i < data.length; i++){
            displayInput = data[i].message_input;
            timestamp = data[i].timestamp;
            currentUser = data[i].current_user;
            postMessage()
        }
    }

    const fetchDataFromMiddleware = async () => {
        try {
        const response = await fetch("http://localhost:5000/get_initial_messages");
        const data = await response.json();
        analyzeMessage(data.messages);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    const startDataSync = async () => {
        const numMessages = collection(db, `chat`)
        const queryNumSnapshot = await getDocs(numMessages);
        const subscribe = onSnapshot(query(collection(db, "chat/e7Wee661lbq5bP5nlxD2/messages"),orderBy("messageOrder", "asc")), (querySnapshot) => {
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
    startDataSync();
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
</script>

<div class = "Sidebar">
    <Sidebar>
        <SidebarWrapper>
            <SidebarGroup>
                <div class = "Title">
                    <p>Connections</p>
                </div>
                <SidebarItem label="Mark Marsala" on:click={() => setCurrentRecipient('Mark Marsala')}>
                    <svelte:fragment slot="icon">
                    <Avatar src={Mpfp} class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Michael Nia" on:click={() => setCurrentRecipient('Michael Nia')}>
                    <svelte:fragment slot="icon">
                    <Avatar src={Mipfp} class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Richard Cao" on:click={() => setCurrentRecipient('Richard Cao')}>
                    <svelte:fragment slot="icon">
                    <Avatar src={Rpfp} class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</div>

<div class = "container>">
    <div class = "dashboard">
        <Navbar rounded color="form">
            <NavBrand>
              <img src={Mpfp} class="mr-3 h-6 sm:h-9" alt="Mark Marsala profile picture" aria-hidden="false"/>
              <span class="self-center whitespace-nowrap text-xl font-semibold dark text-black">{currentRecipient}</span>
            </NavBrand>
            <NavHamburger  />
            <NavUl >
              <NavLi class="cursor-pointer hover:cursor-pointer">View Profile</NavLi>
              <NavLi class="cursor-pointer hover:cursor-pointer" href="/report">Report</NavLi>
              <NavLi class="cursor-pointer hover:cursor-pointer">Disconnect</NavLi>
            </NavUl>
          </Navbar>
    </div>

    <div class = "chatbox">
        {#each $messages.reverse() as { text, timestamp, user }}
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
<style>
    .Sidebar{
        position : fixed;
        top : 4.5rem;
        left : 0rem;
        height : 100%;
        box-shadow: rgba(0,0,0,25) 0px 3px 8px;
        background: white;
    }
    .message-container {
        display: flex;
        flex-direction: column-reverse;
        overflow-y: auto;
        height: 9%;
    }
    .chatbox{
        width : 87%;
        height : 85%;
        position: fixed;
        bottom: 0%;
        right: 0rem;
        border-radius: .5rem;
        box-shadow: rgba(0,0,0,0.25) 0px 3px 8px;
        background: white;
        z-index: 500;
        overflow-y: auto;
    }  
    .dashboard{
        position:fixed;
        z-index:2000;
        top:8%;
        right:0%;
        width: 90%;
        height: 50%;
    }
    
    .button{
        position: absolute;
        bottom: 1rem;
        right: 0.5rem;
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
        bottom: 1rem;
        left: 17%;
        width : 75%;
        box-sizing: border-box;
        font-size: 16px;
        z-index: 1000;
        background-color: black;
        border : 1px solid black;
        padding: 0;
        margin : 0;
    }
    .textbox input[type="text"] {
        width: 100%;
        color: black;
    }

    .Title{
        color:black;
        font-size: 30px;
        
    }

    .message {
        background-color: #083b7d;
        color: white;
        padding: 8px;
        border-radius: 8px;
        max-width: fit-content;
        word-wrap: break-word;
    }

    .meta, .sent-message {
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        font-size: 12px;
        color: #010102;
        z-index: 1000;
    }

    .meta, .received-message{
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        font-size: 12px;
        color: #010102;
        z-index: 1000;
    }

    .sent-message, .received-message {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .sent-message .message {
        align-self: flex-end;
    }

    .received-message .message {
        align-self: flex-start;
    }
</style>