var KeyPressedEnum = {
    ARROW_RIGHT: "ArrowRight",
    ARROW_LEFT: "ArrowLeft"
};

KeyPressedEnum.isArrowRight = function(keyPressed) {
    return keyPressed === KeyPressedEnum.ARROW_RIGHT
};

KeyPressedEnum.isArrowLeft = function(keyPressed) {
    return keyPressed === KeyPressedEnum.ARROW_LEFT
};

export { KeyPressedEnum };