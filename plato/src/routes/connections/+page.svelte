<script>
  import { onMount } from 'svelte';
  import Card from '$lib/components/Card.svelte';
  import Startcard from '$lib/components/Startcard.svelte';
  import Endcard from '$lib/components/Endcard.svelte';
  import { Button } from 'flowbite-svelte';
  import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase/firebase.client.js';
  import ConnectionsStore from '../../stores/ConnectionsStore.js';
  import 'swiper/css';
  import Swiper from 'swiper';

  let counter = -1, userUID, swiper;
  let connections = [];

  onMount(() => {
    swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: false,
        allowSlidePrev: false
    });
  });

  ConnectionsStore.subscribe(data => {
    connections = data;
  });

  function handleNext(decision) {
    swiper.slideNext();
    if (counter < connections.length && counter > -1) {
      sendDataToFlask(userUID, connections[counter].id, decision);
    }
    counter++;
  }

  async function sendDataToFlask(currentUser, viewedUser, selection) {
    const formData = new FormData()
    formData.append('currentUser', currentUser)
    formData.append('viewedUser', viewedUser)
    formData.append('selection', selection)
    try {
        const response = await fetch('http://localhost:5000/manage_connections', {
            method: 'POST',
            body: formData
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID = user.uid;
    }
  });
</script>

<head>
  <meta charset="utf-8" />
  <title>Swiper demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
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
      z-index: 0;
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
      width: 600px;
      height: 400px;
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
  {#if connections.length > 0}
    <div class="pass">
      <Button class="!p-2" on:click={() => handleNext('false')}><ArrowLeftOutline class="w-5 h-5 mr-2" /> Pass</Button>
    </div>
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
          <div class="swiper-slide"><Startcard/></div>
          {#each connections as connection (connection.id)}
            <div class="swiper-slide"><Card firstname={connection.firstname} lastname={connection.lastname} info={connection.info} status={connection.status} hours={connection.hours} skills={connection.skills} avatarUrl={connection.avatarUrl}/></div>
          {/each}
          <div class="swiper-slide"><Endcard/></div>
      </div>
    </div>
    <div class="connect">
      <Button class="!p-2" on:click={() => handleNext('true')}>Connect <ArrowRightOutline class="w-5 h-5 ml-2" /></Button>
    </div>
  {/if}

  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</body>
