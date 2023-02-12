const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 180;

const game = new GameOfLifeTS(canvas);
game.setup();

window.onload = () => {
    let isRunning = false;
    document.querySelector("#start").addEventListener("click", (e) => {
        isRunning = true;
    });

    document.querySelector("#pause").addEventListener("click", () => {
        isRunning = false;
    });

    document.querySelector("#reset").addEventListener("click", () => {
        isRunning = false;
        game.randomize();
    });

    const gameLoop = () => {
        if(isRunning) game.run();
        game.paint();
        window.requestAnimationFrame(gameLoop);
    };
    window.requestAnimationFrame(gameLoop);
};
