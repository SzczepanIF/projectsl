var player,
  playerAvatar,
  joystick,
  spacebar,
  enterkey,
  ball,
  building,
  walkUp,
  walkDown,
  walkLeft,
  walkRight,
  dialogBox,
  hintBoxText,
  dialogBoxText,
  fullScreenOverlay,
  fullScreenOverlayText,
  taxi,
  stage1Music,
  tosia,
  tosiaAvatar,
  tosiaUp,
  tosiaDown,
  tosiaLeft,
  tosiaRight,
  playerMovementBlocked,
  tree,
  tree2,
  tree3,
  tree4,
  tree5,
  tree6,
  car,
  pedestrianUp,
  pedestrian2Up,
  pedestrian1,
  pedestrian2;

export default class extends Phaser.State {

  init () {
    // Initialator
  }
  preload () {
    //this.load.image('player', '/images/unic-logo.png');
    this.load.image('background', '/images/tiles/map89x68.png');

    this.load.image('ball', '/images/ball.png');
    this.load.image('car', '/images/car.png');
    this.load.image('player_avatar', '/images/player_avatar.png');
    this.load.image('tosia_avatar', '/images/tosia_avatar.png');
    this.load.image('tree', '/images/tree.png');
    this.load.image('buildingFlats', '/images/building1.png');
    this.load.audio('moonlight', '/music/moonlight.mp3');

    this.load.spritesheet('player', '/images/player_up.png', 32, 32, 4);
    this.load.spritesheet('tosia', '/images/tosia.png', 32, 32, 4);
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this._initializePlayer();
    this._initializeObjects();
    this.initialConversation = 0;
    this._conversations();
    this.tosiaWalkAway = false;
    this.pedestrianWalking = false;
    playerMovementBlocked = false;
    this._showFullScreenOverlay('"Each relationship nortures a strength or weakness within you" \n\n Mike Murdock', false);
    setTimeout(() => {
      this._hideFullScreenOverlay();
      stage1Music = this.add.audio('moonlight');
      stage1Music.loop = true;
      stage1Music.play();
        setTimeout(() => {
          this._showFullScreenOverlay('Prologue', false);

          setTimeout(() => {
            this._hideFullScreenOverlay();
            this._loadMap();
            this._initBuildings();
            this._initTrees();
            this._initializeObjects();
            this._initializeDialogBox();
            this._initializeHint();
            this._initializePlayer();
            this.pedestrianWalking = true;
            ball.alpha = 1;
            player.alpha = 1;
            taxi.alpha = 1;
            tosia.alpha = 1;
            pedestrian1.alpha = 1;
            pedestrian2.alpha = 1;
            this._showHint('June, 2017');
          }, 5000);
        }, 1000);
    }, 5000);
  }

  update () {

    player.body.velocity.set(0);

    if (this.tosiaWalkAway) {
      tosia.body.velocity.x = -200;
      tosia.angle = 270;
      tosia.animations.play('walk_up', 15, true);
      if (tosia.position.x < -50) {
        this.tosiaWalkAway = false;
      }
    }

    if (this.pedestrianWalking) {
      pedestrian1.body.velocity.x = 100;
      pedestrian1.angle = 90;
      pedestrian2.body.velocity.x = -100;
      pedestrian2.angle = 270;

      pedestrian1.animations.play('walk_up', 15, true);
      pedestrian2.animations.play('walk_up', 15, true);
      if (pedestrian1.position.x > 6000) {
        pedestrian1.position.x = -50;
      }

      if (pedestrian2.position.x > 6000) {
        pedestrian2.position.x = -50;
      }
    }

    if (ball.body.velocity.x > 0) {
      ball.body.velocity.x--;
    }

    if (ball.body.velocity.y > 0) {
      ball.body.velocity.y--;
    }

    if (joystick.left.isDown && !playerMovementBlocked) {
      player.body.velocity.x = -200;
      player.angle = 270;
      player.animations.play('walk_up', 15, true);

    }
    if (joystick.right.isDown && !playerMovementBlocked) {
      player.body.velocity.x = 200;
      player.angle = 90;
      player.animations.play('walk_up', 15, true);
    }
    if (joystick.up.isDown && !playerMovementBlocked) {
      player.body.velocity.y = -200;
      player.angle = 0;
      player.animations.play('walk_up', 15, true);

    }
     if (joystick.down.isDown && !playerMovementBlocked) {
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
    if (enterkey.isDown) {
      if (dialogBox.visible) {
        this._hideDialog();
        this.initialConversation++;
        if (this.initialConversation === 4) {
          this._characterWalkAway();
        }
        if (this.conversations[this.initialConversation] !== undefined) {
          setTimeout(() => {
            this._showDialog(this.conversations[this.initialConversation].text, this.conversations[this.initialConversation].avatar);
          }, 100);
        }
      } else {
        if (this.physics.arcade.overlap(player, taxi) || this.physics.arcade.collide(player, taxi)) {
          setTimeout(() => {
            this._showDialog('Dude, what do yo want from me? Need a ride or I\'d suggest you to get of the way.');
          }, 50);
        }
      }
    }

    this.physics.arcade.collide(player, taxi);

    this.physics.arcade.collide(player, ball);

    this.physics.arcade.collide(taxi, ball);

    this.physics.arcade.collide(tosia, taxi);

    this.physics.arcade.collide(player, tosia);

    this.physics.arcade.collide(player, building);

    this.physics.arcade.collide(player, tree);

    this.physics.arcade.collide(player, tree2);

    this.physics.arcade.collide(player, tree3);

    this.physics.arcade.collide(player, tree4);

    this.physics.arcade.collide(player, tree5);

    this.physics.arcade.collide(player, tree6);
  }

  render () {

  }

  _initializePlayer() {
    player = this.add.sprite(500, 480, 'player');
    player.anchor.setTo(0.5, 0.5);
    this.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collidWorldBounds = true;
    walkUp = player.animations.add('walk_up');

    joystick = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    enterkey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    player.alpha = 0;
    player.angle = 180;

  }

  _setCameraOnPlayer() {
    this.camera.follow(player);
  }

  _initializeObjects() {

    ball = this.add.sprite(205, 200, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    this.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.enableBody = true;
    ball.body.moves = true;
    ball.body.drag.x = 5;
    ball.body.drag.y = 5;
    ball.body.velocity.set(0);
    ball.body.immovable = false;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.5, 0.5);
    ball.alpha = 0;

    taxi = this.add.sprite(650, 500, 'car');
    this.physics.enable(taxi, Phaser.Physics.ARCADE);
    taxi.enableBody = true;
    taxi.body.moves = true;
    taxi.body.collideWorldBounds = true;
    taxi.body.velocity.set(0);
    taxi.body.drag.x = 10;
    taxi.body.drag.y = 180;
    taxi.anchor.setTo(0.5, 0.5);
    taxi.alpha = 0;

    tosia = this.add.sprite(500, 500, 'tosia');
    tosia.anchor.setTo(0.5, 0.5);
    this.physics.enable(tosia, Phaser.Physics.ARCADE);
    tosia.enableBody = true;
    tosia.body.moves = true;
    tosiaUp = tosia.animations.add('walk_up');
    tosia.alpha = 0;

    pedestrian1 = this.add.sprite(10, 400, 'player');
    pedestrian1.anchor.setTo(0.5, 0.5);
    this.physics.enable(pedestrian1, Phaser.Physics.ARCADE);
    pedestrian1.enableBody = true;
    pedestrian1.body.moves = true;
    pedestrianUp = pedestrian1.animations.add('walk_up');
    pedestrian1.alpha = 0;

    pedestrian2 = this.add.sprite(3500, 400, 'player');
    pedestrian2.anchor.setTo(0.5, 0.5);
    this.physics.enable(pedestrian2, Phaser.Physics.ARCADE);
    pedestrian2.enableBody = true;
    pedestrian1.body.moves = true;
    pedestrian2Up = pedestrian2.animations.add('walk_up');
    pedestrian2.alpha = 0;
  }

  _initBuildings() {
    building = this.add.sprite(0, 10, 'buildingFlats');
    building.anchor.setTo(0, 0);
    this.physics.enable(building);
    building.enableBody = true;
    building.body.velocity.set(1);
    building.body.moves = false;
    building.body.collideWorldBounds = true;

  }

  _initTrees() {
    tree = this.add.sprite(650, 45, 'tree');
    tree.anchor.setTo(0, 0);
    this.physics.enable(tree);
    tree.enableBody = true;
    tree.body.velocity.set(1);
    tree.body.moves = false;

    tree2 = this.add.sprite(900, 45, 'tree');
    tree2.anchor.setTo(0, 0);
    this.physics.enable(tree2);
    tree2.enableBody = true;
    tree2.body.velocity.set(1);
    tree2.body.moves = false;

    tree3 = this.add.sprite(1150, 45, 'tree');
    tree3.anchor.setTo(0, 0);
    this.physics.enable(tree3);
    tree3.enableBody = true;
    tree3.body.velocity.set(1);
    tree3.body.moves = false;

    tree4 = this.add.sprite(1400, 45, 'tree');
    tree4.anchor.setTo(0, 0);
    this.physics.enable(tree4);
    tree4.enableBody = true;
    tree4.body.velocity.set(1);
    tree4.body.moves = false;

    tree5 = this.add.sprite(1650, 45, 'tree');
    tree5.anchor.setTo(0, 0);
    this.physics.enable(tree5);
    tree5.enableBody = true;
    tree5.body.velocity.set(1);
    tree5.body.moves = false;

    tree6 = this.add.sprite(1900, 45, 'tree');
    tree6.anchor.setTo(0, 0);
    this.physics.enable(tree6);
    tree6.enableBody = true;
    tree6.body.velocity.set(1);
    tree6.body.moves = false;
  }

  _conversations() {

    this.conversations = [{
      text: 'You didn\'t have to do it, Marc. You\'re picking wrong assumptions, again.',
      avatar: 'tosia'
    }, {
      text: 'Doing what? What did I do wrong this time?',
      avatar: 'player'
    }, {
      text: 'Nevermind. We should not meet again for some time. I think this would be better to both of us.',
      avatar: 'tosia'
    }, {
      text: 'Bye, Marc.',
      avatar: 'tosia'
    }];

  }

  _characterWalkAway() {
    this.tosiaWalkAway = true;
  }

  _loadMap() {
    this.add.tileSprite(0,0, 2848, 2176, 'background');
    this.world.setBounds(0,0, 2848, 2176);

    this.camera.x = 800;
    this.camera.y = 90;

    for (let i = 0; i <= 800; i++) {
      setTimeout(() => {
        this.camera.x -= 1;
        if (i === 800) {
          this.camera.follow(player);
          this._hideHint();
          this._showDialog('You didn\'t have to do it, Martin. You\'re picking wrong assumptions, again.', 'tosia');
        }
      }, i * 10);
    }
  }

  _initializeDialogBox() {
    dialogBox = this.add.graphics(0, 0);
    dialogBox.beginFill('0x498c31', 1);
    dialogBox.drawRect(12, 568, 1000, 180);
    dialogBox.fixedToCamera = true;
    dialogBox.visible = false;
    dialogBox.alpha = 0;
  }

  _showDialog(text, avatar = null) {
    if (dialogBoxText !== undefined) {
      dialogBoxText.destroy();
    }

    if (avatar !== null) {
      dialogBoxText = this.add.text(100, 590, text, {font: '16px archivo_blackregular', fill: '#ffffff', wordWrap: true, wordWrapWidth: 900});
      if (avatar === 'player') {
        playerAvatar = this.add.sprite(30, 670, 'player_avatar');
      }

      if (avatar === 'tosia') {
        playerAvatar = this.add.sprite(30, 670, 'tosia_avatar');
      }

    } else {
      dialogBoxText = this.add.text(50, 590, text, {font: '16px archivo_blackregular', fill: '#ffffff', wordWrap: true, wordWrapWidth: 900});
    }
    dialogBoxText.alpha = 0;
    dialogBoxText.fixedToCamera = true;

    dialogBox.visible = true;
    this.add.tween(dialogBox).to( { alpha: 0.7 }, 200, Phaser.Easing.Linear.None, true);
    this.add.tween(dialogBoxText).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
  }

  _hideDialog() {
    if (playerAvatar) {
      playerAvatar.destroy();
    }
    dialogBoxText.destroy();
    dialogBox.visible = false;
    dialogBox.alpha = 0;
  }

  _showHint(text) {
    if (hintBoxText !== undefined) {
      hintBoxText.destroy();
    }
    hintBoxText  = this.add.text(50, 690, text, {font: '32px archivo_blackregular', align: 'right', fill: '#ffffff', wordWrap: true, wordWrapWidth: 900});
    hintBoxText.alpha = 0;
    hintBoxText.fixedToCamera = true;
    this.add.tween(hintBoxText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

  }

  _initializeHint() {
    console.log('init');
  }

  _hideHint(text) {
    hintBoxText.destroy();
  }

  _showFullScreenOverlay(text, animateBackground = true) {
    fullScreenOverlay = this.add.graphics(0, 0);
    fullScreenOverlay.beginFill('0x000000', 1);
    fullScreenOverlay.drawRect(0, 0, this.scale.width, this.scale.height);
    fullScreenOverlay.fixedToCamera = true;
    fullScreenOverlay.visible = true;
    fullScreenOverlay.alpha = 0;

    fullScreenOverlayText = this.add.text(0, 0, text, {font: '52px archivo_blackregular', fill: '#dddddd', align: 'center', wordWrap: true, wordWrapWidth: this.scale.width, boundsAlignH: 'center', boundsAlignV: 'middle'});
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
