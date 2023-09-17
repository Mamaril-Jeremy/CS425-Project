<script>
    import Card from "../../components/Card.svelte";
    import Button from "../../components/Button.svelte"
    import { Link } from "svelte-navigator";
    // import { Button } from 'flowbite-svelte';
    // import { ArrowRightOutline } from 'flowbite-svelte-icons';
  </script>
  
  
  <Button class="connect green">
    <Link to="/connections">Connect</Link>
  </Button>
  
  <Button class="pass red">
    Pass
  </Button>
  
  <Card />
  
    <!-- <Button>
      Connect <ArrowRightOutline class="w-3.5 h-3.5 ml-2" />
    </Button> -->
  
  
  
  