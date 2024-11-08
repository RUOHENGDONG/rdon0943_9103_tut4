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

    // Define softened color stops for a harmonious gradient, including blue-green colors in the lower part
    const colors = [
        { r: 160, g: 200, b: 220 },  // Light sky blue at the top
        { r: 180, g: 220, b: 170 },  // Light greenish color
        { r: 245, g: 225, b: 150 },  // Warm yellow
        { r: 250, g: 180, b: 120 },  // Soft orange
        { r: 240, g: 140, b: 130 },  // Soft red-pink
        { r: 100, g: 170, b: 180 },  // New blue-green color
        { r: 50, g: 120, b: 140 }    // Deep blue-green near the bottom
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

// Function to create a rectangle
function createRect(x, y, width, height, r, g, b) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", `rgba(${r}, ${g}, ${b}, 1)`);
    return rect;
}

// Function to add a texture effect
const circles = [];
function addTexture(baseRect, r, g, b, rectWidth, rectHeight, opacity) {
    let svg = document.getElementById("svg");

    for (let j = 0; j < 5; j++) {
        const offsetX = Math.random() * 10 - 5;
        const offsetY = Math.random() * 10 - 5;
        const colorVariation = (Math.random() - 0.5) * 20;
        const textureColor = `rgba(${Math.min(255, Math.max(0, r + colorVariation))}, 
                                    ${Math.min(255, Math.max(0, g + colorVariation))}, 
                                    ${Math.min(255, Math.max(0, b + colorVariation))}, ${opacity})`;

        // let textureRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        // textureRect.setAttribute("x", parseFloat(baseRect.getAttribute("x")) + offsetX);
        // textureRect.setAttribute("y", parseFloat(baseRect.getAttribute("y")) + offsetY);
        // textureRect.setAttribute("width", rectWidth * 0.9);
        // textureRect.setAttribute("height", rectHeight * 0.9);
        // textureRect.setAttribute("fill", textureColor);

        // svg.appendChild(textureRect);
        for (let i = 0; i < 400; i++) {
            const seed = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            seed.setAttribute("cx", random(parseFloat(baseRect.getAttribute("x")), rectWidth));
            seed.setAttribute("cy", random(parseFloat(baseRect.getAttribute("y")), rectHeight));
            seed.setAttribute("r", 2);
            seed.setAttribute("fill", textureColor);
            svg.appendChild(seed);
            circles.push(seed);
        }
    }
}

// Execute the main draw functions on page load
window.onload = function() {
    drawSkyBackground();
    drawBuilding();
    drawBuilding1(); // Ensure the second building set is drawn

    // Draw multiple waves
    const wavePositions = [200, 300, 400, 530, 510, 470, 350, 360, 750, 770, 600];
    const waveYPositions = [470, 488, 470, 470, 520, 550, 520, 550, 510, 550, 530];

    for (let i = 0; i < wavePositions.length; i++) {
        drawWaves(wavePositions[i], waveYPositions[i]);
    }
};


// Function to draw the building structure
function drawBuilding() {
    const svg = document.getElementById("svg");

    // Building outline
    const building = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building.setAttribute("points", "0,300 50,240 100,240 100,150 110,150 120,40 130,150 140,150 140,200 170,200 200,200 260,210 300,220 330,250 330,270 450,270 480,300");
    building.setAttribute("fill", "rgba(44, 27, 50, 0.8)");
    svg.appendChild(building);

    // Draw reflection for building
    drawReflection();

    function drawReflection() {
        const initialY = 300; 
        const segmentHeight = 20; 
        const reflectionSegments = 14; 

        for (let i = 0; i < reflectionSegments; i++) {
            const segment = document.createElementNS("http://www.w3.org/2000/svg", "rect");

       
            segment.setAttribute("x", 100 + Math.sin(i * 1) * 5); 
            segment.setAttribute("y", initialY + i * segmentHeight);
            segment.setAttribute("width", "45");
            segment.setAttribute("height", segmentHeight);
            segment.setAttribute("fill", "rgba(44, 27, 50, 0.6)");

            svg.appendChild(segment);
        }
    }
}

// Function to draw additional buildings
function drawBuilding1() {
    const svg = document.getElementById("svg");

    // building1
    const building1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building1.setAttribute("points", "650,300 720,160 750,300");
    building1.setAttribute("fill", "rgba(30, 30, 30, 0.15)");
    svg.appendChild(building1);

    // building2
    const building2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building2.setAttribute("points", "720,300 790,110 830,300");
    building2.setAttribute("fill", "rgba(30, 30, 30, 0.15)");
    svg.appendChild(building2);

    // building3
    const building3 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building3.setAttribute("points", "480,300 630,270 750,300");
    building3.setAttribute("fill", "rgba(30, 30, 30, 0.15)");
    svg.appendChild(building3);
}

// Function to draw waves
function drawWaves(startX, waveY) {
    const svg = document.getElementById("svg");

    // Draw a wave
    const wave = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const cx = startX; // Set the horizontal center for a single wave
    const cy = waveY; // Set the vertical center for a single wave
    const rx = 40;
    const ry = 10;
    wave.setAttribute("d", `M${cx - rx},${cy} A${rx},${ry} 0 1,0 ${cx + rx},${cy}`);
    wave.setAttribute("fill", "rgba(0, 105, 197, 0.3)");
    svg.appendChild(wave);
}


const meteors = [];
const seeds = [];

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

    blink();
    window.requestAnimationFrame(animation);
}

function drawSeed() {
    const svg = document.getElementById("svg");

    for (let i = 0; i < 100; i++) {
    const seed = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    seed.setAttribute("points", "10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8");
        seed.setAttribute("fill", "rgba(255, 255, 255)");
        seed.setAttribute("transform", `translate(${random(0, 800)}, ${random(300, 600)})`);
        seed.setAttribute("opacity", random(0.5, 1));
        svg.appendChild(seed);
        seeds.push(seed);
    }
}

function blink() {
    seeds.forEach((seed, index) => {
        let opacity = parseFloat(seed.getAttribute("opacity"));
        opacity -= 0.01;
        seed.setAttribute("opacity", opacity);
        if (opacity < 0) {
            seed.setAttribute("opacity", 1);
        }
    });
}

// Execute the main draw functions on page load
window.onload = function() {
    drawSkyBackground();
    drawMeteor()
    drawBuilding();
    drawBuilding1(); // Ensure the second building set is drawn

    // Draw multiple waves
    const wavePositions = [200, 300, 400, 530, 510, 470, 350, 360, 750, 770, 600];
    const waveYPositions = [470, 488, 470, 470, 520, 550, 520, 550, 510, 550, 530];

    for (let i = 0; i < wavePositions.length; i++) {
        drawWaves(wavePositions[i], waveYPositions[i]);
    }

    drawMoon(700, 100);
    drawSeed();
    window.requestAnimationFrame(animation);
};

var sound;
var peaks;

function preload() {
    sound = loadSound('bg.mp3');
}

function setup() {
    sound.play();
    analyzer = new p5.Amplitude(); 
    analyzer.setInput(sound);
}

function draw() {
    frameRate(60)
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let rms = analyzer.getLevel() * 100;
        if (rms > 0) {
            let amp = 10;
            let x = parseFloat(circle.getAttribute("cx"));
            let y = parseFloat(circle.getAttribute("cy"));
            let angle = random(0, 300 * Math.PI);
            let dx = amp * rms * Math.cos(angle);
            let dy = amp * rms * Math.sin(angle);
            circle.setAttribute("cx", x + dx);
            circle.setAttribute("cy", y + dy);
        }
    }
}
