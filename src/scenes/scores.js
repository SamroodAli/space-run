import Background from "./background.js";

class Scores extends Background {
  constructor() {
    super("Scores");
  }

  init(data) {
    this.score = data.score;
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
