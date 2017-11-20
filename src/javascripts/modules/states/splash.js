import strings from '../config/Constants';


export default class extends Phaser.State {
  init () {}
  preload () {
  }

  create () {
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
    copyrightText.alpha = 0.8;


    let copyrightTextSummary = this.add.text(this.world.centerX, 450, 'Production');

    copyrightTextSummary.font = "archivo_blackregular";
    copyrightTextSummary.fontSize = 50;
    copyrightTextSummary.fill = '#fff';
    copyrightTextSummary.anchor.setTo(0.5);
    copyrightTextSummary.setShadow(0, 5, 'rgba(255,255,255,0.5)', 10);
    copyrightTextSummary.alpha = 0.8;


    setTimeout(() => {
      this.state.start('MainMenu');
    }, 6000);


  }

  _startNewGame() {

  }
}
