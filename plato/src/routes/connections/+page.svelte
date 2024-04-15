<script>
  import ConnectionsStore from '../../stores/ConnectionsStore.js';
  import Card from '$lib/components/Card.svelte';
  import { onMount } from 'svelte';
  import { Button } from 'flowbite-svelte';
  import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
  import Swiper from 'swiper';
  import 'swiper/css';
  

  let swiper, currentID = 0;
  let connections = [];

  onMount(() => {
    swiper = new Swiper(".mySwiper", {
      effect: "cards",
      grabCursor: true,
      cardsEffect: {
        slideShadows: false, // Disable slide shadows
        rotate: 10, // Set the rotation angle of the cards
        depth: 100, // Set the depth (scaling) of the cards
        stretch: 0, // Set the stretch amount of the cards
        modifier: 1, // Set the modifier of the cards
      }
    });
  });

  function handlePrevious() {
    swiper.slidePrev();
    handleDelete(currentID);
    currentID++;
  }

  function handleNext() {
    swiper.slideNext();
    handleDelete(currentID);
    currentID++;
  }

  ConnectionsStore.subscribe(data => {
    connections = data;
  });

  const handleDelete = (id) => {
    ConnectionsStore.update(connections => {
      return connections.filter(connection => connection.id != id);
    });
  };
</script>

<head>
  <meta charset="utf-8" />
  <title>Swiper demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
  <!-- Link Swiper's CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <!-- Demo styles -->
  <style>
    body {
      position: relative;
      height: 100vh;
      background: #fff;
      color: #000;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper {
      width: 620px;
      height: 420px;
    }

    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      font-size: 22px;
      font-weight: bold;
      color: #fff;
      width: 520px;
      height: 420px;
    }

    .pass {
      text-align: center;
      padding-right: 10px;
    }

    .connect {
      text-align: center;
      padding-left: 10px;
    }
  </style>
</head>

<body>
  <div class="pass">
    <Button class="!p-2" on:click={handlePrevious}><ArrowLeftOutline class="w-5 h-5 mr-2" /> Pass</Button>
  </div>
  {#if connections.length > 0}
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      {#each connections as connection (connection.id)}
      <div class="swiper-slide"><Card/></div>
      {/each}
    </div>
  </div>
  {:else}
  <h1 class="no-cards">No cards left</h1>
  {/if}
  <div class="connect">
    <Button class="!p-2" on:click={handleNext}>Connect <ArrowRightOutline class="w-5 h-5 ml-2" /></Button>
  </div>

  <!-- Swiper JS -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</body>

