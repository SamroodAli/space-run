import Background from "./background.js";
import leaderBoard from "./leaderBoard";
const LeaderBoard = new leaderBoard();
class Scores extends Background {
  constructor() {
    super("Scores");
  }

  init = async (data) => {
    this.score = data.score;
    LeaderBoard.init(this.score, this.restartGame);
  };

  create() {
    super.create();
  }

  update() {
    super.update();
  }
  restartGame = () => {
    this.scene.stop();
    this.scene.start("Game");
  };
}

export default Scores;
