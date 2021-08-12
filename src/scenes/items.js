import Background from "./background.js";
import { gameConfig, gameOptions, gamePoints } from "../gameOptions.js";

class Items extends Background {
  constructor(key) {
    super(key);
  }
  colors = ["Blue", "Red", "Green", "Yellow"];
  beeAndfly = ["bee", "fly"];

  nextGem() {
    return `gem${this.colors[Phaser.Math.Between(0, 3)]}`;
  }

  poolGems() {
    this.gemGroup = this.add.group({
      removeCallback: (gem) => {
        if (gem.collected) {
          this.score += gamePoints.coin;
        }
        this.gemPool.add(gem);
      },
    });

    this.gemPool = this.add.group({
      removeCallback: (gem) => this.gemGroup.add(gem),
    });
  }

  letPlayerCollectWithGems() {
    this.physics.add.overlap(
      this.gemGroup,
      this.player,
      function (gem) {
        gem.collected = true;
        this.tweens.add({
          targets: gem,
          y: gem.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function () {
            const playerColor = gem.frame.texture.key.slice(3);
            if (playerColor != this.currentPlayer) {
              this.player.setTexture(playerColor + "Player");
              this.currentPlayer = playerColor;
            }
            this.gemGroup.killAndHide(gem);
            this.gemGroup.remove(gem);
          },
        });
      },
      null,
      this
    );
  }

  recyclegems() {
    this.gemGroup.getChildren().forEach((gem) => {
      if (gem.x < gem.displayWidth / 2) {
        this.gemGroup.killAndHide(gem);
        this.gemGroup.remove(gem);
      }
    });
  }

  addGemOnPlatform(posX, posY, platform) {
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        let gem;
        if (this.gemPool.getLength()) {
          gem = this.gemPool.getFirst();
          gem.x = posX;
          gem.y = posY - 46;
          gem.alpha = 1;
          gem.active = true;
          gem.visible = true;
          gem.setVelocityX(platform.body.velocity.x);
          this.gemPool.remove(gem);
        } else {
          gem = this.physics.add.sprite(posX, posY - 60, this.nextGem());
          gem.setImmovable = true;
          gem.setVelocityX(platform.body.velocity.x);
          this.gemGroup.add(gem);
        }
        gem.collected = false;
        gem.setScale(0.75);
        gem.setDepth(2);
      }
    }
  }

  poolBees() {
    this.beesGroup = this.add.group({
      removeCallback: (bee) => {
        this.beesPool.add(bee);
      },
    });

    this.beesPool = this.add.group({
      removeCallback: (bee) => this.beesGroup.add(bee),
    });
  }

  flyType = () => `${this.beeAndfly[Phaser.Math.Between(0, 1)]}Attack`;

  addBees() {
    if (gameOptions.enemyPercent()) {
      let posX = gameConfig.width + 50;
      let posY = gameConfig.height / 2 + Phaser.Math.Between(-100, 100);
      let velocity = -300;
      if (this.beesPool.getLength()) {
        let bee = this.beesPool.getFirst();
        bee.anims.play(this.flyType());
        bee.x = posX;
        bee.y = posY;
        bee.alpha = 1;
        bee.active = true;
        bee.visible = true;
        bee.setVelocityX(velocity);
        this.beesPool.remove(bee);
      } else {
        let bee = this.physics.add.sprite(posX, posY - 60, "bee");
        bee.setImmovable = true;
        bee.setVelocityX(velocity);
        bee.body.setSize(20, 30, 8, 8);
        bee.setScale(0.75);

        this.beesGroup.add(bee);
        bee.anims.play(this.flyType());
        bee.setDepth(2);
      }
    }
  }

  recycleBees() {
    this.beesGroup.getChildren().forEach((bee) => {
      if (bee.x < bee.displayWidth / 2 || bee.y > gameConfig.height) {
        this.beesGroup.killAndHide(bee);
        this.beesGroup.remove(bee);
      }
    });
  }

  letBeesKillPlayer() {
    this.physics.add.overlap(
      this.player,
      this.beesGroup,
      () => {
        this.dying = true;
        this.player.anims.stop();
        this.player.body.setVelocityY(-200);
        this.physics.world.removeCollider(this.platformCollider);
      },
      null,
      this
    );
  }

  poolbarnacle() {
    this.barnacleGroup = this.add.group({
      removeCallback: (barnacle) => this.barnaclePool.add(barnacle),
    });

    this.barnaclePool = this.add.group({
      removeCallback: (barnacle) => this.barnacleGroup.add(barnacle),
    });
  }

  recyclebarnacle() {
    this.barnacleGroup.getChildren().forEach((barnacle) => {
      if (
        barnacle.x < barnacle.displayWidth / 2 ||
        barnacle.y > gameConfig.height
      ) {
        this.barnacleGroup.killAndHide(barnacle);
        this.barnacleGroup.remove(barnacle);
      }
    });
  }

  letbarnacleKillPlayer() {
    this.physics.add.overlap(
      this.player,
      this.barnacleGroup,
      (player, barnacle) => {
        if (!barnacle.dead) {
          this.dying = true;
          this.player.anims.stop();
          this.player.body.setVelocityY(-200);
          this.physics.world.removeCollider(this.platformCollider);
        }
      },
      null,
      this
    );
  }

  addBernacleOnPlatform(posX, posY, platform) {
    if (Phaser.Math.Between(0, 100) < gameOptions.barnaclePercent) {
      const startPlatform = posX - platform.displayWidth / 2;
      const barnacleX =
        startPlatform + Phaser.Math.Between(20, platform.displayWidth - 20);
      const barnacleY = posY - 2 * platform.height;
      let barnacle;
      if (this.barnaclePool.getLength()) {
        barnacle = this.barnaclePool.getFirst();
        barnacle.x = barnacleX;
        barnacle.y = barnacleY;
        this.barnaclePool.remove(barnacle);
      } else {
        barnacle = this.physics.add
          .sprite(barnacleX, barnacleY, "barnacle")
          .setScale(0.75);
        this.barnacleGroup.add(barnacle);
        barnacle.setDepth(2);
        barnacle.setImmovable(true);
      }
      barnacle.dead = false;
      barnacle.anims.play("barnacleAttack");
      barnacle.setVelocityX(platform.body.velocity.x);
      barnacle.setVelocityY(0);
      barnacle.alpha = 1;
      barnacle.active = true;
      barnacle.visible = true;
    }
  }

  letPlayerCollideWithitems() {
    this.letPlayerCollectWithGems();
    this.letbarnacleKillPlayer();
    this.letBeesKillPlayer();
  }

  create() {
    super.create();
    this.poolGems();
    this.poolbarnacle();
    this.poolBees();
  }

  update() {
    super.update();
    this.recyclegems();
    this.recyclebarnacle();
    this.addBees();
    this.recycleBees();
  }
}

export default Items;
