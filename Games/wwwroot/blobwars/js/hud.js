bw.hud = {};

bw.hud.gameMenu = {};
bw.hud.scoreBoard = {};

bw.hud.gameMenu.init = function (game, scene) {
    let playPauseButton = document.getElementById("play-pause-button");

    playPauseButton.addEventListener("click", function () {
        var isPaused = game.scene.isPaused("default");

        if (isPaused) {
            game.scene.resume("default");
            playPauseButton.innerText = "Pausa";
        } else {
            game.scene.pause("default");
            playPauseButton.innerText = "Fortsätt";
        }
    });

    let restartButton = document.getElementById("restart-button");

    restartButton.addEventListener("click", function () {
        game.scene.stop("default");
        game.scene.start("default");
    });
};

bw.hud.scoreBoard.init = function (scene) {
    bw.hud.scoreBoard.scoreText = scene.add.text(16, 16, '', {fontSize: '32px', fill: '#FFF'});
    bw.hud.scoreBoard.gameOverText = scene.add.text(350, 300, '', {fontSize: '90px', fill: '#FFF'});

    bw.state.score = 0;
    bw.hud.scoreBoard.updateScore(0);
};

bw.hud.scoreBoard.setText = function (text) {
    bw.hud.scoreBoard.scoreText.setText(text);
};

bw.hud.scoreBoard.addScore = function (score) {
    bw.state.score += score;
    bw.hud.scoreBoard.updateScore();
};

bw.hud.scoreBoard.updateScore = function () {
    bw.hud.scoreBoard.setText('Score: ' + bw.state.score);
};

bw.hud.init = function (game, scene) {
    bw.hud.gameMenu.init(game, scene);
    bw.hud.scoreBoard.init(scene);
};

bw.hud.gameOver = function () {
    bw.hud.scoreBoard.gameOverText.setText("GAME OVER!");
};