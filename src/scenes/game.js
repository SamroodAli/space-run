import Phaser from "phaser";
import { gameConfig } from "../gameOptions.js";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {}
  create() {
    this.setBackground();
    // mountain setup
    this.mountainGroup = this.add.group();
  }

  setBackground() {
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;
  }
}
export default Game;
