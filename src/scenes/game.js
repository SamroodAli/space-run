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
        this.gemGroup.killAndHide(gem);
        this.gemGroup.remove(gem);
      },
      null,
      this
    );
  }

  recycleCoins() {
    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    });
  }

  create() {
    super.create();
    this.poolGems();
    this.letPlayerCollectWithGems();
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
    this.recycleCoins();
  }
}

export default Game;
