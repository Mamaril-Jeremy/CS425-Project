<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Banner, Avatar, GradientButton, Navbar, NavBrand, NavLi, NavUl, NavHamburger, onMount } from 'flowbite-svelte';
    import { GridSolid, MailBoxSolid } from 'flowbite-svelte-icons';
    import { localStore } from 'svelte-local-storage-store';
    import Pfp from "$lib/assets/Mark Marsala.jpg";
    // import jeremy from "$lib/assets/"
    let messages = localStore('chat-messages', []);
    let newMessage = '';
    function sendMessage() {
        if (newMessage.trim()) {
            messages = [...messages, newMessage]; // We add the new message to our canvas.
            newMessage = ''; // Our brush is ready for the next stroke.
        }
    }
    onMount(() => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    
</script>

<div class = "Sidebar">
    <Sidebar>
        <SidebarWrapper>
            <SidebarGroup>
                <div class = "Title">
                    <p>Connections</p>
                </div>
                <SidebarItem label="Mark Marsala" href="/home">
                    <svelte:fragment slot="icon">
                    <Avatar src={Pfp} class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Jeremy" href="/home">
                    <svelte:fragment slot="icon">
                    <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Richard"href="/home">
                    <svelte:fragment slot="icon">
                    <MailBoxSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</div>

<div class = "container>">
    <div class = "dashboard">
        <Navbar rounded color="form">
            <NavBrand href="/">
              <img src={Pfp} class="mr-3 h-6 sm:h-9" alt="Mark Marsala profile picture" />
              <span class="self-center whitespace-nowrap text-xl font-semibold dark text-black">Mark Marsala</span>
            </NavBrand>
            <NavHamburger  />
            <NavUl >
              <NavLi href="/">View Details</NavLi>
              <NavLi href="/about">Schedule Appointment</NavLi>
              <NavLi href="/docs/components/navbar">Disconnect</NavLi>
            </NavUl>
          </Navbar>
    </div>
    <div class = "chatbox">
        <div id="chatbox" class="chatbox">
            {#each messages as message}
                <div class="message">{message}</div> <!-- Each message is a unique stroke on our canvas. -->
            {/each}
        </div>
        <div class = "textbox">
            <input bind:value={newMessage} type="text" placeholder="Enter message here"/>
        </div>
        <div on:click={sendMessage} class ="button"><GradientButton color="blue">Send</GradientButton></div>
    </div>
</div>

<style>
    .Sidebar{
        position : fixed;
        top : 4.5rem;
        left : 0rem;
        height : 44rem;
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
        width : 82.7%;
        height : 91.7%;
        position:fixed;
        top: 4.2rem;
        left: 16rem;
        border-radius: .5rem;
        box-shadow: rgba(0,0,0,0.25) 0px 3px 8px;
        background: white;
        z-index: 500;
    }  
    .dashboard{
        position:fixed;
        z-index:2000;
        top:11%;
        left:18%;
        width: 81%;
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