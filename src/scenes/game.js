import Player from "./player.js";
import { gameConfig } from "../gameOptions.js";

class Game extends Player {
  constructor() {
    super("Game");
  }

  restartGame() {
    this.scene.stop();
    this.scene.start("PreloadGame");
  }

  checkGameOver() {
    if (this.player.y > gameConfig.height) {
      const gameOverText = this.add.text(
        gameConfig.width / 2.5,
        gameConfig.height / 4,
        "Game Over",
        {
          fill: "#000",
          fontSize: "40px",
          alignSelf: "center",
        }
      );
      gameOverText.setDepth(2);
      this.time.delayedCall(1000, this.restartGame, null, this); // delay in ms
    }
  }

  create() {
    super.create();
  }
  update() {
    super.update();
    this.checkGameOver();
  }
}

export default Game;
