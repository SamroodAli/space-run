import Background from "./background.js";
import { gameConfig, gameOptions } from "../gameOptions.js";
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

  recyclePlatform() {
    let minDistance = gameConfig.width;
    let rightmostPlatformHeightFromBottom = 0;

    this.platformGroup.getChildren().forEach((platform) => {
      let platformDistance =
        gameConfig.width - (platform.x + platform.displayWidth / 2);

      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeightFromBottom = platform.y;
      }

      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      let nextPlatformWidth = Phaser.Math.Between(
        ...gameOptions.platformSizeRange
      );
      let platformRandomHeight =
        gameOptions.platformHeightScale *
        Phaser.Math.Between(...gameOptions.platformHeightRange);
      let nextPlatformGap =
        rightmostPlatformHeightFromBottom + platformRandomHeight;
      let minPlatformHeight =
        gameConfig.height * gameOptions.platformVerticalLimit[0];
      let maxPlatformHeight =
        gameConfig.height * gameOptions.platformVerticalLimit[1];
      let nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight
      );
      this.addPlatform(
        nextPlatformWidth,
        gameConfig.width + nextPlatformWidth / 2,
        nextPlatformHeight
      );
    }
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
    this.recyclePlatform();
  }
}
export default Game;
