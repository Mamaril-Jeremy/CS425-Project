<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">   
</head>
<body>
    <div class="name">Jeremy Mamaril</div>
    <div class="card">
        <div class="section">Resume</div>
        <div class="section">Interests</div>
        <div class="section">Accolades</div>
        <div class="section">Education</div>
        <div class="circle"></div>
    </div>
</body>

<style>
    .card {
        width: 600px;
        height: 400px;
        border: 1px solid #000;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: absolute;
        top: 350px;
        left: 750px;
        transform: translate(-50%, -50%);
    }

    .name{
        position: relative;
        top: 100px;
        left: 0px;
        align-items: center;
        font-size: 18px;
    }

    .section {
        width: 50%;
        height: 50%;
        box-sizing: border-box;
        border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .circle {
        width: 30%; 
        height: 40%; 
        background-color: #FFFFFF; 
        border-radius: 50%; 
        border: 1px solid #000;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
