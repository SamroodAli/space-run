import leaderBoard from "../../src/scenes/leaderBoard.js";
import Leaderboard from "../../src/scenes/leaderBoard.js";
import document from "../document.js";

const leaderboard = new Leaderboard();
const restartGame = jest.fn();

describe("testing the leaderboard class methods", () => {
  test("leaderboard construction is valid", () => {
    expect(leaderboard).toBeDefined();
  });

  test("leaderboard is an instance of Leaderboard", () => {
    expect(leaderboard).toBeInstanceOf(Leaderboard);
  });

  test("test menu button event listener should display start section", () => {
    leaderboard.menuBtnclick();
    const startSection = document.getElementById("start");
    expect(startSection.style.display).toEqual("grid");
  });

  test("test onStart function in leaderboard to make start session visible", () => {
    expect(leaderboard.onStart(restartGame));
    const startSection = document.getElementById("start");
    expect(startSection.style.display).toEqual("grid");
  });

  test("test name form submission to get username", () => {
    document.getElementById("name").value = "Samrood";
    document.getElementById("nameForm").submit();
    expect(leaderboard.username).toEqual("Samrood");
  });

  test("expect this.restart to be called in leaderboard on name submission", () => {
    expect(restartGame).toHaveBeenCalled();
  });

  //sendScore

  test("onRestartBtnClick function should call restart game function", () => {
    document.getElementById("restartBtn").click();
    expect(restartGame.mock.calls.length).toEqual(2);
  });

  test("gaming should be true on restart", () => {
    expect(leaderboard.gaming).toBeTruthy();
  });

  test("getLeaderboard should call handleuserscore", () => {
    const newBoard = new Leaderboard();
    newBoard.handleUserScore = jest.fn();
    newBoard.getLeaderBoard();
    expect(newBoard.handleUserScore.mock.calls.length);
  });

  test("handle user score should display score", () => {
    leaderboard.caching = false;
    leaderboard.gaming = false;
    leaderboard.handleUserScore();
    const scoreSection = document.getElementById("scores");
    expect(scoreSection.style.display).toEqual("grid");
  });
});
