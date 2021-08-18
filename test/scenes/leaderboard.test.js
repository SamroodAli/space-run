import Leaderboard from "../../src/scenes/leaderBoard.js";
import document from "../document.js";

const leaderboard = new Leaderboard();
const restartGame = jest.fn();
const result = [
  { score: 1000, user: "samrood" },
  { score: 2000, user: "leon" },
  { score: 900, user: "samrood" },
];
const sortedResult = [
  { rank: 1, score: 2000, user: "leon" },
  { rank: 2, score: 1000, user: "samrood" },
  { score: 900, user: "samrood" },
];

const filteredResult = [
  { rank: 1, score: 2000, user: "leon" },
  { rank: 2, score: 1000, user: "samrood" },
];

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

  test("arrangeRanks should should call sort in desc scores", () => {
    const newBoard = new Leaderboard();
    newBoard.sortInDescScores = jest.fn(() => []);
    newBoard.arrangeRanks();
    expect(newBoard.sortInDescScores).toHaveBeenCalled();
  });

  test("arrangeRanks should should call filter records", () => {
    const newBoard = new Leaderboard();
    newBoard.filterRecords = jest.fn(() => []);
    newBoard.arrangeRanks([]);
    expect(newBoard.filterRecords).toHaveBeenCalled();
  });

  test("arrangRanks should should call getRanks records", () => {
    const newBoard = new Leaderboard();
    newBoard.getRanks = jest.fn(() => []);
    newBoard.arrangeRanks([]);
    expect(newBoard.getRanks).toHaveBeenCalled();
  });

  test("sort in desc order should sort scores in desc order", () => {
    const ranks = leaderboard.arrangeRanks(result);
    expect(ranks).toEqual(filteredResult);
  });

  test("sort in desc scores should sort scores in desc order", () => {
    const ranks = leaderboard.sortInDescScores(result);
    expect(ranks).toEqual(sortedResult);
  });

  test("filter records filters redundant names", () => {
    const ranks = leaderboard.filterRecords(sortedResult);
    expect(ranks).toEqual(filteredResult);
  });

  test("display Ranks function should display ranks in table", () => {
    leaderboard.displayRanks(filteredResult);
    const scoresData = document.getElementById("scoresData");
    expect(scoresData.innerHTML).toEqual(
      "<tr><td>1</td><td>leon</td><td>2000</td></tr><tr><td>2</td><td>samrood</td><td>1000</td></tr>"
    );
  });
});
