
<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, MailBoxSolid } from 'flowbite-svelte-icons';
</script>

<div class = "Sidebar">
    <Sidebar>
        <SidebarWrapper>
            <SidebarGroup>
                <div class = "Title">
                    <p>Connections</p>
                </div>
                <SidebarItem label="Mark Marsala" href="/">
                    <svelte:fragment slot="icon">
                    <ChartPieSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
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
        <button>Send</button>
    </div>
</div>

<style>
    .Sidebar{
        position : fixed;
        top : 5rem;
        left : 0rem;
        height : 44rem;
        box-shadow: rgba(0,0,0,25) 0px 3px 8px;
        background: white;
    }
    .message-container{
        overflow-y: scroll;
        height : 37rem;
    }
    .chatbox{
        width : 74rem;
        height : 41rem;
        position:fixed;
        top: 5.5rem;
        left: 16rem;
        border-radius: .5rem;
        box-shadow: rgba(0,0,0,0.25) 0px 3px 8px;
        background: white;
        z-index: 500;
    }  
    
    button
    {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        width : 100px;
        height : 2.75rem;
        background-color: rgb(250, 144, 23);
        color:rgb(0, 0, 0); 
        cursor:pointer;
        border-radius: .25rem;
        border:black;
        transition: all ease .25s;
        z-index: 1000;
    } 

    button:hover
    {
        z-index: 1000;
        background-color: rgb(255, 203, 144);
    } 

    .textbox
    {
        position : absolute;
        bottom: 0.5rem;
        right: 48rem;
        width : 400px;
        box-sizing: border-box;
        font-size: 16px;
        z-index: 1000;
        background-color: black;
        border : 1px solid black;
        padding: 0;
        margin : 0;
    }
    .textbox input[type="text"] {
        width: 1050px;
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