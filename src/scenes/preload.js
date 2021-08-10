import Phaser from "phaser";
import player1 from "../assets/player/Blue/alienBlue_walk1.png";
import player2 from "../assets/player/Blue/alienBlue_walk2.png";
import blueLand from "../assets/background/blue_land.png";
import { gameConfig } from "../gameOptions.js";
import mountain from "../assets/background/mountain.png";

class PreloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("blueLand", blueLand);
    this.load.spritesheet("player", player1, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet("playerRun", player2, {
      frameWidth: 200,
      frameHeight: 200,
    });
  }
  create() {
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;

    this.anims.create({
      key: "run",
      frames: [{ key: "player" }, { key: "playerRun" }],
      frameRate: 10,
      repeat: -1,
    });
  }
}
export default PreloadGame;
