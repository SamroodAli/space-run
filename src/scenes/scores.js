import Background from "./background";

class Scores extends Background {
  createText(string, posX, posY, fontSize, fill) {
    const text = this.add.text(
      posX ? posX : gameConfig.width / 2.5,
      posY ? posY : gameConfig.height / 4,
      string,
      {
        fill: fill ? fill : "#000",
        fontSize: fontSize ? fontSize : "40px",
      }
    );
    return text;
  }
}

export default Scores;
