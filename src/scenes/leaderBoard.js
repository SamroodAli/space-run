const gameId = "7AFpqYpUFBRMfnxrIuP6";

const baseURL =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api";

const fetchConfig = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
};

const element = (element, innerHtml) => {
  const newElement = document.createElement(element);
  if (Array.isArray(innerHtml)) {
    newElement.append(...innerHtml);
  } else if (typeof innerHtml === "object") {
    newElement.appendChild(innerHtml);
  } else if (innerHtml) {
    newElement.innerText = innerHtml.toString();
  }
  return newElement;
};

export const tr = (...args) => element("tr", ...args);
export const td = (...args) => element("tr", ...args);

export const getScores = () => {
  fetch(`${baseURL}/games/${gameId}/scores`, fetchConfig)
    .then((response) => response.json())
    .then((data) => displayScores(data.result));
};

const scoreSection = document.getElementById("scores");
const nameForm = document.getElementById("nameForm");
const scoresData = document.getElementById("scoresData");

const displayScores = (result) => {
  result.forEach((record) => {
    scoresData.appendChild(tr([td(record.user), td(record.score)]));
  });
  scoreSection.style.display = "block";
};
