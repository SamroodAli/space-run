import Phaser from "phaser";
import player1 from "../assets/player/Blue/alienBlue_walk1.png";
import player2 from "../assets/player/Blue/alienBlue_walk2.png";

class PreloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
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
    this.anims.create({
      key: "run",
      frames: [{ key: "player" }, { key: "playerRun" }],
      frameRate: 10,
      repeat: -1,
    });
  }
}
export default PreloadGame;
