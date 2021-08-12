import Game from "./scenes/game.js";
import PreloadGame from "./scenes/preload.js";
import Phaser from "phaser";

export const gameOptions = {
  platformSpeedRange: [400, 500],
  mountainSpeed: 80,
  laserSpeed: 800,
  reloadTime: 1500,
  spawnRange: [80, 250],
  platformSizeRange: [90, 300],
  platformHeightRange: [-5, 5],
  platformHeightScale: 10,
  platformVerticalLimit: [0.4, 0.7],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
  coinPercent: 40,
  barnaclePercent: 10,
  enemyPercent: () => Phaser.Math.Between(0, 500) < 1,
};

gamePoints = {
  distance: 1,
  barnacle: 2000,
  kill: 5000,
  coin: 10000,
};

export const gameConfig = {
  type: Phaser.Auto,
  width: screen.availWidth,
  height: screen.availHeight,
  scene: [PreloadGame, Game],
  physics: {
    default: "arcade",
  },
};
