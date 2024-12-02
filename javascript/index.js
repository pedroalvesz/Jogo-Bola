import { BlockBreakerGame } from "./BlockBreakerGame.js";
import { startButton } from "./component/StartButton.js";

const canvas = document.getElementById("canvas");
const game = new BlockBreakerGame(canvas);

startButton.addEventListener("click", () => {
    game.start();
    startButton.style.display = "none"
});

document.body.appendChild(startButton);

