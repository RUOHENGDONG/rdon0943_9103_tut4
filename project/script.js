// Main draw function to create sky background with gradient effect and texture
function drawSkyBackground() {
    let svg = document.getElementById("svg");

    // Clear previous content
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Define parameters for the sky gradient
    const rectHeight = 20;
    const rectWidth = 850;
    const numberOfRectangles = Math.ceil(600 / rectHeight);

    // Define softened color stops for a harmonious gradient
    const colors = [
        { r: 160, g: 200, b: 220 },
        { r: 180, g: 220, b: 170 },
        { r: 245, g: 225, b: 150 },
        { r: 250, g: 180, b: 120 },
        { r: 240, g: 140, b: 130 }
    ];

    // Calculate the number of rectangles per color section
    const sectionRectCount = Math.ceil(numberOfRectangles / colors.length);

    // Create rectangles with gradient effect
    for (let i = 0; i < numberOfRectangles; i++) {
        const sectionIndex = Math.floor(i / sectionRectCount);
        const nextSectionIndex = Math.min(sectionIndex + 1, colors.length - 1);
        const sectionRatio = (i % sectionRectCount) / sectionRectCount;

        const r = Math.round(colors[sectionIndex].r * (1 - sectionRatio) + colors[nextSectionIndex].r * sectionRatio);
        const g = Math.round(colors[sectionIndex].g * (1 - sectionRatio) + colors[nextSectionIndex].g * sectionRatio);
        const b = Math.round(colors[sectionIndex].b * (1 - sectionRatio) + colors[nextSectionIndex].b * sectionRatio);

        let rect = createRect(0, i * rectHeight, rectWidth, rectHeight, r, g, b);
        svg.appendChild(rect);

        addTexture(rect, r, g, b, rectWidth, rectHeight, 0.1);
    }
}

// Function to add a texture effect
function addTexture(baseRect, r, g, b, rectWidth, rectHeight, opacity) {
    let svg = document.getElementById("svg");

    for (let j = 0; j < 5; j++) {
        const offsetX = Math.random() * 10 - 5;
        const offsetY = Math.random() * 10 - 5;
        const colorVariation = (Math.random() - 0.5) * 20;
        const textureColor = `rgba(${Math.min(255, Math.max(0, r + colorVariation))}, 
                                    ${Math.min(255, Math.max(0, g + colorVariation))}, 
                                    ${Math.min(255, Math.max(0, b + colorVariation))}, ${opacity})`;

        let textureRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        textureRect.setAttribute("x", parseFloat(baseRect.getAttribute("x")) + offsetX);
        textureRect.setAttribute("y", parseFloat(baseRect.getAttribute("y")) + offsetY);
        textureRect.setAttribute("width", rectWidth * 0.9);
        textureRect.setAttribute("height", rectHeight * 0.9);
        textureRect.setAttribute("fill", textureColor);

        svg.appendChild(textureRect);
    }
}

// Function to draw the building structure
function drawBuilding() {
    const svg = document.getElementById("svg");

    // Building outline
    const building = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building.setAttribute("points", "0,300 50,240 100,240 100,150 110,150 120,40 130,150 140,150 140,200 170,200 200,200 260,210 300,220 330,250 330,270 450,270 480,300");
    building.setAttribute("fill", "rgba(44, 27, 50, 0.8)");
    svg.appendChild(building);

    // Reflection of building
    const reflection = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    reflection.setAttribute("x", "100");
    reflection.setAttribute("y", "300");
    reflection.setAttribute("width", "45");
    reflection.setAttribute("height", "280");
    reflection.setAttribute("fill", "rgba(44, 27, 50, 0.6)");
    svg.appendChild(reflection);
}

// Function to draw the moon
function drawMoon(x, y) {
    const svg = document.getElementById("svg");

    const moon = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    moon.setAttribute("id", "moon");
    moon.setAttribute("cx", x);
    moon.setAttribute("cy", y);
    moon.setAttribute("r", "40");
    moon.setAttribute("fill", "rgba(255, 255, 255, 0.8)");
    svg.appendChild(moon);

    const moonMirror = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    moonMirror.setAttribute("id", "moonMirror");
    moonMirror.setAttribute("cx", x);
    moonMirror.setAttribute("cy", y + 300);
    moonMirror.setAttribute("r", "40");
    moonMirror.setAttribute("fill", "rgba(255, 255, 255, 0.5)");
    svg.appendChild(moonMirror);
}

const meteors = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}
// Function to draw the meteor
function drawMeteor() {
    const svg = document.getElementById("svg");

    for (let i = 0; i < 100; i++) {
    const meteor = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        meteor.setAttribute("points", "10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8");
        meteor.setAttribute("fill", "rgba(255, 255, 255)");
        meteor.setAttribute("transform", `translate(${random(0, 800)}, ${random(0, 300)})`);
        meteor.setAttribute("opacity", random(0.5, 1));
        svg.appendChild(meteor);
        meteors.push(meteor);
    }
}

function animation() {
    const svg = document.getElementById("svg");
    const moon = document.getElementById("moon");
    const moonMirror = document.getElementById("moonMirror");
    if (moon) {
        let x = parseFloat(moon.getAttribute("cx"));
        let y = parseFloat(moon.getAttribute("cy"));
        x += 0.5;
        y += 0.2;
        moon.setAttribute("cx", x);
        moon.setAttribute("cy", y);
        if (x > 890) {
            svg.removeChild(moon);
        }
    }
    if (moonMirror) {
        let x = parseFloat(moonMirror.getAttribute("cx"));
        let y = parseFloat(moonMirror.getAttribute("cy"));
        x += 0.5;
        y -= 0.2;
        moonMirror.setAttribute("cx", x);
        moonMirror.setAttribute("cy", y);
        if (x > 890) {
            svg.removeChild(moonMirror);
        }
    }
    meteors.forEach((meteor, index) => {
        let x = parseFloat(meteor.getAttribute("transform").split(" ")[0].split("(")[1]);
        let y = parseFloat(meteor.getAttribute("transform").split(" ")[1].split(")")[0]);
        let opacity = parseFloat(meteor.getAttribute("opacity"));
        x += random(0.2, 0.5);
        y += random(0.2, 0.5);
        opacity -= 0.01;
        meteor.setAttribute("transform", `translate(${x}, ${y}) scale(${random(0.5, 1)})`);
        meteor.setAttribute("opacity", opacity);
        if (x > 890) {
            svg.removeChild(meteor);
            meteors.splice(index, 1);
        }
        if (y > 300) {
            svg.removeChild(meteor);
            meteors.splice(index, 1);
        }
    });
    window.requestAnimationFrame(animation);
}

// Execute the main draw functions on page load
window.onload = function() {
    drawSkyBackground();
    drawMeteor();
    drawBuilding();
    drawMoon(700, 100);
    window.requestAnimationFrame(animation);
};

window.addEventListener("click", () => {
    drawMeteor();
    drawMoon(700, 100);
})