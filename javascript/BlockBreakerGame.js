import { Ball } from "./object/Ball.js";
import { Platform } from "./object/Platform.js";
import { Block } from "./object/Block.js";
import { CollisionDetector } from "./CollisionDetector.js";
import { winButton } from "./component/WinButton.js";
import { AudioManager } from "./AudioManager.js";

export class BlockBreakerGame {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.ball = this.initBall();
        this.platform = this.initPlatform();
        this.blocks = [];

        this.isRunning = false;

        this.blockCounter = document.getElementById("counter");
        this.blockCounterValue = 0;

        this.audioManager = this.initAudioManager()
    }

    start() {
        this.buildBlocks();
        this.updateBlockCounter(this.blocks.length);

        this.bindKeys();

        this.audioManager.play("background");
        this.audioManager.setVolume(0.8);
        this.audioManager.setLoop("background", true);

        this.isRunning = true;
        this.loop();
    }

    loop() {
        if (!this.isRunning) return;

        this.reset();
        this.ball.draw(this.ctx);
        this.platform.draw(this.ctx);

        CollisionDetector.checkBallAndWallCollision(this.ball, this.canvas, () => this.onBallCollideWithWall(this.ball));
        CollisionDetector.checkBallAndTopCollision(this.ball, this.canvas, () => this.onBallCollideWithTop(this.ball));
        CollisionDetector.checkBallAndPlatformCollision(this.ball, this.platform, this.canvas, () => this.onBallCollideWithPlatform(this.ball));
        CollisionDetector.checkBallAndFloorCollision(this.ball, this.canvas, this.platform, this.onBallCollideWithFloor.bind(this));

        this.platform.move();
        this.ball.move();

        this.drawBlocks();
        CollisionDetector.checkBallAndBlocksCollision(this.ball, this.blocks, this.onBallCollideWithBlock.bind(this));
        requestAnimationFrame(() => this.loop());
    }

    initBall() {
        const ballRadius = 10;
        const ballX = this.canvas.width / 2;
        const ballY = this.canvas.height - 30;
        const ballSpeedX = 2;
        const ballSpeedY = -2;

        return new Ball(this.canvas, ballRadius, ballX, ballY, ballSpeedX, ballSpeedY);
    }

    initPlatform() {
        const platformHeight = 10;
        const platformWidth = 100;

        return new Platform(this.canvas, platformHeight, platformWidth);
    }

    buildBlocks() {
        const rows = 5;
        const cols = 5;
        const paddingTop = 50;
        const paddingHorizontal = 100;

        const blockWidth = (this.canvas.width - paddingHorizontal * 2) / cols;
        const blockHeight = 20;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const positionX = paddingHorizontal + j * blockWidth;
                const positionY = paddingTop + i * blockHeight;

                this.blocks.push(new Block(positionX, positionY, blockWidth, blockHeight));
            }
        }
    };

    updateBlockCounter(count) {
        this.blockCounterValue = count;
        this.blockCounter.textContent = count;
    }

    bindKeys() {
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
        document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    }

    handleKeyDown(e) {
        this.platform.handleKeyPress(e.key);
    }

    handleKeyUp(e) {
        this.platform.handleKeyUnpress(e.key);
    }

    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBlocks() {
        this.blocks.forEach(block => block.draw(this.ctx));
    }

    onBallCollideWithFloor() {
        this.audioManager.stop("background");
        this.audioManager.play("gameOver");

        setTimeout(window.location.href = window.location.href, 4000);
    }

    onBallCollideWithPlatform(ball) {
        this.audioManager.play("platformHit");

        ball.speedY = -ball.speedY;
    }

    onBallCollideWithWall(ball) {
        ball.speedX = -ball.speedX;
    }

    onBallCollideWithTop(ball) {
        ball.speedY = -ball.speedY;
    }

    onBallCollideWithBlock(ball, block) {
        block.isVisible = false;
        ball.speedY *= -1;

        const isAnyBlockVisible = this.blocks.some(block => block.isVisible);
        if (isAnyBlockVisible) {
            this.audioManager.play("blockBreak")
        } else {
            this.onWin();
        }

        this.blockCounterValue--;
        this.updateBlockCounter(this.blockCounterValue);
    }

    onWin() {
        this.audioManager.stop("background")
        this.audioManager.play("success");

        this.isRunning = false;
        this.reset()
        this.showWinButton();
    }

    showWinButton() {
        document.body.appendChild(winButton);
        winButton.style.display = "block";
    }

    initAudioManager() {
        const audioManager = new AudioManager();

        audioManager.addAudio("background", '../audio/background.mp3');
        audioManager.addAudio("success", '../audio/success.mp3');
        audioManager.addAudio("platformHit", '../audio/platformhit.mp3');
        audioManager.addAudio("gameOver", '../audio/game-over-arcade.mp3');
        audioManager.addAudio("blockBreak", '../audio/blockbreak.mp3');

        return audioManager;
    }
}