const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const dots = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawOnCanvas();
}

function drawOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const dot of dots) {
        drawDitheredDot(dot.x, dot.y, dot.radius, dot.color);
    }
}

function drawDitheredDot(x, y, radius, color = "black") {
    let baseColor = color;
    let h, s, l;

    if (color.startsWith("hsl")) {
        // Extract HSL components for color variations
        const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (match) {
            h = parseInt(match[1]);
            s = parseInt(match[2]);
            l = parseInt(match[3]);
        }
    }

    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            const distance = Math.sqrt(i * i + j * j);
            if (distance > radius) continue;

            const probability = 1 - distance / radius;

            const varianceFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
            if (Math.random() < probability * probability * varianceFactor) {
                const pixelSize =
                    Math.random() < 0.85
                        ? 1
                        : 1 + Math.floor(Math.random() * 2);

                if (h !== undefined) {
                    const hueVariance = h + Math.floor(Math.random() * 21) - 10;
                    const satVariance = Math.min(
                        100,
                        Math.max(0, s + Math.floor(Math.random() * 21) - 10)
                    );
                    const lightVariance = Math.min(
                        90,
                        Math.max(10, l + Math.floor(Math.random() * 31) - 15)
                    );

                    ctx.fillStyle = `hsl(${hueVariance}, ${satVariance}%, ${lightVariance}%)`;
                } else {
                    ctx.fillStyle = baseColor;
                }

                ctx.fillRect(x + i, y + j, pixelSize, pixelSize);
            }
        }
    }
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const radius = 5 + Math.random() * 250;
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30);
    const lightness = 40 + Math.floor(Math.random() * 20);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    dots.push({ x, y, radius, color });

    drawOnCanvas();
});

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const targetFPS = 1;
const frameInterval = 1000 / targetFPS;
let lastFrameTime = 0;

drawOnCanvas();
