const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 2;

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (
        (ballX - ballSize < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX + ballSize > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Reset ball if it goes out of bounds
    if (ballX + ballSize < 0 || ballX - ballSize > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    }
}

function movePaddle(e) {
    const paddleSpeed = 30;
    if (e.key === 'ArrowUp' && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    }
    if (e.key === 'ArrowDown' && paddle2Y + paddleHeight < canvas.height) {
        paddle2Y += paddleSpeed;
    }
    if (e.key === 'w' && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
    if (e.key === 's' && paddle1Y + paddleHeight < canvas.height) {
        paddle1Y += paddleSpeed;
    }
}

document.addEventListener('keydown', movePaddle);

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
