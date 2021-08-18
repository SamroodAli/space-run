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
    expect(leaderboard.menuBtnclick()).toEqual("grid");
  });

  test("test onStart function in leaderboard to make start session visible", () => {
    expect(leaderboard.onStart(restartGame)).toEqual("grid");
  });

  test("test name form submission to get username", () => {
    document.getElementById("name").value = "Samrood";
    document.getElementById("nameForm").submit();
    expect(leaderboard.username).toEqual("Samrood");
  });

  test("expect this.restart to be called in leaderboard on name submission", () => {
    expect(restartGame.mock.calls.length).toEqual(1);
  });
});
