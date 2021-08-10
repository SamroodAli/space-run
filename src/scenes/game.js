import Platform from "./platform.js";
import { gameConfig, gameOptions } from "../gameOptions.js";
class Game extends Platform {
  constructor() {
    super("Game");
  }

  createPlayer() {
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      gameConfig.height / 2,
      "player"
    );
    this.player.setScale(0.5);
    this.player.setDepth(2);
    this.player.setGravityY(gameOptions.playerGravity);
  }

  runOnPlatform() {
    if (!this.player.anims.isPlaying) {
      this.player.anims.play("run");
    }
  }
  letPlayerCollideWithPlatform() {
    this.platformCollider = this.physics.add.collider(
      this.player,
      this.platformGroup,
      this.runOnPlatform,
      null,
      this
    );
  }
  jump() {
    if (!this.dying && this.playerJumps < gameOptions.jumps) {
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  create() {
    super.create();
    this.createPlayer();
    this.letPlayerCollideWithPlatform();
    this.dying = false;
    this.playerJumps = 0;
  }
  update() {
    super.update();
    this.player.x = gameOptions.playerStartPosition;
  }
}

export default Game;
