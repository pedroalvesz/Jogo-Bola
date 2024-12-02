const startButton = document.createElement("button");
startButton.id = "start-button";
startButton.innerText = "START";
startButton.style.position = "absolute";
startButton.style.left = "50%";
startButton.style.top = "50%";
startButton.style.transform = "translate(-50%, -50%)";
startButton.style.fontFamily = "Press Start 2P, cursive";
startButton.style.fontSize = "36px";
startButton.style.padding = "20px 40px";
startButton.style.border = "2px solid #fff";
startButton.style.backgroundColor = "#0095DD";
startButton.style.color = "#fff";
startButton.style.textAlign = "center";
startButton.style.cursor = "pointer";

export { startButton };
