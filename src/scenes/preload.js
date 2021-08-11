import Phaser from "phaser";
import player from "../assets/player/Blue/alienBlue_walk1.png";
import bluePlayer from "../assets/player/Blue/alienBlue_walk2.png";
import bluePlayerRun from "../assets/player/Blue/alienBlue_jump.png";
import bluePlayerJump from "../assets/player/Green/alienGreen_walk1.png";
import playerRun from "../assets/player/Green/alienGreen_walk2.png";
import playerJump from "../assets/player/Green/alienGreen_jump.png";
import player from "../assets/player/Pink/alienPink_walk1.png";
import playerRun from "../assets/player/Pink/alienPink_walk2.png";
import playerJump from "../assets/player/Pink/alienPink_jump.png";
import player from "../assets/player/Yellow/alienYellow_walk1.png";
import playerRun from "../assets/player/Yellow/alienYellow_walk2.png";
import playerJump from "../assets/player/Yellow/alienYellow_jump.png";
import blueLand from "../assets/background/blue_land.png";
import mountain from "../assets/background/mountain.png";
import platform from "../assets/platform/planetMid.png";
import gemBlue from "../assets/items/gemBlue.png";
import gemGreen from "../assets/items/gemGreen.png";
import gemRed from "../assets/items/gemRed.png";
import gemYellow from "../assets/items/gemYellow.png";
import barnacle from "../assets/enemies/barnacle_attack.png";
import barnacleOpen from "../assets/enemies/barnacle.png";

import { gameConfig } from "../gameOptions.js";

class PreloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("blueLand", blueLand);
    this.load.image("platform", platform);
    this.load.image("player", player, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("playerRun", playerRun, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("playerJump", playerJump, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.spritesheet("mountain", mountain, {
      frameWidth: 512,
      frameHeight: 512,
    });
    this.load.image("gemBlue", gemBlue, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("gemGreen", gemGreen, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("gemRed", gemRed, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("gemYellow", gemYellow, {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("gemYellow", gemYellow, {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("barnacle", barnacle, {
      frameWidth: 32,
      frameHeight: 70,
    });
    this.load.image("barnacleOpen", barnacleOpen, {
      frameWidth: 40,
      frameHeight: 70,
    });
  }

  create() {
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;

    this.anims.create({
      key: "run",
      frames: [{ key: "player" }, { key: "playerRun" }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "playerJump" }],
      frameRate: 20,
    });

    this.anims.create({
      key: "changeColor",
      frames: [
        { key: "gemBlue" },
        { key: "gemGreen" },
        { key: "gemRed" },
        { key: "gemYellow" },
      ],
      frameRate: 2,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: "barnacleAttack",
      frames: [{ key: "barnacle" }, { key: "barnacleOpen" }],
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });

    this.scene.start("Game");
  }
}
export default PreloadGame;
