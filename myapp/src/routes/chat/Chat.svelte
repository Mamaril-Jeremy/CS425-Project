
<script>
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, GridSolid, MailBoxSolid } from 'flowbite-svelte-icons';
</script>

<div class = "Sidebar">
    <Sidebar>
        <SidebarWrapper>
            <SidebarGroup>
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
    </div>
</div>

<style>
    .Sidebar{
        position : fixed;
        top : 3rem;
        left : 0rem;
        height : 44rem;
        box-shadow: rgba(255,255,255,1) 0px 3px 8px;
    }
    .message-container{
        overflow-y: scroll;
        height : 41rem;
    }
    .chatbox{
        width : 74rem;
        height : 41rem;
        /* margin:auto; */
        position:fixed;
        top: 5rem;
        left: 16rem;
        border-radius: .5rem;
        box-shadow: rgba(0,0,0,0.25) 0px 3px 8px;
    }
    /* .container{
        width: 100%;
    } */
</style>