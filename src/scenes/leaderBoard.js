export default class leaderBoard {
  baseURL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";

  gameId = "FjBD535dQUhMhYtzbBbE";

  scoreSection = document.getElementById("scores");

  startSection = document.getElementById("start");

  nameForm = document.getElementById("nameForm");

  nameInput = document.getElementById("name");

  scoresData = document.getElementById("scoresData");

  restartBtn = document.getElementById("restartBtn");

  scoresTable = document.getElementById("scoresTable");

  caching = true;

  submitted = false;

  gaming = true;

  cache = [];

  constructor() {
    this.restartBtn.addEventListener("click", this.onRestartBtnClick);
    this.nameForm.addEventListener("submit", this.nameFormSubmit);
    this.handleUserScore();
    this.username = localStorage.getItem("spaceRunUsername");
  }

  onStart = (restartGame) => {
    this.restartGame = restartGame;
    this.startSection.style.display = "grid";
    if (this.username) {
      this.nameInput.value = this.username;
    }
  };

  nameFormSubmit = (event) => {
    event.preventDefault();
    this.username = this.nameInput.value;
    if (this.username) {
      localStorage.setItem("spaceRunUsername", this.username);
      this.onRestartBtnClick();
    }
  };

  sendScore = () => {
    const newRecord = { user: this.username, score: this.userScore };
    this.talkToApi(false, newRecord).then(this.handleUserScore);
  };

  onRestartBtnClick = () => {
    this.submitted = false;
    this.scoreSection.style.display = "none";
    this.startSection.style.display = "none";
    this.gaming = true;
    this.restartGame();
  };

  getLeaderBoard(score) {
    this.gaming = false;
    this.userScore = score;
    if (this.username) {
      this.cache.push({ user: this.username, score: this.userScore });
      this.sendScore();
    }
    this.handleUserScore();
  }

  handleUserScore = () => {
    if (!this.caching && !this.gaming) {
      this.scoreSection.style.display = "grid";
    } else {
      this.caching = false;
    }

    if (this.cache.length) {
      this.arrangeRanks(this.cache);
    }
    this.talkToApi()
      .then((data) => data.result)
      .then(this.arrangeRanks);
  };

  arrangeRanks = (result) => {
    const sortedData = this.sortInDescScores(result);
    const filteredData = this.filterRecords(sortedData);
    const ranks = this.getRanks(filteredData);
    this.displayRanks(ranks);
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

  sortInDescScores = (result) => result.sort((a, b) => b.score - a.score);

  getRanks = (result) =>
    result.map((record, rank) => {
      record.rank = rank + 1;
      return record;
    });

  filterRecords = (result) => {
    const cache = {};
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

    const tr = () => document.createElement("tr");

    if (this.cache.length) {
      this.scoresData.innerHTML = "";
    }

    ranks.forEach((user) => {
      const row = tr();
      const rank = td(user.rank);
      const name = td(user.user);
      const score = td(user.score);
      if (user.user === this.username) {
        row.className = "table-info";
      }
      row.append(rank, name, score);
      this.scoresData.appendChild(row);
    });
  };
}
