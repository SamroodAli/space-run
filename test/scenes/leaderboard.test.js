import Leaderboard from "../../src/scenes/leaderBoard.js";
import document from "../document.js";

describe("testing the leaderboard class methods", () => {
  test("leaderboard construction is valid", () => {
    const leaderboard = new Leaderboard();
    expect(leaderboard).toBeDefined();
  });
});
