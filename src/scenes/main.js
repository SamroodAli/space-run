import Background from './background.js';
import LeaderBoard from './leaderBoard.js';

const leaderBoard = new LeaderBoard();
class Main extends Background {
  constructor() {
    super('Main');
  }

  init = async ({ score = 0, gameOver = false }) => {
    this.score = score;
    this.gameOver = gameOver;

    if (this.gameOver) {
      leaderBoard.getLeaderBoard(this.score);
    } else {
      leaderBoard.onStart(this.restartGame);
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
    this.scene.start('Game');
  };
}

export default Main;
