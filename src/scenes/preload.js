import Phaser from "phaser";
import BluePlayer from "../assets/player/Blue/alienBlue_walk1.png";
import BluePlayerRun from "../assets/player/Blue/alienBlue_walk2.png";
import BluePlayerJump from "../assets/player/Blue/alienBlue_jump.png";
import GreenPlayer from "../assets/player/Green/alienGreen_walk1.png";
import GreenPlayerRun from "../assets/player/Green/alienGreen_walk2.png";
import GreenPlayerJump from "../assets/player/Green/alienGreen_jump.png";
import RedPlayer from "../assets/player/Pink/alienPink_walk1.png";
import RedPlayerRun from "../assets/player/Pink/alienPink_walk2.png";
import RedPlayerJump from "../assets/player/Pink/alienPink_jump.png";
import YellowPlayer from "../assets/player/Yellow/alienYellow_walk1.png";
import YellowPlayerRun from "../assets/player/Yellow/alienYellow_walk2.png";
import YellowPlayerJump from "../assets/player/Yellow/alienYellow_jump.png";
import blueLand from "../assets/background/blue_land.png";
import mountain from "../assets/background/mountain.png";
import platform from "../assets/platform/planetMid.png";
import gemBlue from "../assets/items/gemBlue.png";
import gemGreen from "../assets/items/gemGreen.png";
import gemRed from "../assets/items/gemRed.png";
import gemYellow from "../assets/items/gemYellow.png";
import barnacle from "../assets/enemies/barnacle_attack.png";
import barnacleOpen from "../assets/enemies/barnacle.png";
import bee from "../assets/enemies/bee.png";
import beeFlat from "../assets/enemies/bee_move.png";
import beeDead from "../assets/enemies/bee_dead.png";
import fly from "../assets/enemies/fly.png";
import flyFlat from "../assets/enemies/fly_move.png";
import flyDead from "../assets/enemies/fly_dead.png";
import BlueLaser from "../assets/laser/BlueLaser.png";
import GreenLaser from "../assets/laser/GreenLaser.png";
import RedLaser from "../assets/laser/RedLaser.png";
import YellowLaser from "../assets/laser/YellowLaser.png";
import loadedGun from "../assets/laser/raygunBig.png";
import fireGun from "../assets/laser/raygun.png";
import emptyGun from "../assets/laser/raygunPurple.png";

import { gameConfig } from "../gameOptions.js";

class PreloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("blueLand", blueLand);
    this.load.image("platform", platform);

    this.load.image("BluePlayer", BluePlayer, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("BluePlayerRun", BluePlayerRun, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("BluePlayerJump", BluePlayerJump, {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.image("GreenPlayer", GreenPlayer, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("GreenPlayerRun", GreenPlayerRun, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("GreenPlayerJump", GreenPlayerJump, {
      frameWidth: 200,
      frameHeight: 200,
    });
    this.load.image("RedPlayer", RedPlayer, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("RedPlayerRun", RedPlayerRun, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("RedPlayerJump", RedPlayerJump, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("YellowPlayer", YellowPlayer, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("YellowPlayerRun", YellowPlayerRun, {
      frameWidth: 200,
      frameHeight: 200,
    });

    this.load.image("YellowPlayerJump", YellowPlayerJump, {
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
    this.load.image("bee", bee, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("beeFlat", beeFlat, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("fly", fly, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("flyFlat", flyFlat, {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("BlueLaser", BlueLaser, {
      frameWidth: 5,
      frameHeight: 3,
    });
    this.load.image("GreenLaser", GreenLaser, {
      frameWidth: 5,
      frameHeight: 3,
    });
    this.load.image("RedLaser", RedLaser, {
      frameWidth: 5,
      frameHeight: 3,
    });
    this.load.image("YellowLaser", YellowLaser, {
      frameWidth: 5,
      frameHeight: 3,
    });
    this.load.image("loadedGun", loadedGun, {
      frameWidth: 5,
      frameHeight: 3,
    });
    this.load.image("fireGun", fireGun, {
      frameWidth: 5,
      frameHeight: 3,
    });
    this.load.image("emptyGun", emptyGun, {
      frameWidth: 5,
      frameHeight: 3,
    });
  }

  create() {
    this.background = this.add
      .image(gameConfig.width / 2, gameConfig.height / 2, "blueLand")
      .setScrollFactor(1, 0);
    this.background.displayWidth = gameConfig.width;

    this.anims.create({
      key: "BlueRun",
      frames: [{ key: "BluePlayer" }, { key: "BluePlayerRun" }],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "BlueJump",
      frames: [{ key: "BluePlayerJump" }],
      frameRate: 20,
    });
    this.anims.create({
      key: "GreenRun",
      frames: [{ key: "GreenPlayer" }, { key: "GreenPlayerRun" }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "GreenJump",
      frames: [{ key: "GreenPlayerJump" }],
      frameRate: 20,
    });

    this.anims.create({
      key: "RedRun",
      frames: [{ key: "RedPlayer" }, { key: "RedPlayerRun" }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "RedJump",
      frames: [{ key: "RedPlayerJump" }],
      frameRate: 20,
    });

    this.anims.create({
      key: "YellowRun",
      frames: [{ key: "YellowPlayer" }, { key: "YellowPlayerRun" }],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "YellowJump",
      frames: [{ key: "YellowPlayerJump" }],
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
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "barnacleAttack",
      frames: [{ key: "barnacle" }, { key: "barnacleOpen" }],
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: "BeeAttack",
      frames: [{ key: "bee" }, { key: "beeFlat" }],
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: "FlyAttack",
      frames: [{ key: "fly" }, { key: "flyFlat" }],
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: "gunFire",
      frames: [{ key: "loadedGun" }, { key: "fireGun" }, { key: "loadedGun" }],
      frameRate: 10,
    });

    this.anims.create({
      key: "emptyGun",
      frames: [{ key: "emptyGun" }],
      frameRate: 10,
      yoyo: true,
    });

    this.scene.start("Game");
  }
}
export default PreloadGame;
