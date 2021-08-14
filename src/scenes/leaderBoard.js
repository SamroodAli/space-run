const gameId = "7AFpqYpUFBRMfnxrIuP6";
import Filter from "bad-words";
export default class leaderBoard {
  baseURL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";

  scoreSection = document.getElementById("scores");
  nameForm = document.getElementById("nameForm");
  scoresData = document.getElementById("scoresData");
  filter = new Filter();
  cache = [];

  init(score) {
    this.userScore = score;
    this.handleUserScore();
  }

  handleUserScore() {
    this.talkToApi()
      .then(this.sortInDescScores)
      .then(this.getRanks)
      .then(this.displayRanks);
  }

  talkToApi = async (get = true, data) => {
    const fetchConfig = {
      method: get ? "GET" : "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${this.baseURL}/games/${this.gameId}/scores`,
      fetchConfig
    );
    return response.json();
  };

  sortInDescScores = ({ result }) => {
    return result.sort((a, b) => b.score - a.score);
  };

  postResult = () => {};

  getRanks = (result) => {
    return result.map((record, rank) => {
      record.rank = rank;
      return record;
    });
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
    this.scoreSection.style.display = "grid";
  };
}
