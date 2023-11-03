<script>
    let profileImage = 'profile-image.jpg'; // Replace with your image URL
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
        order: 2; /* Move the name to the bottom */
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        user-select: text; /* Allow text selection for the name */
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
        transition: background-color 0.3s, color 0.3s; /* Add color transition */
        user-select: none; /* Prevent text selection for button texts */
        position: relative;
    }

    .section:hover {
        background-color: rgb(44, 102, 244); /* Change background color on hover */
    }

    .section a {
        text-decoration: none;
        font-size: 18px;
        font-weight: 600; /* Make text bolder */
        color: rgb(51, 51, 51); /* Set text color to (51, 51, 51) */
        outline: none; /* Remove the outline on links */
        transition: background-color 0.3s, color 0.3s; /* Add color transition */
    }

    .section:hover a {
        background-color: rgb(44, 102, 244); /* Change background color when hovered */
        color: #fff; /* Set text color to white when hovered */
    }

    .circle {
        width: 30%;
        height: 40%;
        border: 4px solid #333; /* Wider borders */
        border-radius: 50%;
        background-image: url({profileImage});
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    /* Placeholder for empty profile image */
    .circle:empty::before {
        content: "No Image";
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333;
        width: 100%;
        height: 100%;
        background-color: #f0f0f0;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

<div class="card">
    <div class="section"><a href="resume.html"><span>Resume</span></a></div>
    <div class="section"><a href="interests.html"><span>Interests</span></a></div>
    <div class="section"><a href="info.html"><span>Info</span></a></div>
    <div class="section"><a href="hours.html"><span>Hours</span></a></div>
    <div class="name">Jeremy Mamaril</div>
    <div class="circle"></div>
</div>
