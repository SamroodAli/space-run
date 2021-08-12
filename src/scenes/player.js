import Platform from "./platform.js";
import { gameConfig, gameOptions } from "../gameOptions.js";
class Player extends Platform {
  currentPlayer = "Blue";
  remainingShots = 6;
  constructor(key) {
    super(key);
  }

  poolLasers() {
    this.laserGroup = this.add.group({
      removeCallback: (laser) => this.laserPool.add(laser),
    });

    this.laserPool = this.add.group({
      removeCallback: (laser) => this.laserGroup.add(laser),
    });
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

  fixPlayerPosition() {
    this.player.x = gameOptions.playerStartPosition;
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

  onLaserCollisionWithBee(laser, bee) {
    bee.anims.stop();
    const currentBee = bee.frame.texture.key.slice(0, 3);
    bee.anims.play(currentBee + "Dead");
    this.laserGroup.killAndHide(laser);
    this.laserGroup.remove(laser);
    bee.setVelocityY(-300);
    bee.setGravityY(gameOptions.playerGravity);
  }

  onLaserCollisionWithBarnacle(laser, barnacle) {
    barnacle.anims.stop();
    barnacle.anims.play("barnacleDead");
    this.laserGroup.killAndHide(laser);
    this.laserGroup.remove(laser);
    barnacle.setVelocityY(200);
    barnacle.dead = true;
  }

  letPlayerKillBees() {
    this.physics.add.collider(
      this.laserGroup,
      this.beesGroup,
      this.onLaserCollisionWithBee,
      null,
      this
    );
  }
  letPlayerKillBarnacle() {
    this.physics.add.collider(
      this.laserGroup,
      this.barnacleGroup,
      this.onLaserCollisionWithBarnacle,
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

  playJumpAnimationIfNotOnLand() {
    if (!this.player.body.touching.down) {
      this.player.anims.play(`${this.currentPlayer}Jump`);
    }
  }

  reloadGun() {
    this.remainingShots = 6;
    this.gun.anims.play("gunFire");
  }

  emptyGun() {
    this.gun.anims.play("emptyGun");
    this.time.delayedCall(
      3000,
      () => {
        this.remainingShots = 6;
        this.gun.anims.play("gunFire");
      },
      null,
      this
    );
  }

  loadLaser() {
    let laser;
    if (this.laserPool.getLength()) {
      laser = this.laserPool.getFirst();
      this.laserPool.remove(laser);
    } else {
      laser = this.physics.add.sprite(
        gameOptions.playerStartPosition + 50,
        this.player.y + 25,
        `${this.currentPlayer}Laser`
      );
      laser.setImmovable(true);
      this.laserGroup.add(laser);
    }
    laser.x = gameOptions.playerStartPosition + 50;
    laser.y = this.player.y + 25;
    laser.active = true;
    laser.visible = true;
    laser.setScale(0.5);
    laser.setDepth(2);
    laser.setImmovable(true);
    return laser;
  }

  shoot() {
    if (this.remainingShots > 0) {
      this.gun.anims.play("gunFire");
      const laser = this.loadLaser();
      laser.setVelocityX(400);
      this.remainingShots -= 1;
      if (this.remainingShots === 0) {
        this.emptyGun();
      }
    }
  }

  recycleLaser() {
    this.laserGroup.getChildren().forEach((laser) => {
      if (laser.x > gameConfig.width + 50) {
        this.laserGroup.killAndHide(laser);
        this.laserGroup.remove(laser);
      }
    });
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
    this.poolLasers();
    this.letPlayerShoot();
    this.letPlayerCollideWithitems();
    this.letPlayerKillBees();
    this.letPlayerKillBarnacle();
    this.createGun();
  }
  update() {
    super.update();
    this.fixGunWithPlayer();
    this.recycleLaser();
    this.fixPlayerPosition();
    this.playJumpAnimationIfNotOnLand();
  }
}

export default Player;
