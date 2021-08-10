import Background from "./background.js";
class Game extends Background {
  constructor() {
    super("Game");
  }

  poolPlatforms() {
    this.platformGroup = this.add.group({
      removeCallback: (platform) => this.platformPool.add(platform),
    });
    this.platformPool = this.add.group({
      removeCallback: (platform) => this.platformGroup.add(platform),
    });
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(...gameOptions.platformSpeedRange) * -1
      );
      this.platformGroup.add(platform);
      platform.setDepth(2);
    }
    this.nextPlatformDistance = Phaser.Math.Between(...gameOptions.spawnRange);
  }

  create() {
    super.create();
    this.addedPlatforms = 0;
    this.poolPlatforms();
    this.addPlatform(
      gameConfig.width,
      gameConfig.width / 2,
      gameConfig.height * gameOptions.platformVerticalLimit[1]
    );
  }

  update() {
    super.update();
  }
}
export default Game;
