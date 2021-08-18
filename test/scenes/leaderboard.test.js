import leaderBoard from "../../src/scenes/leaderBoard.js";
import Leaderboard from "../../src/scenes/leaderBoard.js";
import document from "../document.js";

describe("testing the leaderboard class methods", () => {
  test("leaderboard construction is valid", () => {
    const leaderboard = new Leaderboard();
    expect(leaderboard).toBeDefined();
  });

  test("leaderboard is an instance of Leaderboard", () => {
    const leaderboard = new Leaderboard();
    expect(leaderboard).toBeInstanceOf(Leaderboard);
  });

  test("test menu button event listener should display start section", () => {
    const leaderboard = new Leaderboard();
    expect(leaderboard.menuBtnclick()).toEqual("grid");
  });
});
