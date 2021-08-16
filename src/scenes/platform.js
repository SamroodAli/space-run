import Phaser from "phaser";
import Items from "./items.js";
import { gameConfig, gameOptions } from "../gameOptions.js";

class Platform extends Items {
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
    }

    super.addGemOnPlatform(posX, posY, platform);
    if (this.score > 250) {
      super.addBernacleOnPlatform(posX, posY, platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(...gameOptions.spawnRange);
  }

  recyclePlatform() {
    let minDistance = gameConfig.width;
    let rightmostPlatformHeightFromBottom = 0;

    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance =
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
      const nextPlatformWidth = Phaser.Math.Between(
        ...gameOptions.platformSizeRange
      );
      const platformRandomHeight =
        gameOptions.platformHeightScale *
        Phaser.Math.Between(...gameOptions.platformHeightRange);
      const nextPlatformGap =
        rightmostPlatformHeightFromBottom + platformRandomHeight;
      const minPlatformHeight =
        gameConfig.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight =
        gameConfig.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(
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
export default Platform;
