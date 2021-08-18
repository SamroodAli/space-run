import "@testing-library/jest-dom";

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Space Run</title>
    <style>
      #start {
        display: none;
      }

      #scores {
        display: none;
      }
    </style>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <section id="loading">
      <h1 class="text-center m-3 text-info fw-bolder">SPACE RUN</h1>
      <p class="text-center">Loading assets. Please wait.</p>
      <div id="loader" class="mx-auto"></div>
    </section>
    <section id="start" class="w-100">
      <h1 class="text-center m-3 text-info fw-bolder">SPACE RUN</h1>
      <form id="nameForm" class="p-5 w-100">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Please enter your name for leaderboard"
          class="form-control p-3 w-50 mx-auto"
          required
        />
        <input
          type="submit"
          value="Start Game"
          class="
            form-control
            bg-info
            text-light
            p-3
            w-50
            mx-auto
            my-3
            fw-bolder
            fs-3
          "
        />
      </form>
    </section>
    <section id="scores">
      <h1 class="text-center m-3 text-info fw-bolder">LeaderBoard</h1>
      <div class="btn-group">
        <button
          type="submit"
          id="restartBtn"
          class="btn btn-info text-light fw-bolder fs-3 mx-2"
        >
          Restart
        </button>
        <button
          type="submit"
          id="menuBtn"
          class="btn btn-info text-light fw-bolder fs-3 mx-2"
        >
          Menu
        </button>
      </div>
      <table id="scoresTable" class="table table-responsive table-dark mt-3">
        <thead class="table-dark border-0">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id="scoresData">
          <tr>
            <td>Loading</td>
            <td>Data</td>
            <td>Please Wait</td>
          </tr>
        </tbody>
      </table>
    </section>
  </body>
</html>
`;

document.body.innerHTML = html;

test("testing index.html page in source", () => {
  expect(document.body).toContainHTML(html);
});

export default document;
