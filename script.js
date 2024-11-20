document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('simulation-container');
    if (!container) {
        console.error('Simulation container not found!');
        return;
    }

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // Reinitialize stars
        initializeStars();
    });

    // Starfield settings
    const stars = [];
    const numStars = 100;

    // Initialize stars
    function initializeStars() {
        stars.length = 0;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.2,
            });
        }
    }
    initializeStars();

    // Draw stars
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();

            // Move stars downward
            star.y += star.speed;

            // Reset star position
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(drawStars);
    }

    // Start animation
    drawStars();
});
