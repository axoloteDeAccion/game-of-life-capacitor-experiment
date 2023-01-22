const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 180;

const game = new GameOfLifeTS(canvas);
game.gameSetup();

window.onload = () => {
    let isRunning = false;
    document.querySelector("#start-random").addEventListener("click", (e) => {
        e.currentTarget.disabled = true;
        isRunning = true;
        game.gameSetup();
        game.arrayRandomize();
        game.fillArray();
        
        const gameLoop = () => {
            game.runGame();
            if(isRunning) {
                window.requestAnimationFrame(gameLoop);
            }
        };

        window.requestAnimationFrame(gameLoop); 
    });

    document.querySelector("#stop").addEventListener("click", () => {
        document.querySelector("#start-random").disabled = false;
        isRunning = false;
        game.gameSetup();
    });

};
