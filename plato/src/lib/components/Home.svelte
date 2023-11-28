<script>
    import Logo  from '$lib/assets/plato_logo.png';
    import { onMount } from "svelte";
  
    let text = "Welcome to Plato!";
    let animatedText = "";
  
    onMount(() => {
      const typeAnimation = (text, speed) => {
        let index = 0;
  
        const intervalId = setInterval(() => {
          animatedText = text.slice(0, index);
          index++;
  
          if (index > text.length) {
            clearInterval(intervalId);
          }
        }, speed);
      };
  
      typeAnimation(text, 70);
    });
  </script>
  
  <body>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="section1">
    <div>
      <h1>{animatedText}</h1>
      <p>We establish mentor to mentee relationships.</p>
      <img src={Logo} alt="Logo">
    </div>
  </div>
  
    <div class="section2">
        <div>
          <h1>76% of people think mentors are important</h1>
          <p>But only 37% of people currently have one.</p>
        </div>
    </div>
  
    <div class="section3">
        <div>
          <h1>ENTER PLATO</h1>
          <p>We believe in establishing mentor to mentee relationships.</p>
        </div>
      </div>
    
      <div class="section4">
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
    
      <div class="section5">
        <div>
          <h1>Our strongest values are <strong>trust</strong> and <strong>community</strong>.</h1>
          <p>Ready to get started?</p>
          <button>Join Now</button>
        </div>
        <div></div>
      </div>
    
      <div class="section6">
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
    font-family: Arial, sans-serif;
  }
  
  .section1,
  .section2,
  .section3,
  .section4,
  .section5,
  .section6 {
    overflow: hidden;
    height: 400px;
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
    height: 600px;
    background-color: #3498db;
    color: #fff;
  }
  
  .section2 {
    background-color: #FEF9FF;
    color: #3498db;
  
    height: 400px;
  }
  
  .section3 {
    background-color: #FEF9FF;
    color: #3498db;
    flex-direction: row;
  }
  
  
  .section4 {
    background-color: #FEF9FF;
    color: #3498db;
    flex-direction: row;
  }
  
  .section4 div {
    flex: 1; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  
  .section5{
    background-color: #3498db;
    color: #fff;
    flex-direction: row;
    height: 700px;
  }
  
  
  h1 {
    font-size: 48px;
    font-family: Georgia;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 25px;
    margin-top: 25px;
    position: relative;
  }
  
  img{
    justify-content: center;
    width: 200px;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
  }
  
  button {
    background-color: white;
    border: none;
    color: #3498db;
    padding: 15px 32px;
    text-align: center;
    font-size: 16px;
    margin: 20px auto;
    cursor: pointer;
    border-radius: 12px;
  }
  
  .material-icons {
    font-size: 40px;
    margin: 0 10px;
  }
  
  .material-symbols-outlined {
    font-size: 40px;
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }
  </style>