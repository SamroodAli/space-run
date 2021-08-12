import Player from "./player.js";
import { gameConfig, gamePoints } from "../gameOptions.js";

class Game extends Player {
  score = 0;
  constructor() {
    super("Game");
  }

  restartGame() {
    this.score = 0;
    this.remainingShots = 6;
    this.scene.stop();
    this.scene.start("PreloadGame");
  }

  createText(string, posX, posY, fontSize, fill) {
    const text = this.add.text(
      posX ? posX : gameConfig.width / 2.5,
      posY ? posY : gameConfig.height / 4,
      string,
      {
        fill: fill ? fill : "#000",
        fontSize: fontSize ? fontSize : "40px",
      }
    );
    return text;
  }

  checkGameOver() {
    if (this.player.y > gameConfig.height) {
      this.dying = true;
      const gameOverText = this.createText(
        `
      Game Over
      Score: ${this.score}
      `
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
    console.log(this.dying);
    if (!this.dying) {
      this.score += gamePoints.distanceRun;
    }
    this.scoreText.setText(`Score: ${this.score}`);
    this.checkGameOver();
  }
}

export default Game;
