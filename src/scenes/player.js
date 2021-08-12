import Platform from "./platform.js";
import { gameConfig, gameOptions } from "../gameOptions.js";
class Player extends Platform {
  currentPlayer = "Blue";
  remainingShots = 6;
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
    this.input.on("pointerdown", this.jump, this);
  }

  letPlayerShoot() {
    this.input.keyboard.on("keydown-SPACE", this.shoot, this);
  }

  jump() {
    if (!this.dying && this.playerJumps < gameOptions.jumps) {
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;
    }
  }

  shoot() {
    if (this.remainingShots > 0) {
      const laser = this.physics.add.sprite(
        gameOptions.playerStartPosition + 50,
        this.player.y + 25,
        `${this.currentPlayer}Laser`
      );
      this.gun.anims.play("gunFire");
      laser.setScale(0.5);
      laser.setImmovable(true);
      laser.setVelocityX(400);
      laser.setDepth(2);
      this.remainingShots -= 1;
      if (this.remainingShots === 0) {
        this.gun.anims.play("emptyGun");
        this.time.delayedCall(3000, () => {
          this.remainingShots = 6;
          this.gun.anims.play("gunFire");
        });
      }
    }
  }

  createGun() {
    this.gun = this.physics.add.sprite(
      gameOptions.playerStartPosition + 40,
      this.player.y + 25,
      "loadedGun"
    );
    this.gun.setDepth(2);
  }

  fixGunWithPlayer() {
    this.gun.x = this.player.x + 40;
    this.gun.y = this.player.y + 30;
  }

  create() {
    super.create();
    this.createPlayer();
    this.letPlayerCollideWithPlatform();
    this.letPlayerJump();
    this.letPlayerShoot();
    this.letPlayerCollideWithitems();
    this.createGun();
    this.dying = false;
  }
  update() {
    super.update();
    this.fixGunWithPlayer();
    this.player.x = gameOptions.playerStartPosition;
    if (!this.player.body.touching.down) {
      this.player.anims.play(`${this.currentPlayer}Jump`);
    }
  }
}

export default Player;
