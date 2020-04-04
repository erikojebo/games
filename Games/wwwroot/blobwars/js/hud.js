bw.hud = {};

bw.hud.gameMenu = {};
bw.hud.scoreBoard = {};

bw.hud.gameMenu.init = function (game) {
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

    bw.hud.gameMenu.stop = function () {
        game.scene.physics.pause();
    };
};

bw.hud.scoreBoard.init = function (scene) {
    bw.hud.scoreBoard.text = scene.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#FFF'});
    bw.hud.scoreBoard.score = 0;
};

bw.hud.scoreBoard.setText = function (text) {
    bw.hud.scoreBoard.text.setText(text);
};

bw.hud.scoreBoard.addScore = function (score) {
    bw.hud.scoreBoard.score += 10;
    bw.hud.scoreBoard.setText('Score: ' + bw.hud.scoreBoard.score);
};

bw.hud.init = function (game, scene) {
    bw.hud.gameMenu.init(game);
    bw.hud.scoreBoard.init(scene);
};

bw.hud.gameOver = function () {
    bw.hud.scoreBoard.setText("GAME OVER! :'(     Score: " + score);
    bw.hud.gameMenu.stop();
};