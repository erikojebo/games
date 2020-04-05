bw.state = {};

// normal, boss, gameover
bw.state.gameState = "normal";
bw.state.score = 0;


bw.state.gameOver = function () {
    bw.state.gameState = "gameover";
    bw.hud.gameOver();
};