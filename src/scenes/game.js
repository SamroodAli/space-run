import Player from "./player.js";
import { gameConfig, gamePoints } from "../gameOptions.js";

class Game extends Player {
  score = 0;

  constructor() {
    super("Game");
  }

  init() {
    this.score = 0;
    this.remainingShots = 6;
  }

  restartGame() {
    this.scene.stop();
    this.scene.start("Main", { score: this.score, gameOver: true });
  }

  checkGameOver() {
    if (this.player.y > gameConfig.height) {
      this.dying = true;
      const gameOverText = this.createText(
        "Game Over",
        gameConfig.width / 2.5,
        gameConfig.height / 4
      );
      gameOverText.setDepth(2);
      this.time.delayedCall(1000, this.restartGame, null, this); // delay in ms
    }
  }

  create() {
    this.dying = false;
    super.create();
    this.scoreText = this.createText(`Score: ${this.score}`, 100, 100);
  }

  update() {
    super.update();
    if (!this.dying) {
      this.score += gamePoints.distanceRun;
    }
    this.scoreText.setText(`Score: ${this.score}`);
    this.checkGameOver();
  }
}

export default Game;
