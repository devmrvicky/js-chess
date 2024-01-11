// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import { initPieceImgInCell } from "./main";
import pieces from "./pieces";

let moveChance = "white";
const moves = {
  pawn: [],
};

// change chances
const changeChances = async (pieceVariant) => {
  try {
    moveChance = pieceVariant;
    return true;
  } catch (error) {
    return false;
  }
};

const determineNextStepOfPiece = async (pieceData) => {
  const { pieceName, pieceVariant, piecePos } = pieceData.dataset;
  if (pieceName) return null;
  const colNo = Number(piecePos[1]);
  const nextPos = [`${piecePos[0]}${colNo + 1}`, `${piecePos[0]}${colNo + 2}`];
  return nextPos;
};

const clearPreviousTryMove = (cells) => {
  for (let cell of cells) {
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
  // addEventListen to desire pice cell
  cell.addEventListener("click", (e) => {
    const nextPos = determineNextStepOfPiece(e.currentTarget);
    if (!nextPos) return;
    // get all empty cell elements
    const emptyCells = document.querySelectorAll(".emptyCell");
    // clear previous click
    clearPreviousTryMove(emptyCells);
    for (let pos of nextPos) {
      for (let emptyCell of emptyCells) {
        if (pos === emptyCell.id) {
          emptyCell.classList.add("nextPos");
          emptyCell.addEventListener("click", () => {
            const pieceId = cell.dataset.pieceId;
            const pieceInfo = pieces.find((piece) => piece.id === pieceId);
            // console.log(pieceInfo);
            initPieceImgInCell(emptyCell, pieceInfo);
            // reset previous cell
            resetPreviousCell(cell);
          });
        }
      }
    }
  });
};

export default move;

/*
  1. first check white move or dark by default white
  2. which piece choose to move 
      1. if choose pawn and it's first move then give option for two step or if it's diagonal has any opposition then kill that piece and if it's not first move the give one step option to move
      2. if choose rook, it will move straight way
*/
