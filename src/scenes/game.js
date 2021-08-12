import Player from "./player.js";
import { gameConfig } from "../gameOptions.js";

class Game extends Player {
  score = 0;
  constructor() {
    super("Game");
  }

  restartGame() {
    this.score = 0;
    this.dying = false;
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
      const gameOverText = this.createText("Game Over");
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
