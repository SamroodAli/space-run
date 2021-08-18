import leaderBoard from "../../src/scenes/leaderBoard.js";
import Leaderboard from "../../src/scenes/leaderBoard.js";
import document from "../document.js";

const leaderboard = new Leaderboard();
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
    const restartGame = jest.fn();
    expect(leaderboard.onStart(restartGame)).toEqual("grid");
  });

  test("test name form submission to get username", () => {
    document.getElementById("name").value = "Samrood";
    document.getElementById("nameForm").submit();
    expect(leaderboard.username).toEqual("Samrood");
  });
});
