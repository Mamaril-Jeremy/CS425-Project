<script>
    import { Carousel, Thumbnails } from 'flowbite-svelte';
    import { images } from '$lib/assets/images.js';
  </script>
  
  <style>
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .carousel-container {
      text-align: center;
      margin-top: 2rem;
    }
  
    .carousel {
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  
    .features {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  
    .feature {
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      background-color: #f5f5f5;
    }
  
    .feature h2 {
      font-size: 2rem;
      color: #333;
    }
  
    .feature p {
      font-size: 1.2rem;
      color: #666;
    }
  
    .hero {
      text-align: center;
      background-color: #f5f5f5;
      padding: 2rem 0;
    }
  
    .hero p {
      font-size: 1.5rem;
      color: #333;
    }

  </style>
  
  <main class="w-screen">
    <div class="container">
      <!-- Carousel section -->
      <div class="carousel-container">
        <div class="carousel">
          <Carousel {images}>
            <Thumbnails />
          </Carousel>
        </div>
      </div>
    
      <!-- Features section -->
      <div class="features">
        {#each [
          { title: 'Why Plato', text: 'Unlock your potential with a mentor by your side, guiding you through your career or academic journey. Mentorship is at the heart of what we do.' },
          { title: 'Connecting Dreams and Expertise', text: 'Plato brings together passionate learners and seasoned professionals, creating a dynamic synergy that propels you towards greatness.' },
          { title: 'Personalized Mentorship', text: 'Experience the art of personalization. We pair you with mentors who understand your unique goals and aspirations, providing tailored support.' },
          { title: 'Trust and Community', text: 'Plato is your sanctuary for forging genuine and meaningful connections. Join our community of learners and mentors and start your journey to success.' }
        ] as feature}
          <div class="feature">
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </div>
        {/each}
      </div>
    
      <!-- Hero section with Welcome to Plato -->
      <div class="hero">
        <p>Your journey to personal and professional growth starts here.</p>
      </div>
    </div>
  </main>

  