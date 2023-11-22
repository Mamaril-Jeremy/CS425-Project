<script>
</script>

<style>
    .card {
        width: 600px;
        height: 400px;
        background-color: #ffffff;
        border: 1px solid #ccc;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        position: relative;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }

    .name {
        width: 100%;
        text-align: center;
        font-size: 24px;
        padding: 20px 0;
        background-color: #333;
        color: #fff;
        order: 2;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        user-select: text; 
    }

    .section {
        width: 50%;
        height: 50%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
        transition: background-color 0.3s, color 0.3s;
        user-select: none; 
        position: relative;
    }

    .section:hover {
        background-color: rgb(44, 102, 244);
    }

    .section a {
        text-decoration: none;
        font-size: 18px;
        font-weight: 600; 
        color: rgb(51, 51, 51); 
        outline: none; 
        transition: background-color 0.3s, color 0.3s; 
        display: block; 
        padding: 10px; 
        text-align: center; 
    }

    .section:hover a {
        background-color: rgb(44, 102, 244); 
    }

    .circle {
        width: 30%;
        height: 40%;
        border: 4px solid #333; 
        border-radius: 50%;
        background-image: url("$lib/assets/Mark Marsala.jpg"); 
        background-position: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
</style>

<div class="card">
    <div class="section"><a href="/"><span>Resume</span></a></div>
    <div class="section"><a href="/"><span>Interests</span></a></div>
    <div class="section"><a href="/"><span>Info</span></a></div>
    <div class="section"><a href="/"><span>Hours</span></a></div>
    <div class="name">Jeremy Mamaril</div>
    <div class="circle"></div>
</div>
