<script>
  //This code was developed by Michael Nia and Jeremy Mamaril
  let sections = [
    { title: 'Why Plato', text: 'Unlock your potential with a mentor by your side, guiding you through your career or academic journey. Mentorship is at the heart of what we do.' },
    { title: 'Connecting Dreams and Expertise', text: 'Plato brings together passionate learners and seasoned professionals, creating a dynamic synergy that propels you towards greatness.' },
    { title: 'Personalized Mentorship', text: 'Experience the art of personalization. We pair you with mentors who understand your unique goals and aspirations, providing tailored support.' },
    { title: 'Trust and Community', text: 'Plato is your sanctuary for forging genuine and meaningful connections. Join our community of learners and mentors and start your journey to success.' }
  ];
</script>

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
    border-top: 2px solid #888;
  }

  .section1 {
    height: 600px;
    background-color: #3498db;
    color: #fff;
  }

  .section2,
  .section3 {
    height: 400px;
    background-color: #FEF9FF;
    color: #3498db;
  }

  .section4{
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
  }

  h1 {
    font-size: 48px;
    font-family: Georgia;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  
  p {
    font-size: 27px;
    margin-top: 25px;
    position: relative;
  }
</style>

<body>
  <div class="section section1">
    <div>
      <h1 class="welcome">Why Plato?</h1>
      <p>Unlock your potential with a mentor by your side, guiding you through your career or academic journey.</p>
      <p>Mentorship is at the heart of what we do.</p>
    </div>
  </div>

  <div class="section section2">
    <div>
      <h1>Connecting Dreams and Expertise</h1>
      <p>Plato brings together passionate learners and seasoned professionals,</p>
      <p>creating a dynamic synergy that propels you towards greatness.</p>
    </div>
  </div>

  <div class="section section3">
    <div>
      <h1>Personalized Mentorship</h1>
      <p>Experience the art of personalization.</p>
      <p>We pair you with mentors who understand your unique goals and aspirations, providing tailored support.</p>
    </div>
  </div>

  <div class="section section4">
    <div>
      <h1>Trust and Community</h1>
      <p>Plato is your sanctuary for forging genuine and meaningful connections.</p>
      <p>Join our community of learners and mentors and start your journey to success.</p>
    </div>
  </div>

  <div class="section section5">
    <div>
      <h1>Thank You for Allowing Us to Share About Our Values</h1>
    </div>
  </div>
</body>
