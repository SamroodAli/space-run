import Background from "./background.js";
class Game extends Background {
  constructor() {
    super("Game");
  }

  preload() {}
  create() {
    super.create();
    this.addedPlatforms = 0;
    this.platformGroup = this.add.group({
      removeCallback: (platform) => this.platformPool.add(platform),
    });
    this.platformPool = this.add.group({
      removeCallback: (platform) => this.platformGroup.add(platform),
    });
  }
  update() {
    super.update();
  }
}
export default Game;
