export class CollisionDetector {

    static checkBallAndWallCollision(ball, canvas, callback) {
        const collidedWithLeftOrRightWall = ball.positionX + ball.speedX > canvas.width - ball.radius || ball.positionX + ball.speedX < ball.radius;
        if (!collidedWithLeftOrRightWall) return;

        callback();
    };

    static checkBallAndTopCollision(ball, canvas, callback) {
        const collidedWithTop = ball.positionY + ball.speedY < ball.radius;
        if (!collidedWithTop) return;

        callback();
    };

    static checkBallAndFloorCollision(ball, canvas, platform, callback) {
        if (!this.#isBallCollidingWithFloor(ball, canvas) || this.#isBallCollidingWithPlatform(ball, platform)) return;

        callback();
    };

    static checkBallAndPlatformCollision(ball, platform, canvas, callback) {
        if (!this.#isBallCollidingWithFloor(ball, canvas)) return;
        if (!this.#isBallCollidingWithPlatform(ball, platform)) return;

        callback();
    };

    static checkBallAndBlocksCollision(ball, blocks, callback) {
        blocks.forEach(block => {
            if (!block.isVisible) return

            if (ball.positionX + ball.radius > block.positionX &&
                ball.positionX - ball.radius < block.positionX + block.width &&
                ball.positionY + ball.radius > block.positionY &&
                ball.positionY - ball.radius < block.positionY + block.height) {
                callback(ball, block);
            }
        })
    }

    static #isBallCollidingWithPlatform(ball, platform) {
        return ball.positionX > platform.positionX && ball.positionX < platform.positionX + platform.width;
    };

    static #isBallCollidingWithFloor(ball, canvas) {
        return ball.positionY + ball.speedY > canvas.height - ball.radius
    }
}