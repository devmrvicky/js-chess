// app.js
if (import.meta.hot) {
  import.meta.hot.accept();
}

import pieces from "./peices";
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
const initPieceImgInCell = (cell, piece) => {
  cell.classList.remove("emptyCell");
  cell.setAttribute("data-piece-name", piece.name);
  cell.setAttribute("data-piece-variant", piece.id.split("-")[0]);
  cell.setAttribute("data-piece-pos", cell.id);
  cell.setAttribute("data-piece-id", piece.id);
  const img = new Image(40);

  img.src = piece.img;
  img.title = piece.name;
  cell.append(img);
};

const arrangePieces = (cell) => {
  for (let piece of pieces) {
    if (piece.pos === cell.id) {
      initPieceImgInCell(cell, piece);
    }
  }
  move(cell);
};

const createCells = (
  rowElements,
  isRowCell = false,
  isColCell = false,
  colElem = null
) => {
  const cellsContainer = document.createElement("div");
  const fragment = document.createDocumentFragment();
  const { blockWidth, blockHeight } = getCellDimension();
  for (let rowElem of rowElements) {
    const cell = document.createElement("div");
    let uniqueName;
    if (!colElem) {
      uniqueName = rowElem;
      cell.append(document.createTextNode(uniqueName));
    } else {
      uniqueName = rowElem + colElem;
      // fill cell
      fillCell(uniqueName, cell);
    }
    cell.title = uniqueName;
    cell.id = uniqueName;
    cell.classList.add("cell");
    if (isRowCell && isColCell) {
      cell.classList.add("emptyCell");
    }
    if (isRowCell) {
      cellsContainer.classList.add("row");
      cell.style.width = blockWidth + "px";
    }
    if (isColCell) {
      cellsContainer.classList.add("col");
      cell.style.height = blockHeight + "px";
    }
    fragment.append(cell);

    // arrange pieces
    arrangePieces(cell);
  }
  cellsContainer.append(fragment);
  return cellsContainer;
};

const createIndex = (isRowCell = false, isColCell = false) => {
  let indexElem;
  if (isRowCell) {
    indexElem = createCells(row, isRowCell, isColCell);
  }
  if (isColCell) {
    indexElem = createCells(col, isRowCell, isColCell);
  }
  chessBoardElem.insertAdjacentElement("beforebegin", indexElem);
};

const createBlocks = () => {
  const fragment = document.createDocumentFragment();
  for (let colElem of col) {
    const elem = createCells(row, true, true, colElem);
    fragment.append(elem);
  }
  chessBoardElem.append(fragment);
};

const gameInit = () => {
  if (chessBoardElem.children.length) return;
  createBlocks();
  createIndex(true, false);
  createIndex(false, true);
};

window.addEventListener("DOMContentLoaded", () => {
  gameInit();
});

export { initPieceImgInCell };
