export class AudioController {
    static background = new Audio("../audio/background.mp3");
    static success = new Audio("../audio/success.mp3");
    static platformHit = new Audio("../audio/platformhit.mp3");
    static gameOver = new Audio("../audio/game-over-arcade.mp3");
    static blockBreak = new Audio("../audio/blockbreak.mp3");

    static playBackground() {
        this.background.play();
        this.background.loop = true;
    }

    static stopBackground() {
        this.background.pause();
    }

    static playSuccess() {
        this.success.play();
    }

    static playPlatformHit() {
        this.platformHit.play();
    }

    static playGameOver() {
        this.gameOver.play();
    }

    static playBlockBreak() {
        this.blockBreak.play();
    }
}