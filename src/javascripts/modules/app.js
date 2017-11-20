import MainMenu from './states/MainMenu';
import GameState from './states/Game';
import Splash from  './states/Splash';
import strings from './config/Constants';


export default class App extends Phaser.Game {
  constructor(el) {
    super(1024, 768, Phaser.AUTO, 'app', null);
    this.state.add('Splash', Splash, false);
    this.state.add('Game', GameState, false);
    this.state.add('MainMenu', MainMenu, false);

    this.state.start();
    this.state.start('Splash');
  }
}
