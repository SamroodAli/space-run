import Background from "./background.js";
import leaderBoard from "./leaderBoard";
const LeaderBoard = new leaderBoard();
class Main extends Background {
  constructor() {
    super("Main");
  }

  init = async ({ score = 0, gameOver = false }) => {
    this.score = score;
    this.gameOver = gameOver;

    if (this.gameOver) {
      LeaderBoard.getLeaderBoard(this.score);
    } else {
      LeaderBoard.onStart(this.restartGame);
    }
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

export default Main;
