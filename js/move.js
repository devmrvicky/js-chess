// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import { initPieceImgInCell } from "./main";
import pieces from "./pieces";

let moveChance = "white";
const moves = {
  white: {
    pawn: {
      pawn1: [],
      pawn2: [],
      pawn3: [],
      pawn4: [],
      pawn5: [],
      pawn6: [],
      pawn7: [],
      pawn8: [],
    },
  },
  black: {
    pawn: {
      pawn1: [],
      pawn2: [],
      pawn3: [],
      pawn4: [],
      pawn5: [],
      pawn6: [],
      pawn7: [],
      pawn8: [],
    },
  },
};

// change chances
const changeChances = async () => {
  try {
    if (moveChance === "white") moveChance = "black";
    else moveChance = "white";
    console.log(moveChance);
    return true;
  } catch (error) {
    return false;
  }
};

// all pieces next pos logic
const pawnNextPos = (piecePos, pieceId, pieceVariant) => {
  let colNo = Number(piecePos[1]);
  let totalMovesOfPawn;
  let nextPos = [];
  // check if pawn's first move or not
  if (moves[moveChance].pawn[pieceId].length) {
    totalMovesOfPawn = 1;
  } else {
    totalMovesOfPawn = 2;
  }
  for (let i = 1; i <= totalMovesOfPawn; i++) {
    if (pieceVariant === "white") {
      colNo++;
    } else {
      colNo--;
    }
    nextPos.push(`${piecePos[0]}${colNo}`);
  }
  // one condition left that is opponent piece kill condition
  return nextPos;
};

const determineNextStepOfPiece = async (pieceData) => {
  const { pieceName, pieceVariant, piecePos, pieceId } = pieceData.dataset;
  console.log(
    `you clicked on ${pieceVariant} ${pieceName} that is on ${piecePos}`
  );
  if (pieceName && pieceVariant !== moveChance) {
    alert(moveChance + " move");
    return;
  }
  let nextPos;
  if (pieceName === "pawn") {
    nextPos = pawnNextPos(piecePos, pieceId.split("-")[1], pieceVariant);
  }
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

// update moves history
const updateMovesHistory = (movedPieceData) => {
  const { pieceName, pieceVariant, piecePos, pieceId } = movedPieceData;
  moves[pieceVariant][pieceName][pieceId.split("-")[1]].push(piecePos);
};

const move = (cell) => {
  // addEventListen to desire pice cell
  cell.addEventListener("click", async (e) => {
    const nextPos = await determineNextStepOfPiece(e.currentTarget);
    if (!nextPos) return;

    // get all empty cell elements
    const emptyCells = document.querySelectorAll(".emptyCell");
    // clear previous click
    clearPreviousTryMove(emptyCells);
    for (let pos of nextPos) {
      for (let emptyCell of emptyCells) {
        if (pos === emptyCell.id) {
          emptyCell.classList.add("nextPos");
          emptyCell.addEventListener("click", async () => {
            try {
              const pieceId = cell.dataset.pieceId;
              const pieceInfo = pieces.find((piece) => piece.id === pieceId);
              // console.log(pieceInfo);
              const cellMoved = await initPieceImgInCell(emptyCell, pieceInfo);
              if (cellMoved) {
                clearPreviousTryMove(emptyCells);
                // update pieces moves history
                updateMovesHistory(cell.dataset);
                // reset previous cell
                resetPreviousCell(cell);
                // toggle move chance
                await changeChances();
              }
            } catch (error) {
              console.log(error.message);
            }
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
