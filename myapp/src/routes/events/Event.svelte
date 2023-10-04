<script>
    import { Carousel } from 'flowbite-svelte';
    export const images = [
      {
        alt: 'Reno Balloon Races',
        src: '/src/routes/events/Balloon Races.jpg',
        title: 'Balloon Races'
      },
      {
        alt: 'Cristina Gottardi',
        src: '/images/carousel/cristina-gottardi-CSpjU6hYo_0-unsplash.webp',
        title: 'cristina-gottardi-CSpjU6hYo_0-unsplash.com'
      },
      {
        alt: 'Johannes Plenio',
        src: '/images/carousel/johannes-plenio-RwHv7LgeC7s-unsplash.webp',
        title: 'johannes-plenio-RwHv7LgeC7s-unsplash.com'
      },
      {
        alt: 'Jonatan Pie',
        src: '/images/carousel/jonatan-pie-3l3RwQdHRHg-unsplash.webp',
        title: 'jonatan-pie-3l3RwQdHRHg-unsplash.com'
      },
      {
        alt: 'Mark Harpur',
        src: '/images/carousel/mark-harpur-K2s_YE031CA-unsplash.webp',
        title: 'mark-harpur-K2s_YE031CA-unsplash'
      },
      {
        alt: 'Pietro De Grandi',
        src: '/images/carousel/pietro-de-grandi-T7K4aEPoGGk-unsplash.webp',
        title: 'pietro-de-grandi-T7K4aEPoGGk-unsplash'
      },
      {
        alt: 'Sergey Pesterev',
        src: '/images/carousel/sergey-pesterev-tMvuB9se2uQ-unsplash.webp',
        title: 'sergey-pesterev-tMvuB9se2uQ-unsplash'
      },
      {
        alt: 'Solo travel goals',
        src: '/images/carousel/solotravelgoals-7kLufxYoqWk-unsplash.webp',
        title: 'solotravelgoals-7kLufxYoqWk-unsplash'
      }
    ];
    import { images } from './imageData/+server.js';
  </script>

<div class="max-w-4xl">
    <Carousel {images} duration="3000" />
</div>