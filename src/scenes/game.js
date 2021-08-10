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

  poolBernard() {
    this.bernardGroup = this.add.group({
      removeCallback: (bernard) => this.bernardPool.add(bernard),
    });

    this.bernardPool = this.add.group({
      removeCallback: (bernard) => this.bernardGroup.add(bernard),
    });
  }

  recycleBernard() {
    this.bernardGroup.getChildren().forEach((bernard) => {
      if (bernard.x < bernard.displayWidth / 2) {
        this.bernardGroup.killAndHide(bernard);
        this.bernardGroup.remove(bernard);
      }
    });
  }

  letBernardKillPlayer() {
    this.physics.add.overlap(
      this.player,
      this.bernardGroup,
      (player, bernard) => {
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
    this.poolBernard();
    this.letBernardKillPlayer();
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
  }
}

export default Game;
