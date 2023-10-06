<script>
  import { Carousel, Thumbnails } from 'flowbite-svelte';
  import { images } from './images.js';

  let index = 0;
  let forward = true;
</script>

<div class="max-w-4xl space-y-2">
  <Carousel {images} {forward} let:Indicators let:Controls bind:index>
    <Controls />
    <Indicators />
  </Carousel>
  <Thumbnails {images} {forward} bind:index />
</div>