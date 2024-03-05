<script>
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

  import Logo from '$lib/assets/plato_logo.png';
  import videoBackground from '$lib/assets/video.mp4';

  let text = "Welcome to Plato!";
  let animatedText = "";
  let fadeIn = false;

  onMount(() => {
    const typeAnimation = (text, speed) => {
      let index = 0;

      const intervalId = setInterval(() => {
        animatedText = text.slice(0, index);
        index++;

        if (index > text.length) {
          clearInterval(intervalId);
          fadeIn = true; 
        }
      }, speed);
    };

    typeAnimation(text, 60);
  });

  const joinClick = async () => {
    goto("/create-account");
  };

  const aboutClick = async () => {
    goto("/about");
  };
</script>

<body>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="section section1">
    <div>
      <h1 class="welcome">{animatedText}</h1>
    </div>
    <div>
      {#if fadeIn}
      <p in:fade={{delay: 5, duration: 1600}}><strong>We are committed to establishing worthwhile mentor-mentee relationships.</strong></p>
      {/if}
    </div>
    <video autoplay loop muted>
      <source src={videoBackground} type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <div class="section section2">
    <div>
      <h1>76% of people think mentors are important</h1>
      <p>But only 37% of people currently have one.</p>
      <p>We believe in changing that.</p>
    </div>
  </div>

  <div class="section section3">
    <div>
      <h1>Learn More About Our Values Here</h1>
      <button on:click={aboutClick}>Learn More</button>
    </div>
  </div>

  <div class="section section4">
    <div>
      <span class="material-icons">mode_comment</span>
      <h1>Chat</h1>
      <p>with your connections.</p>
    </div>
    <div>
      <span class="material-icons">person_add</span>
      <h1>Connect</h1>
      <p>with your next potential mentor.</p>
    </div>
    <div>
      <span class="material-symbols-outlined">person_play</span>
      <h1>Participate</h1>
      <p>in engaging weekly events.</p>
    </div>
  </div>

  <div class="section section5">
    <div>
      <h1>Our strongest values are <strong>trust</strong> and <strong>community</strong>.</h1>
      <p>Ready to get started?</p>
      <button on:click={joinClick}>Join Now</button>
    </div>
    <div></div>
  </div>
  

  <div class="section section6">
    <div>
      <h1>Contact Us</h1>
      <p>Reach out to us for any inquiries or collaborations.</p>
    </div>
    <div></div>
  </div>
</body>


<style>
  body {
    margin: 0;
    padding: 0;
    font-family: Georgia;
  }

  .section {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
  }

  .section1 {
    height: 550px;
    color: #fff;
    display: block;
  }

  .section1 > div > h1{
    margin-top: 150px;
    font-size: 108px;
    text-align: center;
  }

  .section2,
  .section3 {
    height: 400px;
    background-color: #FEF9FF;
    color: #3498db;
  }

  .section4,
  .section6 {
    height: 450px;
    background-color: #3498db;
    color: #fff;
    flex-direction: row;
  }

  .section4 div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section5 {
    height: 500px;
    background-color: #FEF9FF;
    color: #3498db;
    line-height: 2;
  }

  .section6 {
    height: 700px;
  }

  h1 {
    font-size: 48px;
    font-family: Georgia;
    margin-bottom: 10px;
    margin-top: 0 auto;
  }

  p {
    font-size: 27px;
    margin-top: 30px;
    position: relative;
  }

  button {
    background-color: #3498db;
    border: none;
    color: #FEF9FF;
    padding: 12px 24px;
    text-align: center;
    font-size: 18px;
    margin: 20px auto;
    cursor: pointer;
    border-radius: 12px;
  }

  .material-icons,
  .material-symbols-outlined {
    font-size: 40px;
    margin: 0 10px;
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1000;
  }
</style>