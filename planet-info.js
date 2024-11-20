document.addEventListener("DOMContentLoaded", () => {
    // Data for star systems
    const starSystems = {
        "Sol": {
            star: { name: "Sun", size: 50, color: "#FFD700", type: "G-type main-sequence star" },
            planets: [
                { name: "Mercury", distance: 80, size: 5, color: "#a9a9a9", description: "A small, rocky planet with extreme temperatures." },
                { name: "Venus", distance: 120, size: 12, color: "#f5deb3", description: "The hottest planet in the Solar System." },
                { name: "Earth", distance: 160, size: 12, color: "#2f74c0", description: "The only known planet to support life." },
                { name: "Mars", distance: 200, size: 8, color: "#d14e42", description: "The Red Planet, with a cold, desert-like environment." }
            ]
        },
        "Alpha Centauri": {
            star: { name: "Alpha Centauri A", size: 60, color: "#FFDAB9", type: "G-type main-sequence star" },
            planets: [
                { name: "Proxima b", distance: 100, size: 10, color: "#ff4500", description: "A potentially habitable planet orbiting Proxima Centauri." }
            ]
        }
    };

    // Update the star system information based on the selected system
    function updateStarSystemInfo(systemName) {
        const system = starSystems[systemName];
        if (!system) return;

        // Show star information
        const starInfoDiv = document.getElementById("star-info");
        starInfoDiv.innerHTML = `
            <h2>Star: ${system.star.name}</h2>
            <p>Type: ${system.star.type}</p>
            <p>Size: ${system.star.size}x Earth</p>
            <p>Color: <span style="color:${system.star.color};">${system.star.name}</span></p>
        `;

        // Show planet information
        const planetInfoDiv = document.getElementById("planet-info");
        planetInfoDiv.innerHTML = "<h3>Planets:</h3>";
        system.planets.forEach(planet => {
            planetInfoDiv.innerHTML += `
                <div>
                    <h4>${planet.name}</h4>
                    <p>Distance from Star: ${planet.distance} million km</p>
                    <p>Size: ${planet.size}x Earth</p>
                    <p>Description: ${planet.description}</p>
                </div>
            `;
        });
    }

    // Star system selection listener
    document.getElementById("starSystemSelect").addEventListener("change", (e) => {
        const selectedSystem = e.target.value;
        updateStarSystemInfo(selectedSystem);
    });

    // Initial setup for default system (Sol)
    updateStarSystemInfo("Sol");
});
