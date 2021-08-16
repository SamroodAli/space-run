import "./style.scss";
import Phaser from "phaser";
import { gameConfig } from "./gameOptions.js";
import Game from "./scenes/game.js";
import Main from "./scenes/main.js";
import PreloadGame from "./scenes/preload.js";

gameConfig.scene = [PreloadGame, Main, Game];

export default new Phaser.Game(gameConfig);
