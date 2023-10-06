<body>
    <div class="container">
        <div class="quadrant"></div>
        <div class="quadrant"></div>
        <div class="quadrant"></div>
        <div class="quadrant"></div>
    </div>
</body>

<style>
    body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    width: 200px;
    height: 200px;
    position: relative;
}

.quadrant {
    width: 50%;
    height: 50%;
    position: absolute;
}

.quadrant:nth-child(1) {
    top: 0;
    left: 0;
}

.quadrant:nth-child(2) {
    top: 0;
    left: 50%;
}

.quadrant:nth-child(3) {
    top: 50%;
    left: 0;
}

.quadrant:nth-child(4) {
    top: 50%;
    left: 50%;
}

</style>