import Background from "./background.js";
import leaderBoard from "./leaderBoard";
class Scores extends Background {
  constructor() {
    super("Scores");
  }

  init = async (data) => {
    this.score = data.score;
    new leaderBoard(this.score);
  };

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}

export default Scores;
