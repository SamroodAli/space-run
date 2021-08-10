import Player from "./player.js";
import { gameConfig } from "../gameOptions.js";

class Game extends Player {
  constructor() {
    super("Game");
  }

  restartGame = () => {
    this.scene.stop();
    this.scene.start("PreloadGame");
  };

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
      (player, barnacle) => {
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

  create() {
    super.create();
    this.poolGems();
    this.letPlayerCollectWithGems();
    this.poolbarnacle();
    this.letbarnacleKillPlayer();
  }
  update() {
    super.update();
    if (this.player.y > gameConfig.height) {
      this.add.text(
        gameConfig.width / 2.5,
        gameConfig.height / 4,
        "Game Over",
        {
          fill: "#000",
          fontSize: "40px",
          alignSelf: "center",
        }
      );
      this.time.delayedCall(1000, this.restartGame, null, this); // delay in ms
    }
    this.recyclegems();
    this.recyclebarnacle();
  }
}

export default Game;
