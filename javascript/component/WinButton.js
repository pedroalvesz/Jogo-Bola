const winButton = document.createElement("button");
winButton.id = "win-button";
winButton.innerText = "Você Ganhou!";
winButton.style.position = "absolute";
winButton.style.left = "50%";
winButton.style.top = "50%";
winButton.style.transform = "translate(-50%, -50%)";
winButton.style.fontFamily = "Press Start 2P, cursive";
winButton.style.fontSize = "36px";
winButton.style.padding = "20px 40px";
winButton.style.border = "2px solid #fff";
winButton.style.backgroundColor = "#4CAF50";
winButton.style.color = "#fff";
winButton.style.textAlign = "center";
winButton.style.cursor = "pointer";
winButton.style.display = "none";

export { winButton };