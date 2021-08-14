import Background from "./background.js";
import leaderBoard from "./leaderBoard";
const LeaderBoard = new leaderBoard();
class Scores extends Background {
  constructor() {
    super("Scores");
  }

  init = async (data) => {
    this.score = data.score;
    LeaderBoard.init(this.score);
  };

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}

export default Scores;
