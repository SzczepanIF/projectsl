import strings from '../config/Constants';

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.image('background', '/images/start_bg.jpg');

    this.load.audio('timetorun', '/music/timetorun.mp3');

  }

  create () {
    this._loadMainMenu();
  }

  render () {

  }

  _loadMainMenu() {

    this._loadBackground();
    this._playSound();
    let banner = this.add.text(320, 80, strings.meta.title);
      banner.font = 'Berkshire Swash';
      banner.padding.set(20, 16);
      banner.fontSize = 60;
      banner.fill = '#fff';
      banner.smoothed = true;
      banner.anchor.setTo(0.5);
      banner.setShadow(0, 5, 'rgba(0,0,0,0.5)', 10);

    let newGame = this.add.text(this.world.centerX, 450, strings.menu.newGame)
      newGame.font = "Arial"
      newGame.fontSize = 50
      newGame.fill = '#fff'
      newGame.anchor.setTo(0.5);
      newGame.setShadow(-5, 5, 'rgba(255,255,255,0.5)', 10);
      this._menuHoverEffect(newGame);
      newGame.events.onInputDown.add(this._startNewGame, this);


    let loadGame = this.add.text(this.world.centerX, 550, strings.menu.loadGame)
      loadGame.font = "Arial"
      loadGame.fontSize = 50
      loadGame.fill = '#fff'
      loadGame.anchor.setTo(0.5);
      loadGame.setShadow(-5, 5, 'rgba(255,255,255,0.5)', 10);
      this._menuHoverEffect(loadGame);
  }

  _menuHoverEffect(element) {
    element.inputEnabled = true;
    element.events.onInputOver.add(() => {
      element.fill = '#fff'
    })

    element.events.onInputOut.add(() => {
      element.fill = "#999"
    })
  }

  _loadBackground() {
    let background = this.add.tileSprite(0, 0, 1280, 960, 'background');
  }

  _playSound() {
    let music = this.sound.play('timetorun');
  }

  _startNewGame() {
    console.log('New Game Starting');
    console.log(this.state.start('Game'));
  }
}
