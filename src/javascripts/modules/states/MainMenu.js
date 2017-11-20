import strings from '../config/Constants';

var cloud1,
  cloud2,
  cloud3,
  cloud4,
  cloud5,
  cloud6,
  cloud7,
  cloud8,
  music,
  gong;

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.image('background', '/images/start_bg.jpg');
    this.load.image('cloud', '/images/cloud.png');

    this.load.audio('timetorun', '/music/timetorun.mp3');
    this.load.audio('gong', '/sounds/gong.mp3');

  }

  create () {
    this._loadMainMenu();
  }

  render () {

  }

  update () {
    cloud1.x++;
    cloud2.x--;
    cloud3.x++;
    cloud4.x--;
    cloud5.x--;
    cloud6.x++;
    cloud7.x--;
    cloud8.x++;

    if (cloud1.x === 1024) {
      cloud1.x =  cloud1.scale.x * -120;
    }

    if (cloud3.x === 1024) {
      cloud3.x =  cloud3.scale.x * -120;
    }

    if (cloud6.x === 1024) {
      cloud6.x = cloud6.scale.x * -120;
    }

    if (cloud8.x === 1024) {
      cloud8.x = cloud8.scale.x * -120;
    }

    if (cloud2.x === cloud2.scale.x * -120) {
      cloud2.x = 1024;
    }

    if (cloud4.x === cloud4.scale.x * -120) {
      cloud4.x = 1024;
    }

    if (cloud5.x === cloud5.scale.x * -120) {
      cloud5.x = 1024;
    }

    if (cloud7.x === cloud7.scale.x * -120) {
      cloud7.x = 1024;
    }
  }

  _loadMainMenu() {

    this._loadBackground();
    this._playSound();

    let banner = this.add.text(320, 80, 'Intense Memories');
      banner.font = 'berkshire_swashregular';
      banner.padding.set(20, 16);
      banner.fontSize = 60;
      banner.fill = '#fff';
      banner.smoothed = true;
      banner.anchor.setTo(0.5);
      banner.setShadow(0, 5, 'rgba(0,0,0,0.5)', 10);

    let newGame = this.add.text(this.world.centerX, 450, strings.menu.newGame)
      newGame.font = "berkshire_swashregular"
      newGame.fontSize = 50
      newGame.fill = '#fff'
      newGame.anchor.setTo(0.5);
      newGame.setShadow(0, 5, 'rgba(255,255,255,0.5)', 10);
      this._menuHoverEffect(newGame);
      newGame.events.onInputDown.add(this._startNewGame, this);
      newGame.input.useHandCursor = true;
      newGame.alpha = 0.8;


    let loadGame = this.add.text(this.world.centerX, 550, strings.menu.loadGame, { font: '50px berkshire_swashregular', fill: '#ffffff'});
      loadGame.anchor.setTo(0.5);
      loadGame.setShadow(0, 5, 'rgba(255,255,255,0.5)', 10);
      this._menuHoverEffect(loadGame);
      loadGame.input.useHandCursor = true;
      loadGame.alpha = 0.8;

    this._renderCloud();
  }

  _menuHoverEffect(element) {
    element.inputEnabled = true;
    element.events.onInputOver.add(() => {
      element.alpha = 1;
    })

    element.events.onInputOut.add(() => {
      element.alpha = 0.8;
    })
  }

  _renderCloud() {
      cloud1 = this.add.sprite(10, 100, 'cloud'),
      cloud2 = this.add.sprite(800, 100, 'cloud'),
      cloud3 = this.add.sprite(254, 115, 'cloud'),
      cloud4 = this.add.sprite(602, 50, 'cloud'),
      cloud5 = this.add.sprite(423, 80, 'cloud'),
      cloud6 = this.add.sprite(330, 60, 'cloud'),
      cloud7 = this.add.sprite(524, 40, 'cloud'),
      cloud8 = this.add.sprite(90, 30, 'cloud');

      cloud1.alpha = 0.2;
      cloud2.alpha = 0.2;
      cloud3.alpha = 0.2;
      cloud4.alpha = 0.2;
      cloud5.alpha = 0.2;
      cloud6.alpha = 0.2;
      cloud7.alpha = 0.2;
      cloud8.alpha = 0.2;

      cloud1.scale.x = this.rnd.integerInRange(2, 7);
      cloud2.scale.x = this.rnd.integerInRange(2, 6);
      cloud3.scale.x = this.rnd.integerInRange(2, 5);
      cloud4.scale.x = this.rnd.integerInRange(2, 6);
      cloud5.scale.x = this.rnd.integerInRange(2, 8);
      cloud6.scale.x = this.rnd.integerInRange(2, 7);
      cloud7.scale.x = this.rnd.integerInRange(2, 8);
      cloud8.scale.x = this.rnd.integerInRange(2, 6);

      cloud1.scale.y = cloud1.scale.x;
      cloud2.scale.y = cloud2.scale.x;
      cloud3.scale.y = cloud3.scale.x;
      cloud4.scale.y = cloud4.scale.x;
      cloud5.scale.y = cloud5.scale.x;
      cloud6.scale.y = cloud6.scale.x;
      cloud7.scale.y = cloud7.scale.x;
      cloud8.scale.y = cloud8.scale.x;
  }

  _loadBackground() {
    let background = this.add.tileSprite(0, 0, 1280, 960, 'background');
  }

  _playSound() {
    music = this.add.audio('timetorun');

    music.loop = true;

    music.play();

  }

  _startNewGame() {
    gong = this.add.audio('gong');

    gong.play();

    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        music.volume = music.volume - 0.1;

        if (i == 10) {
          music.stop();
          this.state.start('Game');
        }
      }, i * 200);
    }

  }
}
