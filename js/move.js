// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import { initPieceImgInCell, row, col } from "./main";
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
    rook: {
      rook1: [],
      rook2: [],
    },
    knight: {
      knight1: [],
      knight2: [],
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
    rook: {
      rook1: [],
      rook2: [],
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
// pawn
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
// rook
const rookNextPos = (piecePos, moveBlockedCells) => {
  // console.log(moveBlockedCells);
  const nextPos = [];
  // col position
  for (let colPos of col) {
    let nextSinglePos = `${piecePos[0]}${colPos}`;
    if (piecePos !== nextSinglePos) {
      nextPos.push(nextSinglePos);
    }
  }
  // row position
  for (let rowPos of row) {
    let nextSinglePos = `${rowPos}${piecePos[1]}`;
    if (piecePos !== nextSinglePos) {
      nextPos.push(nextSinglePos);
    }
  }
  // console.log(nextPos);
  return nextPos.filter((pos) => !moveBlockedCells.includes(pos));
};
// knight
const KnightNextPos = (piecePos) => {
  let colNo = Number(piecePos[1]);
  let rowNo = row.indexOf(piecePos[0]);
  let nextPos = [];

  function colPosOfKnight(dir) {
    console.log(dir);
    let temp;
    if (dir === "up") {
      temp = Math.abs(colNo - 2);
    } else if (dir === "down") {
      temp = Math.abs(colNo + 2);
    }
    const leftMove = `${row[rowNo - 1]}${temp}`;
    const rightMove = `${row[rowNo + 1]}${temp}`;
    nextPos = [...nextPos, leftMove, rightMove];
  }

  if (colNo >= 3) {
    colPosOfKnight("up");
  }
  if (colNo <= 6) {
    colPosOfKnight("down");
  }
  function rowPosOfKnight(dir) {
    let temp;
    if (dir === "right") {
      temp = rowNo + 2;
    } else if (dir === "left") {
      temp = rowNo - 2;
    }
    const upMove = `${row[temp]}${colNo + 1}`;
    const downMove = `${row[temp]}${colNo - 1}`;
    nextPos = [...nextPos, upMove, downMove];
  }
  if (rowNo >= 2) {
    rowPosOfKnight("left");
  }
  if (rowNo <= 5) {
    rowPosOfKnight("right");
  }
  console.log(nextPos);
  return nextPos;
};
// bishop
const bishopNextPos = (piecePos) => {
  let colNo = Number(piecePos[1]);
  let rowNo = row.indexOf(piecePos[0]);
  let nextPos = [];
  // if (colNo > 1) {
  // go upper left
  let temp = colNo - 1;
  while (temp >= 1) {
    rowNo--;
    console.log({ temp, rowNo });
    let nextSinglePos = `${row[rowNo]}${temp}`;
    nextPos.push(nextSinglePos);
    temp--;
  }
  let temp2 = colNo + 1;
  while (temp2 <= 8) {
    rowNo++;
    console.log({ temp, rowNo });
    let nextSinglePos = `${row[rowNo]}${temp2}`;
    nextPos.push(nextSinglePos);
    temp2++;
  }
  // }
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
  const moveBlockedCells = Array.from(
    document.querySelectorAll('[data-piece-available="true"]')
  )
    .map((cellElem) => piecePos !== cellElem.id && cellElem.id)
    .filter((cellId) => cellId);
  let nextPos;
  if (pieceName === "pawn") {
    nextPos = pawnNextPos(piecePos, pieceId.split("-")[1], pieceVariant);
  } else if (pieceName === "rook") {
    nextPos = rookNextPos(piecePos, moveBlockedCells);
    // console.log(nextPos);
  } else if (pieceName === "knight") {
    nextPos = KnightNextPos(piecePos);
  } else if (pieceName === "bishop") {
    nextPos = bishopNextPos(piecePos);
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

// reset previous cell that had piece
const resetPreviousCell = (cell) => {
  cell.classList.add("emptyCell");
  cell.removeAttribute("data-piece-name");
  cell.removeAttribute("data-piece-variant");
  cell.removeAttribute("data-piece-pos");
  cell.removeAttribute("data-piece-id");
  cell.removeAttribute("data-piece-available");
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
              const pieceMoved = await initPieceImgInCell(emptyCell, pieceInfo);
              if (pieceMoved) {
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
          break;
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
