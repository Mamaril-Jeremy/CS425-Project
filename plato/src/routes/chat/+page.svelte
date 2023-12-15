<script>
    //This code was developed by Richard Cao
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Avatar, GradientButton, Navbar, NavBrand, NavLi, NavUl, NavHamburger} from 'flowbite-svelte';
    import { writable } from "svelte/store";
    import axios from 'axios';
    import FormData from 'form-data';
    import Mpfp from "$lib/assets/Mark Marsala.jpg";
    import Mipfp from "$lib/assets/mike.png";
    import Rpfp from "$lib/assets/Richard Cao.png";

    let currentUser = '';
    setCurrentChatUser('Jeremy Mamaril');
    let messages = writable([]);
    let tempUser = '';
    let messageInput = "";
    let currentRecipient = 'Mark Marsala';
    function sendMessage() {
    if (!messageInput.trim()) return;
    // Add the new message to the store
    messages.update((prevMessages) => [
      ...prevMessages,
      {
        user: currentUser,
        text: messageInput,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    //Clear the message box
    setCurrentChatUser(tempUser);
    messageInput = "";

    }
    function checkMessage(message){
        console.log(message);

        let data = new FormData();
        data.append('text', message);
        data.append('lang', 'en');
        data.append('mode', 'ml');
        data.append('api_user', '97089180');
        data.append('api_secret', 'HBP5e2F44A275VqTL5iGcAagL6');
        let header = {'Content-Type': 'multipart/form-data',};
            axios({
            url: 'https://api.sightengine.com/1.0/text/check.json',
            method:'post',
            data: data,
            headers: header
        })
        .then(function (response) {
        // on success: handle response
        console.log(response.data);
        tempUser = currentUser;
        if(response.data.moderation_classes.discriminatory > 0.2){
            setCurrentChatUser('Console');
            messageInput = 'Can not be displayed due to unprofessional behavior';
        }
        else if(response.data.moderation_classes.insulting > 0.2){
            setCurrentChatUser('Console');
            messageInput = 'Can not be displayed due to unprofessional behavior';
        }
        else if(response.data.moderation_classes.sexual > 0.2){
            setCurrentChatUser('Console');
            messageInput = 'Can not be displayed due to unprofessional behavior';
        }
        else if(response.data.moderation_classes.toxic > 0.2){
            setCurrentChatUser('Console');
            messageInput = 'Can not be displayed due to unprofessional behavior';
        }
        else if(response.data.moderation_classes.violent > 0.2){
            setCurrentChatUser('Console');
            messageInput = 'Can not be displayed due to unprofessional behavior';
        }
        sendMessage(messageInput);
        })
        .catch(function (error) {
        // handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
        });
    }
    function setCurrentChatUser(user){
        currentUser = user;
    }
    function setCurrentRecipient(user){
        if (currentRecipient !== user){
            messages.set([]);
        }
        currentRecipient = user;
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
              <NavLi>View Details</NavLi>
              <NavLi>Schedule Appointment</NavLi>
              <NavLi>Disconnect</NavLi>
            </NavUl>
          </Navbar>
    </div>

    <div class = "chatbox">
        <ul>
            {#each $messages as { text, timestamp, user }}
              <li>----------------------------------------------------------------------------------------------</li>
              <li class = "font:30">{user} {timestamp}:</li>
              <li>{text}</li>
            {/each}
          </ul>
        <div class = message-container>
        </div>
        <div class = "textbox">
            <input type="text" bind:value={messageInput} placeholder="Enter message here" on:keydown={(event) => event.key === 'Enter' && checkMessage(messageInput)} />
        </div>
        <div class = "button"><GradientButton color="blue" on:click={checkMessage(messageInput)}>Send</GradientButton></div>
    </div>
</div>
<style>
    ul{
        color:black;
        z-index:100000;
        bottom:10%;
        position:absolute;
        left:2%;
    }
    .Sidebar{
        position : fixed;
        top : 4.5rem;
        left : 0rem;
        height : 100%;
        box-shadow: rgba(0,0,0,25) 0px 3px 8px;
        background: white;
    }
    .message-container{
        overflow-y: scroll;
        position: absolute;
        right:0.01rem;
        top: 14%;
        height : 80%;
    }
    .chatbox{
        width : 87%;
        height : 93%;
        position:absolute;
        top: 4.2rem;
        right: 0rem;
        border-radius: .5rem;
        box-shadow: rgba(0,0,0,0.25) 0px 3px 8px;
        background: white;
        z-index: 500;
    }  
    .dashboard{
        position:fixed;
        z-index:2000;
        top:11%;
        left:13%;
        width: 85%;
        height: 40%;
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
        position : absolute;
        bottom: 1rem;
        left: 1rem;
        width : 89%;
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

    /* .container{
        width: 100%;
    } */
</style>