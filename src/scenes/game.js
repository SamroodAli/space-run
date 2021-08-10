import Phaser from "phaser";
import { gameConfig } from "../gameOptions.js";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  getLastMountainX() {
    let lastMountainX = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      lastMountainX = Math.max(lastMountainX, mountain.x);
    });
    return lastMountainX;
  }
  addMountains() {
    let lastMountainX = this.getLastMountainX();
  }
  preload() {}
  create() {
    this.setBackground();
    this.mountainGroup = this.add.group();
    this.addMountains();
  }

  setBackground() {
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;
  }
}
export default Game;
