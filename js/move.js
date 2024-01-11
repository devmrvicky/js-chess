// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import { initPieceImgInCell } from "./main";
import pieces from "./peices";

const moves = {
  pawn: [],
};

const determineNextStepOfPiece = (data) => {
  const { pieceName, pieceVariant, piecePos } = data.dataset;
  if (!pieceName) return null;
  const colNo = Number(piecePos[1]);
  const nextPos = [`${piecePos[0]}${colNo + 1}`, `${piecePos[0]}${colNo + 2}`];
  return nextPos;
};

const clearPreviousTryMove = (cells) => {
  for (let cell of cells) {
    // console.log(cell);
    if (cell.classList.contains("nextPos")) {
      cell.classList.remove("nextPos");
    }
  }
};

const resetPreviousCell = (cell) => {
  cell.classList.add("emptyCell");
  cell.removeAttribute("data-piece-name");
  cell.removeAttribute("data-piece-variant");
  cell.removeAttribute("data-piece-pos");
  cell.removeAttribute("data-piece-id");
  cell.children[0].remove();
};

const move = (cell) => {
  // addEventListen
  cell.addEventListener("click", (e) => {
    // pawn moves condition
    /*
      1. check if it is black or white piece - white
      2. check if it is new in move or it have moved once
      3. if new it will move two step or one step
    */

    if (!moves.pawn.length) {
      // console.log("first move of pawn");
    } else {
      // console.log("pawn moved once already");
    }
    const nextPos = determineNextStepOfPiece(e.currentTarget);

    // get all empty cell elements
    const cells = document.querySelectorAll(".emptyCell");

    // clear previous click
    clearPreviousTryMove(cells);
    if (!nextPos) return;
    for (let pos of nextPos) {
      for (let cellElem of cells) {
        if (pos === cellElem.id) {
          cellElem.classList.add("nextPos");
          cellElem.addEventListener("click", () => {
            const pieceId = cell.dataset.pieceId;
            const pieceInfo = pieces.find((piece) => piece.id === pieceId);
            initPieceImgInCell(cellElem, pieceInfo);
            // reset previous cell
            resetPreviousCell(cell);
          });
        }
      }
    }
  });
};

export default move;
