<!-- Import Svelte components and libraries -->
<script>
  import { Link } from "svelte-routing";
  import { GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';

  import { Carousel, Thumbnails } from 'flowbite-svelte';
  import { images } from '../events/images.js';

  // Initialize variables
  let index = 0;
  let forward = true;
</script>

<!-- Apply CSS styles -->
<style>
  .hero {
    text-align: center;
    background-color: #f5f5f5;
    padding: 4rem 0;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .hero p {
    font-size: 1.5rem;
    color: #666;
  }

  .features {
    text-align: center;
    padding: 2rem 0;
  }

  .feature {
    margin: 2rem 0;
  }

  .feature h2 {
    font-size: 2rem;
    color: #333;
  }

  .feature p {
    font-size: 1.2rem;
    color: #666;
  }
</style>

<!-- Carousel at the top -->
<div class="max-w-4xl space-y-2">
  <Carousel {images} {forward} let:Indicators let:Controls bind:index>
    <Controls />
    <Indicators />
  </Carousel>
</div>

<!-- Hero section -->
<div class="hero">
  <h1>Welcome to Plato</h1>
  <p>Your journey to personal and professional growth starts here.</p>
  <!-- Button to learn more -->
  <GradientButton color="blue" href="/about-out" target="_self">
    Discover More
    <ArrowRightOutline />
  </GradientButton>
</div>

<!-- Features section -->
<div class="max-w-4xl space-y-4 features">
  <!-- Feature 1 -->
  <div class="feature">
    <h2>Why Plato?</h2>
    <p>Unlock your potential with a mentor by your side, guiding you through your career or academic journey. Mentorship is at the heart of what we do.</p>
  </div>

  <!-- Feature 2 -->
  <div class="feature">
    <h2>Connecting Dreams and Expertise</h2>
    <p>Plato brings together passionate learners and seasoned professionals, creating a dynamic synergy that propels you towards greatness.</p>
  </div>

  <!-- Feature 3 -->
  <div class="feature">
    <h2>Personalized Mentorship</h2>
    <p>Experience the art of personalization. We pair you with mentors who understand your unique goals and aspirations, providing tailored support.</p>
  </div>

  <!-- Feature 4 -->
  <div class="feature">
    <h2>Trust and Community</h2>
    <p>Plato is your sanctuary for forging genuine and meaningful connections. Join our community of learners and mentors and start your journey to success.</p>
  </div>
</div>
