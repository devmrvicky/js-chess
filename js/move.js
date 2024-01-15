// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import { initPieceImgInCell, gameInfoElem, row, col } from "./chessBoardInit";
import pieces from "./pieces";
import { capturePiece } from "./capturePieces";
import { createMovingHistory } from "./movesHistory";

const playersInfoElem = document.querySelectorAll(".player");

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
    bishop: {
      bishop1: [],
      bishop2: [],
    },
    king: [],
    queen: [],
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
    knight: {
      knight1: [],
      knight2: [],
    },
    bishop: {
      bishop1: [],
      bishop2: [],
    },
    king: [],
    queen: [],
  },
};

// class for creating object
class CreatePieceMovingHistoryObj {
  constructor(
    pieceName = null,
    pieceImg = null,
    startingCell = null,
    endingCell = null,
    capturedPice = null,
    capturedPieceImg = null
  ) {
    this.pieceName = pieceName;
    this.pieceImg = pieceImg;
    this.startingCell = startingCell;
    this.endingCell = endingCell;
    this.capturedPice = capturedPice;
    this.capturedPieceImg = capturedPieceImg;
  }
}

// change chances
const changeChances = async () => {
  try {
    if (moveChance === "white") moveChance = "black";
    else moveChance = "white";
    for (let playerInfoElem of playersInfoElem) {
      const { playerVariant, currentMove } = playerInfoElem.dataset;
      if (currentMove) {
        playerInfoElem.removeAttribute("data-current-move");
      }
      if (playerVariant === moveChance) {
        playerInfoElem.setAttribute("data-current-move", "true");
      }
    }
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
  let rowNo = row.indexOf(piecePos[0]);

  let totalMovesOfPawn;
  let movePos = [];
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
    movePos.push(`${piecePos[0]}${colNo}`);
  }
  colNo = Number(piecePos[1]);
  // capture position
  // nextPos.push(
  //   `${row[rowNo - 1]}${colNo + 1}`,
  //   `${row[rowNo + 1]}${colNo + 1}`
  // );
  return {
    movePos,
    capturePos: [
      `${row[rowNo - 1]}${colNo + 1}`,
      `${row[rowNo + 1]}${colNo + 1}`,
    ],
  };
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
    // for (let moveBlockedCell of moveBlockedCells) {
    //   if (nextSinglePos === moveBlockedCell) {
    //     console.log({ nextSinglePos, moveBlockedCell });
    //     return;
    //   }

    // }
  }
  // row position
  for (let rowPos of row) {
    let nextSinglePos = `${rowPos}${piecePos[1]}`;
    if (piecePos !== nextSinglePos) {
      nextPos.push(nextSinglePos);
    }
  }
  // console.log(moveBlockedCells.filter((cell) => cell[0] === piecePos[0]));
  // console.log(nextPos.filter((pos) => moveBlockedCells.includes(pos)));
  return nextPos;
};
// knight
const KnightNextPos = (piecePos) => {
  let colNo = Number(piecePos[1]);
  let rowNo = row.indexOf(piecePos[0]);
  let nextPos = [];

  function colPosOfKnight(dir) {
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
  return nextPos;
};
// bishop
const bishopNextPos = (piecePos) => {
  let colNo = Number(piecePos[1]);
  let rowNo = row.indexOf(piecePos[0]);
  let nextPos = [];
  const upperMovesPos = (dir) => {
    let temp = colNo - 1;
    while (temp >= 1) {
      if (dir === "left") {
        rowNo--;
      } else if (dir === "right") {
        rowNo++;
      }
      let nextSinglePos = `${row[rowNo]}${temp}`;
      nextPos.push(nextSinglePos);
      temp--;
    }
    rowNo = row.indexOf(piecePos[0]);
  };

  const downMovesPos = (dir) => {
    let temp = colNo + 1;
    while (temp <= 8) {
      if (dir === "left") {
        rowNo--;
      } else if (dir === "right") {
        rowNo++;
      }
      let nextSinglePos = `${row[rowNo]}${temp}`;
      nextPos.push(nextSinglePos);
      temp++;
    }
    rowNo = row.indexOf(piecePos[0]);
  };
  // upper left
  upperMovesPos("left");
  upperMovesPos("right");
  downMovesPos("left");
  downMovesPos("right");
  return nextPos;
};
// queen
const queenNextPos = (piecePos) => [
  ...bishopNextPos(piecePos),
  ...rookNextPos(piecePos),
];
// king
const kingNextPos = (piecePos) => {
  const colNo = Number(piecePos[1]);
  let rowNo = row.indexOf(piecePos[0]);
  const nextPos = [];
  nextPos.push(`${piecePos[0]}${colNo + 1}`, `${piecePos[0]}${colNo - 1}`);
  function moveColDir(dir) {
    if (dir === "left") {
      rowNo--;
    } else if (dir === "right") {
      rowNo++;
    }
    let temp = colNo - 1;
    while (temp <= colNo + 1) {
      nextPos.push(`${row[rowNo]}${temp}`);
      temp++;
    }
    rowNo = row.indexOf(piecePos[0]);
  }
  // left
  moveColDir("left");
  // right
  moveColDir("right");
  return nextPos;
};

const determineNextStepOfPiece = async (pieceData, moveBlockedCells) => {
  const { pieceName, pieceVariant, piecePos, pieceId } = pieceData.dataset;
  if (!pieceId) return null;
  console.log(
    `you clicked on ${pieceVariant} ${pieceName} that is on ${piecePos}`
  );
  if (pieceName && pieceVariant !== moveChance) {
    // alert(moveChance + " move");
    return;
  }
  const moveBlockedCellsId = moveBlockedCells
    .map((cellElem) => piecePos !== cellElem.id && cellElem.id)
    .filter((cellId) => cellId);

  let nextPos;
  if (pieceName === "pawn") {
    nextPos = pawnNextPos(piecePos, pieceId.split("-")[1], pieceVariant);
  } else if (pieceName === "rook") {
    nextPos = rookNextPos(piecePos, moveBlockedCellsId);
    // console.log(nextPos);
  } else if (pieceName === "knight") {
    nextPos = KnightNextPos(piecePos);
  } else if (pieceName === "bishop") {
    nextPos = bishopNextPos(piecePos);
  } else if (pieceName === "queen") {
    nextPos = queenNextPos(piecePos);
  } else if (pieceName === "king") {
    nextPos = kingNextPos(piecePos);
  }
  console.log(pieceName + " next poses " + nextPos);
  return nextPos;
};

const clearPreviousTryMove = (cells) => {
  // console.log(cells);
  for (let cell of cells) {
    if (cell.classList.contains("nextPos")) {
      cell.classList.remove("nextPos");
    }
  }
};

// reset previous cell that had piece
const resetPreviousCell = async (cell) => {
  try {
    cell.classList.add("emptyCell");
    cell.removeAttribute("data-piece-name");
    cell.removeAttribute("data-piece-variant");
    cell.removeAttribute("data-piece-pos");
    cell.removeAttribute("data-piece-id");
    cell.removeAttribute("data-piece-available");
    cell.children[0].remove();
    return true;
  } catch (error) {
    console.log("unable to reset previous cell :: ", error.message);
    return false;
  }
};

// update moves history
const updateMovesHistory = (movedPieceData) => {
  const { pieceName, pieceVariant, piecePos, pieceId } = movedPieceData;
  if (pieceName === "king" || pieceName === "queen") {
    moves[pieceVariant][pieceName].push(piecePos);
  } else {
    moves[pieceVariant][pieceName][pieceId.split("-")[1]].push(piecePos);
  }
};

const move = (cell) => {
  // addEventListen to desire pice cell
  cell.addEventListener("click", async (e) => {
    try {
      // cell.classList.add("selectedCell");
      const piecesContainCells = Array.from(
        document.querySelectorAll('[data-piece-available="true"]')
      );

      const nextPos = await determineNextStepOfPiece(
        e.currentTarget,
        piecesContainCells
      );
      if (!nextPos) return;

      // get all empty cell elements
      const emptyCells = document.querySelectorAll(".emptyCell");
      // clear previous click
      clearPreviousTryMove(emptyCells);

      let possibleMovesOfPice = nextPos;
      let possibleCaptureMoves = nextPos;
      if (cell.dataset.pieceName === "pawn") {
        possibleMovesOfPice = nextPos.movePos;
        possibleCaptureMoves = nextPos.capturePos;
      }
      for (let possibleMove of possibleMovesOfPice) {
        for (let emptyCell of emptyCells) {
          if (possibleMove === emptyCell.id) {
            emptyCell.classList.add("nextPos");
            emptyCell.addEventListener("click", async () => {
              // move piece in empty cell
              await capturePieceOrMove(cell, emptyCell, emptyCells);
            });
          }
        }
      }

      // for capture pieces
      // if (cell.dataset.pieceVariant === moveChance) return;
      capturePiece(piecesContainCells, cell, possibleCaptureMoves);
    } catch (error) {
      console.log(error.message);
    }
  });
};

// capture piece if there are opposite piece available or move piece
const capturePieceOrMove = async (
  cell,
  targetCell,
  targetCells,
  capture = false
) => {
  try {
    const { pieceId, pieceName, piecePos } = cell.dataset;
    const pieceInfo = pieces.find((piece) => piece.id === pieceId);
    // console.log(pieceInfo);
    if (targetCell.children[0] && capture) {
      targetCell.children[0].remove();
    }
    const pieceMoved = await initPieceImgInCell(targetCell, pieceInfo);
    if (pieceMoved) {
      clearPreviousTryMove(targetCells);
      // update pieces moves history
      updateMovesHistory(cell.dataset);
      // reset previous cell
      const isResetPrevCell = await resetPreviousCell(cell);
      // toggle move chance
      const chanceChanged = await changeChances();
      if (chanceChanged) {
        // console.log(gameInfoElem);
        // gameInfoElem.children[0].remove();
        // gameInfoElem.append(document.createTextNode(moveChance));
        gameInfoElem.textContent = moveChance;
        // create piece moving history data object
        const pieceMovingDataObj = new CreatePieceMovingHistoryObj(
          pieceName,
          pieceInfo.img,
          piecePos,
          targetCell.dataset.piecePos
        );
        // update moves history
        createMovingHistory(pieceMovingDataObj);
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export default move;
export { capturePieceOrMove, playersInfoElem };
