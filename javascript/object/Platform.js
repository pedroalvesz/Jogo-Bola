import { KeyPressedEnum } from "../enum/KeyPressedEnum.js";

export class Platform {
    static COLOR = "#fff";
    static MOVE_VALUE = 5;

    constructor(canvas, height, width) {
        this.canvas = canvas;
        this.height = height;
        this.width = width;
        this.positionX = canvas.width - width / 2;
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.positionX, this.canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = Platform.COLOR;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        const shouldMoveRight = KeyPressedEnum.isArrowRight(this.keyPressed) && this.positionX < this.canvas.width - this.width;
        if (shouldMoveRight) {
            this.positionX += Platform.MOVE_VALUE;
            return;
        };
        
        const shouldMoveLeft = KeyPressedEnum.isArrowLeft(this.keyPressed) && this.positionX > 0
        if (shouldMoveLeft) {
            this.positionX -= Platform.MOVE_VALUE;
            return;
        };
    }

    handleKeyPress(keyPressed) {
        if (KeyPressedEnum.isArrowRight(keyPressed)) {
            this.keyPressed = KeyPressedEnum.ARROW_RIGHT;
            return;
        };
        
        if (KeyPressedEnum.isArrowLeft(keyPressed)) {
            this.keyPressed = KeyPressedEnum.ARROW_LEFT;
            return;
        };
    }

    handleKeyUnpress(keyPressed) {
        if (!KeyPressedEnum.isArrowLeft(keyPressed) && !KeyPressedEnum.isArrowRight(keyPressed)) return;
    
        this.keyPressed = null;
    };
}