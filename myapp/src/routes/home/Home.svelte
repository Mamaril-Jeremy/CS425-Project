<script>
  import Card from "../../components/Card.svelte";
  import { Link } from "svelte-routing";
  import { GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

<Card />

<div class="button">
  <Link to="/connections">
    <GradientButton color="blue">
      Connect
      <!-- <ArrowRightOutline class="w-3.5 h-3.5 ml-2" /> -->
    </GradientButton>
  </Link>
</div>

<style>
  .button {
    left: 300px;
    position: relative;
  }
</style>
