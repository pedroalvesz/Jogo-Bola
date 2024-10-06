export class Ball {
    static COLOR = "#fff";

    canvas;

    radius;
    positionX;
    positionY;

    speedX;
    speedY;

    constructor(canvas, radius, positionX, positionY, speedX, speedY) {
        this.canvas = canvas;
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speedX = speedX;
        this.speedY = speedY;
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = Ball.COLOR;
        ctx.fill();
        ctx.closePath();
    };

    updatePosition() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        const collidedWithLeftOrRightWall = this.positionX + this.speedX > canvas.width - this.radius || this.positionX + this.speedX < this.radius;
        if (collidedWithLeftOrRightWall) {
            this.speedX = -this.speedX;
        }

        const colliedWithTopOrFloor = this.positionY + this.speedY < this.radius;
        if (colliedWithTopOrFloor) {
            this.speedY = -this.speedY;
        }
    };
}