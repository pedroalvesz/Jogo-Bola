export class Block {
    isVisible = true;

    constructor(positionX, positionY, width, height) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        if (!this.isVisible) return;

        ctx.fillStyle = "#0095DD";
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);

        ctx.strokeStyle = "#003366";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.positionX, this.positionY, this.width, this.height);
    }
}