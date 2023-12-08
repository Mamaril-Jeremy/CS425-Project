<script>
    
</script>


<body>
    <div class="section">
        <div>
            <h1>Section 1</h1>
            <p>This is the first section of our scrolling website.</p>
        </div>
        <div>
            yo
        </div>
    </div>
    
    <div class="section section1">
        <div>
            <h1>76% of people think mentors are important</h1>
            <p>x</p>
        </div>
    </div>



    <div class="section">
        <div>
            <h1>Section 2</h1>
            <p>Explore amazing content in this section.</p>
        </div>
        <div>
            yo
        </div>
    </div>

    <div class="section">
        <div>
            <h1>Section 3</h1>
            <p>Learn more about our services here.</p>
        </div>
        <div>
            yo
        </div>
    </div>

    <div class="section">
        <div>
            <h1>Contact Us</h1>
            <p>Reach out to us for any inquiries or collaborations.</p>
        </div>
        <div>
            yo
        </div>
    </div>
</body>

<style>
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
    }

    .section {
        height: 300px;
        background-color: #3498db;
        color: #fff;
        text-align: center;
        display: flex;
        flex-direction: row;
        font-size: 36px;
        border: 2px solid black;
    }

    .section1 {
        overflow: hidden;
    }

    .section > div {
        width: 25%;
        padding: 20px;
        box-sizing: border-box;
    }

    .section > div:nth-child(1) {
        background-color: #3498db;
        border-right: black;
    }

    .section > div:nth-child(2) {
        width: 75%;
        background-color: #2ecc71;
    }

    h1 {
        margin-bottom: 20px;
        font-size: 48px;
    }

    p {
        font-size: 20px;
        margin-top: 50px;
        position: absolute;
    }
</style>