var player,
  joystick,
  nk,
  benq,
  avaus,
  mediaamba,
  nsn,
  tigerspike

export default class extends Phaser.State {

  init () {
    // Initialator
  }
  preload () {
    this.load.image('player', '/images/unic-logo.png');
    this.load.image('nk', '/images/nk.png');
    this.load.image('benq', '/images/benq.png');
    this.load.image('avaus', '/images/avaus.jpg');
    this.load.image('mediaamba', '/images/mediaamba.png');
    this.load.image('nsn', '/images/nsn.jpg');
    this.load.image('tigerspike', '/images/tigerspike.png');
    this.load.image('background', '/images/map150x100.png');
  }

  create () {
    this._loadMap();
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this._initializePlayer();
    this._initializeStudents();
  }

  update () {
    player.body.velocity.set(0);

    if (joystick.left.isDown) {
      player.body.velocity.x = -300;
    }

    if (joystick.right.isDown) {
      player.body.velocity.x = 300;
    }

    if (joystick.up.isDown) {
      player.body.velocity.y = -300;
    }

    if (joystick.down.isDown) {
      player.body.velocity.y = 300;
    }

    this.physics.arcade.moveToObject(nk, player, 100);
    this.physics.arcade.moveToObject(benq, player, 200);
    this.physics.arcade.moveToObject(avaus, player, 150);
    this.physics.arcade.moveToObject(mediaamba, player, 90);
    this.physics.arcade.moveToObject(nsn, player, 130);
    this.physics.arcade.moveToObject(tigerspike, player, 250);
  }

  render () {

  }

  _initializePlayer() {
    player = this.add.sprite(200, 200, 'player');
    player.anchor.setTo(0.5, 0.5);
    this.physics.enable(player);
    this.camera.follow(player);

    joystick = this.input.keyboard.createCursorKeys();

  }

  _initializeStudents() {
    nk = this.add.sprite(100, 100, 'nk');
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
    tigerspike.body.velocity.set(5);
  }

  _loadMap() {
    this.add.tileSprite(0,0, 4800, 3200, 'background');
    this.world.setBounds(0,0, 4800, 3200);
  }
}
