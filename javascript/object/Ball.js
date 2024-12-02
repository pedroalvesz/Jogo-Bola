export class Ball {
    static COLOR = "#fff";

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

    move() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    };
}