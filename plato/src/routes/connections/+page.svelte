<script>
    let selected = null;
  
    function toggleBox(boxNumber) {
      if (selected === boxNumber) {
        selected = null;
      } else {
        selected = boxNumber;
      }
    }
  </script>
  
  <style>
    .center-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
  
    .quadrant {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: solid;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
  
    .button {
      cursor: pointer;
      padding: 10px;
      background-color: #0074d9;
      color: white;
      border: none;
    }
  
    .content {
      display: none;
      padding: 10px;
      border: 1px solid #ccc;
    }
  
    .content.selected {
      display: block;
    }
  </style>
  
  <div class="center-container">
    <div class="container">
      <div class="quadrant">
        <button on:click={() => toggleBox(1)} class="button">Resume</button>
        <div class="content" class:selected={selected === 1}>
          <!-- Add your Resume content here -->
        </div>
      </div>
      <div class="quadrant">
        <button on:click={() => toggleBox(2)} class="button">Interests</button>
        <div class="content" class:selected={selected === 2}>
          <!-- Add your Interests content here -->
        </div>
      </div>
      <div class="quadrant">
        <button on:click={() => toggleBox(3)} class="button">Accolades</button>
        <div class="content" class:selected={selected === 3}>
          <!-- Add your Accolades content here -->
        </div>
      </div>
      <div class="quadrant">
        <button on:click={() => toggleBox(4)} class="button">Education</button>
        <div class="content" class:selected={selected === 4}>
          <!-- Add your Education content here -->
        </div>
      </div>
    </div>
  </div>
  