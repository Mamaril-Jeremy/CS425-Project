<script>
  //import Card from "../components/Card.svelte";
  import { Link } from "svelte-routing";
  import { GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

<div class="button">
  <Link to="/connections">
    <GradientButton color="blue">
      Connect
      <!-- <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /> -->
    </GradientButton>
  </Link>
</div>

//Button tests
<GradientButton color="blue">Blue</GradientButton>
<GradientButton color="green">Green</GradientButton>
<GradientButton color="cyan">Cyan</GradientButton>
<GradientButton color="teal">Teal</GradientButton>
<GradientButton color="lime">Lime</GradientButton>
<GradientButton color="red">Red</GradientButton>
<GradientButton color="pink">Pink</GradientButton>

<style>
  .button {
    left: 300px;
    position: relative;
  }
</style>
