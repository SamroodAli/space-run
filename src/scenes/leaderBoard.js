import Filter from "bad-words";
export default class leaderBoard {
  baseURL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";
  gameId = "7AFpqYpUFBRMfnxrIuP6";

  scoreSection = document.getElementById("scores");
  nameForm = document.getElementById("nameForm");
  nameInput = document.getElementById("name");
  scoresData = document.getElementById("scoresData");
  restartBtn = document.getElementById("restartBtn");
  scoresTable = document.getElementById("scoresTable");
  caching = true;
  submitted = false;
  gaming = true;

  constructor() {
    this.restartBtn.addEventListener("click", this.onRestartBtnClick);
    this.nameForm.addEventListener("submit", this.nameFormSubmit);
    this.handleUserScore();
  }

  onStart = () => {};

  nameFormSubmit = (event) => {
    event.preventDefault();
    this.userName = this.nameInput.value;
  };

  sendScore = () => {
    const newRecord = { user: this.userName, score: this.userScore };
    this.talkToApi(false, newRecord).then(this.handleUserScore);
    this.submit;
  };

  onRestartBtnClick = () => {
    this.submitted = false;
    this.scoreSection.style.display = "none";
    this.gaming = true;
    s;
    this.restartGame();
  };

  filter = new Filter();
  cache = [];

  init(score, restartGame) {
    this.gaming = false;
    if (this.userName) {
      this.sendScore();
      this.nameInput.value = this.userName;
    }
    this.userScore = score;
    this.restartGame = restartGame;
    this.handleUserScore();
  }

  handleUserScore = () => {
    if (!this.caching && !this.gaming) {
      this.scoreSection.style.display = "grid";
    } else {
      this.caching = false;
    }
    if (this.cache) {
      this.displayRanks(this.cache);
    }
    this.talkToApi()
      .then(this.sortInDescScores)
      .then(this.filterRecords)
      .then(this.getRanks)
      .then(this.displayRanks);
  };

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

  getRanks = (result) => {
    return result.map((record, rank) => {
      record.rank = rank + 1;
      return record;
    });
  };

  filterRecords = (result) => {
    let cache = {};
    const ranks = result.filter((record) => {
      const isUnique = !cache[record.user];
      cache[record.user] = true;
      return isUnique;
    });
    this.cache = ranks;
    return ranks;
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
    if (this.cache.length) {
      this.scoresData.innerHTML = "";
    }
    ranks.forEach((user) => {
      const row = tr();
      const rank = td(user.rank);
      const name = td(user.user);
      const score = td(user.score);
      row.append(rank, name, score);
      this.scoresData.appendChild(row);
    });
  };
}
