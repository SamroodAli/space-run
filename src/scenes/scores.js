import Background from "./background";
import { gameConfig } from "../gameOptions.js";

class Scores extends Background {
  constructor() {
    super("Scores");
  }

  init(data) {
    this.score = data.score;
  }

  createText(string, posX, posY, fontSize, fill) {
    const text = this.add.text(
      posX ? posX : gameConfig.width / 4,
      posY ? posY : gameConfig.height / 4,
      string,
      {
        fill: fill ? fill : "#000",
        fontSize: fontSize ? fontSize : "40px",
      }
    );
    return text;
  }
  create() {
    super.create();
    const gameOverText = this.createText(
      `
      Game Over
      Score: ${this.score}
      `
    );
  }
  update() {
    super.update();
  }
}

export default Scores;
