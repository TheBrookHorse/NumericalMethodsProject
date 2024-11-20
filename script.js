document.addEventListener('DOMContentLoaded', () => {
    // Data for star systems
    const starSystems = {
        "Sol": {
            star: { name: "Sun", size: 50, color: "#FFD700" },
            planets: [
                { name: "Mercury", distance: 80, size: 5, color: "#a9a9a9" },
                { name: "Venus", distance: 120, size: 12, color: "#f5deb3" },
                { name: "Earth", distance: 160, size: 12, color: "#2f74c0" },
                { name: "Mars", distance: 200, size: 8, color: "#d14e42" }
            ]
        },
        "Alpha Centauri": {
            star: { name: "Alpha Centauri A", size: 60, color: "#FFDAB9" },
            planets: [
                { name: "Proxima b", distance: 100, size: 10, color: "#ff4500" }
            ]
        }
    };

    // Get canvas and context
    const canvas = document.getElementById("simulationCanvas");
    const ctx = canvas.getContext("2d");
    
    // Set initial zoom and pan
    let zoomLevel = 1;
    let offsetX = 0;
    let offsetY = 0;
    
    // Keep track of animation state
    let animationFrame;
    
    // Adjust canvas size dynamically
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Draw the star system
    function drawStarSystem(systemName) {
        const system = starSystems[systemName];
        if (!system) return;
    
        ctx.save(); // Save the current context state
        ctx.setTransform(zoomLevel, 0, 0, zoomLevel, offsetX, offsetY);
    
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width / zoomLevel, canvas.height / zoomLevel);
    
        const centerX = canvas.width / (2 * zoomLevel);
        const centerY = canvas.height / (2 * zoomLevel);

        // Draw the star
        ctx.beginPath();
        ctx.arc(centerX, centerY, system.star.size, 0, Math.PI * 2);
        ctx.fillStyle = system.star.color;
        ctx.fill();
    
        // Draw planets
        system.planets.forEach((planet, index) => {
            const angle = (Date.now() / 2000 + index) * 0.5; // Orbit animation
            const x = centerX + Math.cos(angle) * planet.distance;
            const y = centerY + Math.sin(angle) * planet.distance;
    
            // Planet
            ctx.beginPath();
            ctx.arc(x, y, planet.size, 0, Math.PI * 2);
            ctx.fillStyle = planet.color;
            ctx.fill();
    
            // Planet name
            ctx.fillStyle = "#fff";
            ctx.font = "12px Arial";
            ctx.fillText(planet.name, x + planet.size + 5, y);
        });
    
        ctx.restore(); // Restore the original context state
    
        // Continue animating
        animationFrame = requestAnimationFrame(() => drawStarSystem(systemName));
    }
    
    // Zoom and pan functionality
    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const scaleAmount = 1.1;
        const zoomDirection = e.deltaY < 0 ? 1 : -1;
        zoomLevel *= zoomDirection > 0 ? scaleAmount : 1 / scaleAmount;
        zoomLevel = Math.max(0.5, Math.min(zoomLevel, 5)); // Clamp zoom level
    });
    
    let isDragging = false;
    let lastX, lastY;
    
    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });
    
    canvas.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        offsetX += dx;
        offsetY += dy;
        lastX = e.clientX;
        lastY = e.clientY;
    });

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    });
    
    // Planet click detection
    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left - offsetX) / zoomLevel;
        const mouseY = (e.clientY - rect.top - offsetY) / zoomLevel;
    
        const system = starSystems[document.getElementById("starSystemSelect").value];
        if (!system) return;
    
        const centerX = canvas.width / (2 * zoomLevel);
        const centerY = canvas.height / (2 * zoomLevel);

        system.planets.forEach((planet) => {
            const angle = (Date.now() / 2000) * 0.5; // Simplified angle
            const x = centerX + Math.cos(angle) * planet.distance;
            const y = centerY + Math.sin(angle) * planet.distance;
    
            if (Math.hypot(mouseX - x, mouseY - y) < planet.size) {
                alert(`Planet: ${planet.name}\nDistance from Star: ${planet.distance}`);
            }
        });
    });
    
    // Star system selection
    document.getElementById("starSystemSelect").addEventListener("change", (e) => {
        cancelAnimationFrame(animationFrame); // Stop previous animation
        const selectedSystem = e.target.value;
        drawStarSystem(selectedSystem);
    });
    
    // Initial render
    drawStarSystem("Sol");
});
