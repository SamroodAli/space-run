import Background from "./background.js";

class Items extends Background {
  constructor(key) {
    super(key);
  }

  poolGems() {
    this.gemGroup = this.add.group({
      removeCallback: (gem) => this.gemPool.add(gem),
    });

    this.gemPool = this.add.group({
      removeCallback: (gem) => this.gemGroup.add(gem),
    });
  }

  letPlayerCollectWithGems() {
    this.physics.add.overlap(
      this.player,
      this.gemGroup,
      function (player, gem) {
        this.tweens.add({
          targets: gem,
          y: gem.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function () {
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
      if (barnacle.x < barnacle.displayWidth / 2) {
        this.barnacleGroup.killAndHide(barnacle);
        this.barnacleGroup.remove(barnacle);
      }
    });
  }

  letbarnacleKillPlayer() {
    this.physics.add.overlap(
      this.player,
      this.barnacleGroup,
      () => {
        this.dying = true;
        this.player.anims.stop();
        this.player.setFrame(3);
        this.player.body.setVelocityY(-200);
        this.physics.world.removeCollider(this.platformCollider);
      },
      null,
      this
    );
  }

  letPlayerCollectWithitems() {
    this.letPlayerCollectWithGems();
    this.letbarnacleKillPlayer();
  }

  create() {
    super.create();
    this.poolGems();
    this.poolbarnacle();
  }
  update() {
    super.update();
    this.recyclegems();
    this.recyclebarnacle();
  }
}

export default Items;
