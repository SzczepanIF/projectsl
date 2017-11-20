import strings from '../config/Constants';
 var gear;

export default class extends Phaser.State {
  init () {}
  preload () {

    this.load.audio('timetorun', '/music/timetorun.mp3');
    this.load.image('gear', '/images/gear.gif');
  }

  create () {
    this.gearAnimationEnabled = false;
    this._loadSplashScreen();
  }

  render () {

  }

  update () {

  }

  _loadSplashScreen() {

    let copyrightText = this.add.text(this.world.centerX, 350, 'Marcin Szczepanczyk');

    copyrightText.font = "berkshire_swashregular";
    copyrightText.fontSize = 50;
    copyrightText.fill = '#fff';
    copyrightText.anchor.setTo(0.5);
    copyrightText.setShadow(0, 5, 'rgba(255,255,255,0.5)', 10);
    copyrightText.alpha = 0;


    let copyrightTextSummary = this.add.text(this.world.centerX, 450, 'Production');

    copyrightTextSummary.font = "archivo_blackregular";
    copyrightTextSummary.fontSize = 50;
    copyrightTextSummary.fill = '#fff';
    copyrightTextSummary.anchor.setTo(0.5);
    copyrightTextSummary.setShadow(0, 5, 'rgba(255,255,255,0.5)', 10);
    copyrightTextSummary.alpha = 0;

    gear = this.add.sprite(this.world.centerX, 240, 'gear');
    gear.anchor.setTo(0.5);
    gear.scale.setTo(0.3, 0.3);
    gear.alpha = 0;

    this._startGearAnimation();



    this.add.tween(copyrightText).to( { alpha: 0.8}, 1000, Phaser.Easing.Linear.None, true);
    this.add.tween(copyrightTextSummary).to( { alpha: 0.8 }, 1000, Phaser.Easing.Linear.None, true);
    this.add.tween(gear).to({ alpha: 0.5}, 1000, Phaser.Easing.Linear.None, true)

    setTimeout(() => {
      this.add.tween(copyrightText).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
      this.add.tween(copyrightTextSummary).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      this.add.tween(gear).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    }, 4500);

    setTimeout(() => {
      this.gearAnimationEnabled = false;
      this.state.start('MainMenu');
    }, 6000);


  }

  _startGearAnimation() {
    this.gearAnimationEnabled = true;

    this.physics.enable(gear, Phaser.Physics.ARCADE);
    gear.body.collidWorldBounds = true;

    for (let i = 0; i < 6000; i++) {
      setTimeout(() => {
        gear.angle = gear.angle + 1;
      }, i * 10);

    }
  }

  _startNewGame() {

  }
}
