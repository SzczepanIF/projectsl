import strings from '../config/Constants';
export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this._loadMainMenu();
  }

  render () {

  }

  _loadMainMenu() {
    let banner = this.add.text(this.world.centerX, 50, strings.meta.title)
      banner.font = 'Comic Sans MS'
      banner.padding.set(10, 16)
      banner.fontSize = 40
      banner.fill = '#FFF'
      banner.smoothed = false
      banner.anchor.setTo(0.5);
      banner.setShadow(-5, 5, 'rgba(255,255,255,0.5)', 10);

    let newGame = this.add.text(this.world.centerX, 150, strings.menu.newGame)
      newGame.font = "Arial"
      newGame.fontSize = 50
      newGame.fill = '#999'
      newGame.anchor.setTo(0.5);
      newGame.setShadow(-5, 5, 'rgba(255,255,255,0.5)', 10);
      this._menuHoverEffect(newGame);
      newGame.events.onInputDown.add(this._startNewGame, this);


    let loadGame = this.add.text(this.world.centerX, 250, strings.menu.loadGame)
      loadGame.font = "Arial"
      loadGame.fontSize = 50
      loadGame.fill = '#999'
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

  _startNewGame() {
    console.log('New Game Starting');
    console.log(this.state.start('Game'));
  }
}
