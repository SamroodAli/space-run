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

  letPlayerJump() {
    this.playerJumps = 0;
    this.input.keyboard.on("keydown-SPACE", this.jump, this);
    this.input.on("pointerdown", this.jump, this);
  }

  jump() {
    if (!this.dying && this.playerJumps < gameOptions.jumps) {
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
    }
  }

  create() {
    super.create();
    this.createPlayer();
    this.letPlayerCollideWithPlatform();
    this.letPlayerJump();
    this.dying = false;
  }
  update() {
    super.update();
    this.player.x = gameOptions.playerStartPosition;
  }
}

export default Game;
