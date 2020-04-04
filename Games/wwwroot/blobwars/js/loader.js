bw.loader = {};

bw.loader.preload = function () {
        this.load.audio('laser_sound', [ 'assets/sounds/8-bit-laser.mp3' ]);
        this.load.audio('explosion_sound', [ 'assets/sounds/explosion2.wav' ]);

        this.load.image('fairy', 'assets/fairy1_300.png');
        this.load.image('bullet', 'assets/laser1.png');
        this.load.image('alien', 'assets/alien1.png');
        this.load.image('alien2', 'assets/alien2_300.png');
        this.load.image('apocalypse', 'assets/apocalypse_large.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('space_background', 'assets/space_background2.png');
        this.load.image('ship1', 'assets/ship1_300.png');

        this.load.spritesheet('explosion_sheet', 'assets/explosion_sheet_large.png', { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet('alien2_shield_sheet', 'assets/alien2_med_sköld_large_2.png', { frameWidth: 40, frameHeight: 40 });

        //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
};