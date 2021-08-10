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
    this.platformCollider = this.physics.add.collider(
      this.player,
      this.platformGroup,
      () => {
        if (!this.player.anims.isPlaying) {
          this.player.anims.play("run");
        }
      },
      null,
      this
    );
  }
  update() {
    super.update();
    this.player.x = gameOptions.playerStartPosition;
  }
}

export default Game;
