import Platform from "./platform.js";
import { gameConfig, gameOptions } from "../gameOptions.js";
class Game extends Platform {
  constructor() {
    super("Game");
  }
  create() {
    super.create();
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      gameConfig.height / 2,
      "player"
    );
    this.player.setScale(0.5);
    this.player.setDepth(2);
    this.player.setGravityY(gameOptions.playerGravity);
  }
}

export default Game;
