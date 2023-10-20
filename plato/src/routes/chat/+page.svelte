<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Banner, Avatar, GradientButton } from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, MailBoxSolid } from 'flowbite-svelte-icons';
    import Pfp from "$lib/assets/Mark Marsala.jpg";
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
                <SidebarItem label="Jeremy" href="/docs/components/accordion">
                    <svelte:fragment slot="icon">
                    <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Richard" href="/docs/components/alert">
                    <svelte:fragment slot="icon">
                    <MailBoxSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</div>

<div class = "container>">
    <div class = "chatbox">
        <div class = "message-container">
        </div>
        <div class = "textbox">
            <input type="text" placeholder="Enter text here"/>
        </div>
        <div class ="button"><GradientButton color="blue">Send</GradientButton></div>
        <Banner id="default-banner" position="absolute">
            <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <span class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600">
                <span class="sr-only">Light bulb</span>
              </span>
              <span>
                New brand identity has been launched for the <a href="https://flowbite.com" class="inline font-medium text-primary-600 underline dark:text-primary-500 underline-offset-2 decoration-600 dark:decoration-500 decoration-solid hover:no-underline"> Flowbite Library </a>
              </span>
            </p>
          </Banner>
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
        top: 8.5rem;
        height : 70%;
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
    
    
    .button{
        position: absolute;
        bottom: 1rem;
        right: 0.5rem;
        width : 100px;
        height : 2.75rem;
        color:rgb(0, 0, 0); 
        cursor:pointer;
        border-radius: .25rem;
        border:black;
        transition: all ease .25s;
        z-index: 1000;
    } 

    .button:hover
    {
        z-index: 1000;
        background-color: rgb(255, 203, 144);
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