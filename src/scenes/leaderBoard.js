const gameId = "7AFpqYpUFBRMfnxrIuP6";

const baseURL =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";

function getScores() {
  fetch(`${baseURL}/games/scores`).then(console.log);
}
