import Phaser from "phaser";
import { gameConfig, gameOptions } from "../gameOptions.js";

class Background extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  setBackground() {
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;
  }

  getLastMountainX() {
    let lastMountainX = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      lastMountainX = Math.max(lastMountainX, mountain.x);
    });
    return lastMountainX;
  }

  addMountains() {
    const lastMountainX = this.getLastMountainX();
    if (lastMountainX < gameConfig.width * 2) {
      let mountain = this.physics.add.sprite(
        lastMountainX + Phaser.Math.Between(100, 350),
        gameConfig.height + Phaser.Math.Between(20, 120),
        "mountain"
      );
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3));
      this.addMountains();
    }
  }

  recycleMountains() {
    this.mountainGroup.getChildren().forEach((mountain) => {
      if (mountain.x < -mountain.displayWidth) {
        let lastMountainX = this.getLastMountainX();
        mountain.x = lastMountainX + Phaser.Math.Between(100, 350);
        mountain.y = gameConfig.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    });
  }

  create() {
    this.setBackground();
    this.mountainGroup = this.add.group();
    this.addMountains();
  }

  update() {
    this.recycleMountains();
  }
}

export default Background;
