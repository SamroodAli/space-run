const gameId = "7AFpqYpUFBRMfnxrIuP6";
import Filter from "bad-words";
export default class leaderBoard {
  constructor(userScore) {
    this.userScore = userScore;
  }

  baseURL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";

  fetchConfig = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };

  getScores = async () => {
    const response = await fetch(
      `${baseURL}/games/${gameId}/scores`,
      fetchConfig
    );
    return response.json();
  };

  sortInDescScores = ({ result }) => {
    return result.sort((a, b) => a.score - b.score);
  };

  filterScores = ({ result }) => {
    const scores = {};
    const records = 0;
    const max = 10;
    result.forEach((record) => {
      if (records < max && !scores[record.user]) {
        scores[record.name] = record.score;
        record += 1;
      }
    });
    return scores;
  };
}

// const scoreSection = document.getElementById("scores");
// const nameForm = document.getElementById("nameForm");
// const scoresData = document.getElementById("scoresData");
// const filter = new Filter();
// // scoreSection.style.display = "block";
// // scoresData.innerHTML = "";
