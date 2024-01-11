// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import pieces from "./pieces";
import move from "./move";

const chessBoardElem = document.querySelector("#chess-board");

const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
const col = [1, 2, 3, 4, 5, 6, 7, 8];
let filledBlocks = false;

const fillCell = (cellName, cellElem) => {
  if (
    cellName === "A2" ||
    cellName === "A4" ||
    cellName === "A6" ||
    cellName === "A8"
  )
    filledBlocks = true;
  if (
    cellName === "A1" ||
    cellName === "A3" ||
    cellName === "A5" ||
    cellName === "A7"
  )
    filledBlocks = false;
  if (filledBlocks) {
    cellElem.classList.add("filledBlock");
    filledBlocks = false;
  } else {
    filledBlocks = true;
  }
};

const getCellDimension = () => {
  const chessBoardHeight = chessBoardElem.clientHeight;
  const chessBoardWidth = chessBoardElem.clientWidth;
  const blockWidth = chessBoardWidth / row.length;
  const blockHeight = chessBoardHeight / col.length;
  return { blockWidth, blockHeight };
};

// create img
const initPieceImgInCell = async (cell, piece) => {
  try {
    cell.classList.remove("emptyCell");
    cell.setAttribute("data-piece-name", piece.name);
    cell.setAttribute("data-piece-variant", piece.id.split("-")[0]);
    cell.setAttribute("data-piece-pos", cell.id);
    cell.setAttribute("data-piece-id", piece.id);
    // create img
    const img = new Image(40);
    img.src = piece.img;
    img.title = piece.name;
    cell.append(img);
    return true;
  } catch (error) {
    console.error(error.message);
  }
};

const arrangePieces = async (cell) => {
  try {
    for (let piece of pieces) {
      if (piece.pos === cell.id) {
        await initPieceImgInCell(cell, piece);
      }
    }
    // piece moves (for checking move logic go to move.js file)
    move(cell);
  } catch (error) {
    console.error(error.message);
  }
};

const createOneContainerRowOfCells = (
  rowElements,
  cellWidth = false,
  cellHeight = false,
  colElem = null
) => {
  const cellsContainerRow = document.createElement("div");
  const fragment = document.createDocumentFragment();
  const { blockWidth, blockHeight } = getCellDimension();
  for (let rowElem of rowElements) {
    const cell = document.createElement("div");
    let uniqueCellName;
    if (!colElem) {
      // this only for row and col indexes
      uniqueCellName = rowElem;
      cell.append(document.createTextNode(uniqueCellName));
    } else {
      uniqueCellName = rowElem + colElem;
      // fill cell (fill cell background)
      fillCell(uniqueCellName, cell);
    }
    // create pieces cell meta data like title, id etc.
    cell.title = uniqueCellName;
    cell.id = uniqueCellName;
    cell.classList.add("cell");
    // here  if cellWidth and cellHeight are both true means this cell contain any of piece
    if (cellWidth && cellHeight) {
      cell.classList.add("emptyCell");
    }
    // if only cellWidth true means it is index row
    if (cellWidth) {
      cellsContainerRow.classList.add("row");
      cell.style.width = blockWidth + "px";
    }
    // and only if cellHeight is true means it is index col
    if (cellHeight) {
      cellsContainerRow.classList.add("col");
      cell.style.height = blockHeight + "px";
    }
    fragment.append(cell);

    // arrange pieces on it's initial phase
    // we call arrangePieces function here because we got cell element here
    arrangePieces(cell);
  }
  cellsContainerRow.append(fragment);
  return cellsContainerRow;
};

const createIndex = (cellWidth = false, cellHeight = false) => {
  let indexElem;
  // if only cellWidth true means it is index row
  if (cellWidth) {
    indexElem = createOneContainerRowOfCells(row, cellWidth, cellHeight);
  }
  // and only if cellHeight is true means it is index col
  if (cellHeight) {
    indexElem = createOneContainerRowOfCells(col, cellWidth, cellHeight);
  }
  chessBoardElem.insertAdjacentElement("beforebegin", indexElem);
};

const createAllContainerRowsOfCells = () => {
  const fragment = document.createDocumentFragment();
  for (let colElem of col) {
    const elem = createOneContainerRowOfCells(row, true, true, colElem);
    fragment.append(elem);
  }
  chessBoardElem.append(fragment);
};

const gameInit = () => {
  if (chessBoardElem.children.length) return;
  createAllContainerRowsOfCells();
  createIndex(true, false);
  createIndex(false, true);
};

window.addEventListener("DOMContentLoaded", () => {
  gameInit();
});

export { initPieceImgInCell };
