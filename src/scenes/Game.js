import Phaser from "phaser";
class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {
    this.load.image("background", "");
  }
  create() {}
}
export default Game;
