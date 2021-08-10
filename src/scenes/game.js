import Phaser from "phaser";
import { gameConfig } from "../gameOptions.js";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {}
  create() {
    console.log("game loaded");
    // Create background
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;
  }
}
export default Game;
