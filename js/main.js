const chessBoardContainer = document.querySelector("#chess-board-container");
const chessBoardElem = document.querySelector("#chess-board");

const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
const col = [1, 2, 3, 4, 5, 6, 7, 8];
let noOfStipes = 8;
let filledBlocks = false;

const fillBlock = (blockNo, blockElem) => {
  if (blockNo === 9 || blockNo === 25 || blockNo === 41 || blockNo === 57)
    filledBlocks = true;
  if (blockNo === 17 || blockNo === 33 || blockNo === 49) filledBlocks = false;
  if (filledBlocks) {
    blockElem.classList.add("filledBlock");
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

const createIndexCell = (arr, rowCell = false, colCell = false) => {
  const fragment = document.createDocumentFragment();
  const { blockWidth, blockHeight } = getCellDimension();
  for (let arrElem of arr) {
    const indexCell = document.createElement("div");
    indexCell.classList.add("indexCell");
    indexCell.append(document.createTextNode(arrElem));
    if (rowCell) {
      indexCell.style.width = blockWidth + "px";
    } else {
      indexCell.style.height = blockHeight + "px";
    }
    fragment.append(indexCell);
  }
  return fragment;
};

const createIndex = (rowCell = false, colCell = false) => {
  const indexElem = document.createElement("div");
  let fragment;
  if (rowCell) {
    indexElem.classList.add("row");
    fragment = createIndexCell(row, rowCell, colCell);
  }
  if (colCell) {
    indexElem.classList.add("col");
    fragment = createIndexCell(col, rowCell, colCell);
  }
  indexElem.append(fragment);
  chessBoardElem.insertAdjacentElement("beforebegin", indexElem);
};

const createBlocks = (count, p) => {
  const blocks = document.createElement("div");
  blocks.classList.add("chess_block");

  // fill block
  fillBlock(count, blocks);

  blocks.append(document.createTextNode(p));
  blocks.style.fontSize = "1.1rem";
  const { blockWidth, blockHeight } = getCellDimension();
  blocks.style.width = blockWidth + "px";
  blocks.style.height = blockHeight + "px";
  return blocks;
};

let blocksNo = 1;
let pos = 1;
window.addEventListener("DOMContentLoaded", () => {
  const fragment = document.createDocumentFragment();
  let p;
  while (blocksNo <= 64) {
    p = row[pos - 1];
    console.log(p);
    if (pos === 8) {
      console.log("reset");
      pos = 1;
    }
    fragment.append(createBlocks(blocksNo, p));
    pos++;
    blocksNo++;
  }
  chessBoardElem.append(fragment);
  createIndex(true, false);
  createIndex(false, true);
});
