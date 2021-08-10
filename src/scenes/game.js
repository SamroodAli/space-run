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
  create() {
    super.create();
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
  }
}

export default Game;
