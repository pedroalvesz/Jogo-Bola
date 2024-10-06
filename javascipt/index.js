import { Platform } from './Platform.js';
import { Ball } from './Ball.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const counter = document.getElementById("counter");
let counterValue = counter.getAttribute("value");

const ball = ballInit();
const platform = platformInit();

function loop() {
    reset();
    ball.draw(ctx);
    platform.draw(ctx);
    collisionDetection(ball, platform);

    platform.move();
    ball.updatePosition();

    requestAnimationFrame(loop);
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function ballInit() {
    const ballRadius = 10;
    const ballX = canvas.width / 2;
    const ballY = canvas.height - 30;
    const ballSpeedX = 2;
    const ballSpeedY = -2;

    return new Ball(canvas, ballRadius, ballX, ballY, ballSpeedX, ballSpeedY);
}

function platformInit() {
    const platformHeight = 10;
    const platformWidth = 100;

    return new Platform(canvas, platformHeight, platformWidth);
}

function collisionDetection(ball, platform) {
    const isBallCollidingWithFloor = ball.positionY + ball.speedY > canvas.height - ball.radius;
    if (isBallCollidingWithFloor) {
        const isBallCollidingWithPlatform = ball.positionX > platform.positionX && ball.positionX < platform.positionX + platform.width;
        if (isBallCollidingWithPlatform) {
            ball.speedY = -ball.speedY;
            incrementCounter();
            return;
        }

        document.location.reload();
    }
}

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);

function handleKeyDown(e) {
    platform.handleKeyPress(e.key);
}

function handleKeyUp(e) {
    platform.handleKeyUnpress(e.key);
}

function incrementCounter() {
    counterValue++;
    counter.textContent = counterValue;
}

loop();
