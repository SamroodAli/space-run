const gameId = "7AFpqYpUFBRMfnxrIuP6";
import Filter from "bad-words";
export default class leaderBoard {
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
  scoreSection = document.getElementById("scores");
  nameForm = document.getElementById("nameForm");
  scoresData = document.getElementById("scoresData");
  filter = new Filter();

  constructor(userScore) {
    this.userScore = userScore;
    this.getScores()
      .then(this.sortInDescScores)
      .then(this.getRanks)
      .then(this.displayRanks);
  }

  getScores = async () => {
    const response = await fetch(
      `${this.baseURL}/games/${this.gameId}/scores`,
      this.fetchConfig
    );
    return response.json();
  };

  sortInDescScores = ({ result }) => {
    return result.sort((a, b) => a.score - b.score);
  };

  getRanks = (result) => {
    const cache = {};
    const scores = [];
    let ranks = 0;
    const max = 10;
    result.forEach((record) => {
      if (ranks < max && !cache[record.user]) {
        if (this.userScore > record.score) {
          const name = "Samrood"; //get name
          cache[record.name] = this.userScore;
          ranks += 1;
          scores.push({ name, score: this.userScore, rank: ranks });
        }
        cache[record.name] = record.score;
        scores.push(record);
        ranks += 1;
        record.rank = ranks;
      }
    });
    return scores;
  };

  displayRanks = (ranks) => {
    const td = (data) => {
      const td = document.createElement("td");
      td.textContent = data;
      return td;
    };

    const tr = () => {
      return document.createElement("tr");
    };
    console.log(ranks);
    this.scoresData.innerHTML = "";
    ranks.forEach((user) => {
      const row = tr();
      const rank = td(user.rank);
      const name = td(user.user);
      const score = td(user.score);
      row.append(rank, name, score);
      this.scoresData.appendChild(row);
    });
    this.scoreSection.style.display = "block";
  };
}
