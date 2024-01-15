import { whitePieceElem } from "./capturePieces";
import chessBoardInit from "./chessBoardInit";

const newGameElem = document.querySelector(".new-game");
const playBtnElem = document.querySelector(".play-btn");
const selectTimeElem = document.querySelector("#select-time");
const gameModesElem = document.querySelectorAll(".game-mode");
const chessBoardPrevImgElem = document.querySelector(".chess-board-prev-img");
const gameMovesContainer = document.querySelector("#game-moves-container");

let time = 10;
let gameMode = "head-to-head";
let tableElem;
let abortBtn;

selectTimeElem.addEventListener("change", () => {
  time = selectTimeElem.value;
});

gameModesElem.forEach((gameModeElem) => {
  gameModeElem.addEventListener("click", () => {
    for (let modeElem of gameModesElem) {
      if (modeElem.classList.contains("choosesGameMode")) {
        modeElem.classList.remove("choosesGameMode");
      }
    }
    gameMode = gameModeElem.dataset.gameMode;
    gameModeElem.classList.add("choosesGameMode");
  });
});

// create table
const getMovesTable = () => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = `<tr>
  <th>S. no</th>
  <th>Player 1</th>
  <th>Player 2</th>
</tr>`;
  const tbody = document.createElement("tbody");
  tbody.innerHTML = `<tr>
  <td>__</td>
  <td>__</td>
  <td>__</td>
</tr>`;
  table.append(thead, tbody);
  return table;
};

const getGameStarter = () => {
  const div = document.createElement("div");
  div.className = "new-game";
  div.innerHTML = `
          <h2>New game</h2>
          <div class="set-time">
            <select name="time" id="select-time">
              <option value="no-limit">No limit</option>
              <option value="10">10 min</option>
              <option value="15">15 min</option>
              <option value="20">20 min</option>
              <option value="25">25 min</option>
              <option value="30">30 min</option>
              <option value="60">60 min</option>
            </select>
          </div>
          <div class="game-modes">
            <div class="game-mode choosesGameMode" data-game-mode="head-to-head">
              Head to Head
            </div>
            <div class="game-mode" data-game-mode="vs-computer">
              Vs. Computer
            </div>
            <div class="game-mode" data-game-mode="with-fried">
              With a friend
            </div>
          </div>
          <button type="button" class="play-btn">
            play
          </button>
          <button type="button">Sign up</button>
          <p>Already have an account. <a href="#">Login</a></p>
        
  `;
  return div;
};
const resetGame = () => {
  whitePieceElem.innerHTML = "__";
  whitePieceElem.innerHTML = "__";
  const chessBoardElem = document.querySelector("#chess-board");
  chessBoardElem.innerHTML = "";
  chessBoardElem.append(chessBoardPrevImgElem);
  const gameStart = getGameStarter();
  tableElem.remove();
  abortBtn.remove();
  gameMovesContainer.prepend(gameStart);

  const btn = gameStart.querySelector(".play-btn");
  // console.log(btn);
  btn.addEventListener("click", () => {
    headToHeadGameInit(gameStart);
  });
};

const headToHeadGameInit = (newGameElem) => {
  chessBoardPrevImgElem.remove();
  tableElem = getMovesTable();
  newGameElem.insertAdjacentElement("beforebegin", tableElem);
  // create abort button
  abortBtn = document.createElement("button");
  abortBtn.classList.add("abortBtn");
  abortBtn.append(document.createTextNode("Abort"));
  newGameElem.insertAdjacentElement("beforebegin", abortBtn);
  abortBtn.addEventListener("click", () => {
    resetGame();
  });
  newGameElem.remove();
  chessBoardInit();
  console.log(time, gameMode);
};
playBtnElem.addEventListener("click", () => {
  headToHeadGameInit(newGameElem);
});

export { tableElem, abortBtn };
