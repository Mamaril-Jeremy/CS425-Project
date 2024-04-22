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
  let click = true;

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
      console.log(connections[counter].userID);
      sendDataToFlask(userUID, connections[counter].userID, decision);
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

  function toggleFilterButtonStyle(buttonIndex) {
    const buttons = document.querySelectorAll('.filter button');
    buttons.forEach((button, index) => {
        if (index === buttonIndex) {
            button.classList.add('button-clicked');
        } else {
            button.classList.remove('button-clicked');
        }
    });
  }

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

    .filter {
      position: absolute;
      bottom: 80px; 
      left: 50%;
      transform: translateX(-50%);
      z-index: 1; 
    }

    button{
      margin-left: 10px;
    }

    .button-clicked{
      background-color: blue;
      color: white;
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

  <div class="filter">Filter by:  &nbsp; 
    <button on:click={() => toggleFilterButtonStyle(0)}>Location</button>
    <button on:click={() => toggleFilterButtonStyle(1)}>Interests</button>
    <button on:click={() => toggleFilterButtonStyle(2)}>Skills</button>
  </div>




  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</body>
