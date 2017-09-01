var player,
  joystick,
  spacebar,
  ball,
  building,
  walkUp,
  walkDown,
  walkLeft,
  walkRight,
  dialogBox,
  dialogBoxText,
  fullScreenOverlay,
  fullScreenOverlayText;

export default class extends Phaser.State {

  init () {
    // Initialator
  }
  preload () {
    //this.load.image('player', '/images/unic-logo.png');
    this.load.image('nk', '/images/nk.png');
    this.load.image('benq', '/images/benq.png');
    this.load.image('avaus', '/images/avaus.jpg');
    this.load.image('mediaamba', '/images/mediaamba.png');
    this.load.image('nsn', '/images/nsn.jpg');
    this.load.image('tigerspike', '/images/tigerspike.png');
    this.load.image('background', '/images/tiles/map89x68.png');

    this.load.image('building', '/images/intensememories1.png');
    this.load.image('ball', '/images/ball.png');

    this.load.spritesheet('player', '/images/player_up.png', 32, 32, 4);
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this._initializePlayer();
    this._initializeStudents();
    this._showFullScreenOverlay('"Each relationship nortures a strength or weakness within you" \n\n Mike Murdock', false);
    setTimeout(() => {
      this._hideFullScreenOverlay();
        setTimeout(() => {
          this._showFullScreenOverlay('Prologue', false);

          setTimeout(() => {
            this._hideFullScreenOverlay();
            this._loadMap();
            this._initBuildings();
            this._initializePlayer();
            this._initializeStudents();
            this._initializeDialogBox();
          }, 5000);
        }, 1000);
    }, 5000);
  }

  update () {

    player.body.velocity.set(0);

    if (ball.body.velocity.x > 0) {
      ball.body.velocity.x--;
    }

    if (ball.body.velocity.y > 0) {
      ball.body.velocity.y--;
    }

    if (joystick.left.isDown) {
      player.body.velocity.x = -200;
      player.angle = 270;
      player.animations.play('walk_up', 15, true);

    }
    if (joystick.right.isDown) {
      player.body.velocity.x = 200;
      player.angle = 90;
      player.animations.play('walk_up', 15, true);
    }
     if (joystick.up.isDown) {
      player.body.velocity.y = -200;
      player.angle = 0;
      player.animations.play('walk_up', 15, true);

    }
     if (joystick.down.isDown) {
      player.body.velocity.y = 200;
      player.angle = 180;
      player.animations.play('walk_up', 15, true);
    }

    if (!joystick.left.isDown && !joystick.right.isDown && !joystick.up.isDown && !joystick.down.isDown) {
      player.animations.stop(null, true);
    }

    if (spacebar.isDown) {
      if (this.physics.arcade.overlap(player, ball)) {
        switch (player.angle) {
          case 0:
            this.physics.arcade.moveToXY(ball, ball.x, ball.y - 400, 1000);
            break;
          case 90:
            this.physics.arcade.moveToXY(ball, ball.x + 400, ball.y, 1000);
            break;
          case -180:
            this.physics.arcade.moveToXY(ball, ball.x, ball.y + 400, 1000);
            break;
          case -90:
            this.physics.arcade.moveToXY(ball, ball.x - 400, ball.y, 1000);
            break;
        }
      }
    }

  //  this.physics.arcade.moveToObject(nk, player, 100);
//    this.physics.arcade.moveToObject(benq, player, 200);
//    this.physics.arcade.moveToObject(avaus, player, 150);
//  //  this.physics.arcade.moveToObject(mediaamba, player, 90);
//    this.physics.arcade.moveToObject(nsn, player, 130);
//    this.physics.arcade.moveToObject(tigerspike, player, 250);

    this.physics.arcade.collide(player, building);

    this.physics.arcade.collide (player, ball);

  }

  render () {

  }

  _initializePlayer() {
    player = this.add.sprite(200, 200, 'player');
    player.anchor.setTo(0.5, 0.5);
    this.physics.enable(player, Phaser.Physics.ARCADE);
    this.camera.follow(player);
    player.body.collidWorldBounds = true;
    walkUp = player.animations.add('walk_up');

    joystick = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  }

  _initializeStudents() {
  /*  nk = this.add.sprite(100, 100, 'nk');
    nk.anchor.setTo(0.5, 0.5);
    this.physics.enable(nk);
    nk.enableBody = true;
    nk.body.velocity.set(5);

    benq = this.add.sprite(400, 400, 'benq');
    benq.anchor.setTo(0.5, 0.5);
    this.physics.enable(benq);
    benq.enableBody = true;
    benq.body.velocity.set(5);

    avaus = this.add.sprite(150,150, 'avaus');
    avaus.anchor.setTo(0.5, 0.5);
    this.physics.enable(avaus);
    avaus.enableBody = true;
    avaus.body.velocity.set(5);

    mediaamba = this.add.sprite(150,150, 'mediaamba');
    mediaamba.anchor.setTo(0.5, 0.5);
    this.physics.enable(mediaamba);
    mediaamba.enableBody = true;
    mediaamba.body.velocity.set(5);

    nsn = this.add.sprite(500,500, 'nsn');
    nsn.anchor.setTo(0.5, 0.5);
    this.physics.enable(nsn);
    nsn.enableBody = true;
    nsn.body.velocity.set(5);

    tigerspike = this.add.sprite(100,600, 'tigerspike');
    tigerspike.anchor.setTo(0.5, 0.5);
    this.physics.enable(tigerspike);
    tigerspike.enableBody = true;
    tigerspike.body.velocity.set(5);*/

    ball = this.add.sprite(205, 200, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    this.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.enableBody = true;
    ball.body.moves = true;
    ball.body.velocity.set(0);
    ball.body.immovable = false;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.5, 0.5);
  }

  _initBuildings() {
    building = this.add.sprite(700, -75, 'building');
    building.anchor.setTo(0.5, 0.5);
    this.physics.enable(building);
    building.enableBody = true;
    building.body.velocity.set(1);
    building.body.moves = false;
    building.body.collideWorldBounds = true;

  }

  _loadMap() {
    this.add.tileSprite(0,0, 2848, 2176, 'background');
    this.world.setBounds(0,0, 2848, 2176);
  }

  _initializeDialogBox() {
    dialogBox = this.add.graphics(0, 0);
    dialogBox.beginFill('0x333333', 1);
    dialogBox.drawRect(12, 568, 1000, 180);
    dialogBox.fixedToCamera = true;
    dialogBox.visible = false;
    dialogBox.alpha = 0;
  }

  _showDialog(text) {
    if (dialogBoxText !== undefined) {
      dialogBoxText.destroy();
    }
    dialogBoxText = this.add.text(50, 590, text, {font: '16px Arial', fill: '#ffffff', wordWrap: true, wordWrapWidth: 900});
    dialogBoxText.alpha = 0;
    dialogBoxText.fixedToCamera = true;

    dialogBox.visible = true;
    this.add.tween(dialogBox).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
    this.add.tween(dialogBoxText).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
  }

  _hideDialog() {
    dialogBoxText.destroy();
    dialogBox.visible = false;
    dialogBox.alpha = 0;
  }

  _showFullScreenOverlay(text, animateBackground = true) {
    fullScreenOverlay = this.add.graphics(0, 0);
    fullScreenOverlay.beginFill('0x000000', 1);
    fullScreenOverlay.drawRect(0, 0, this.scale.width, this.scale.height);
    fullScreenOverlay.fixedToCamera = true;
    fullScreenOverlay.visible = true;
    fullScreenOverlay.alpha = 0;

    fullScreenOverlayText = this.add.text(0, 0, text, {font: '60px Arial', fill: '#ffffff', align: 'center', wordWrap: true, wordWrapWidth: this.scale.width, boundsAlignH: 'center', boundsAlignV: 'middle'});
    fullScreenOverlayText.setTextBounds(0, 0, this.scale.width, this.scale.height);
    fullScreenOverlayText.fixedToCamera = true;
    fullScreenOverlayText.visible = true;
    fullScreenOverlayText.alpha = 0;

    if (animateBackground) {
      fullScreenOverlay.alpha = 0;
      this.add.tween(fullScreenOverlay).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
    } else {
      fullScreenOverlay.alpha = 1;
    }

    this.add.tween(fullScreenOverlayText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
  }

  _hideFullScreenOverlay() {
    this.add.tween(fullScreenOverlayText).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    this.add.tween(fullScreenOverlay).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

    setTimeout(() => {
      fullScreenOverlay.destroy();
    }, 2000);
  }
}
