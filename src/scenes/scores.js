import Background from "./background.js";
import leaderBoard from "./leaderBoard";
class Scores extends Background {
  constructor() {
    super("Scores");
  }

  init(data) {
    this.score = data.score;
    leaderBoard.getScores();
  }

  create() {
    super.create();
    this.createText(`Score: ${this.score}`, 100, 100);
  }

  update() {
    super.update();
  }
}

export default Scores;
