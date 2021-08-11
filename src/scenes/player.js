import Platform from "./platform.js";
import { gameConfig, gameOptions } from "../gameOptions.js";
class Player extends Platform {
  currentPlayer = "Blue";
  constructor(key) {
    super(key);
  }

  createPlayer() {
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      gameConfig.height / 2,
      `${this.currentPlayer}Player`
    );
    this.player.setScale(0.5);
    this.player.setDepth(2);
    this.player.setGravityY(gameOptions.playerGravity);
  }

  runOnPlatform() {
    if (this.player.body.touching.down) {
      this.playerJumps = 0;
    }
    if (!this.player.anims.isPlaying) {
      this.player.anims.play(`${this.currentPlayer}Run`);
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
    this.letPlayerCollectWithitems();
    this.dying = false;
  }
  update() {
    super.update();
    this.player.x = gameOptions.playerStartPosition;
    if (!this.player.body.touching.down) {
      this.player.anims.play(`${this.currentPlayer}Jump`);
    }
  }
}

export default Player;
