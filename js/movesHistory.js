const tableElem = document.querySelector("table");
const tbodyElem = tableElem.querySelector("tbody");

const movesHistory = [];

const createPieceTd = (pieceHistory) => {
  const fragment = document.createDocumentFragment();
  for (let singlePieceHistory of pieceHistory) {
    const td = document.createElement("td");
    // if(singlePieceHistory)
    if (singlePieceHistory) {
      const {
        pieceName,
        pieceImg,
        startingCell,
        endingCell,
        capturedPice,
        capturedPieceImg,
      } = singlePieceHistory;
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = pieceImg;
      img.alt = pieceName;
      const span = document.createElement("span");
      span.append(document.createTextNode(`${startingCell} to ${endingCell}`));
      div.append(img, span);
      td.append(div);
    }
    fragment.append(td);
  }
  return fragment;
};

const updatePiceMovingHistoryDoc = (movesHistory) => {
  tbodyElem.innerHTML = "";
  const fragment = document.createDocumentFragment();
  let sNo = 0;
  for (let moveHistory of movesHistory) {
    sNo++;
    const tr = document.createElement("tr");
    const sNoTd = document.createElement("td");
    sNoTd.append(document.createTextNode(sNo));
    tr.append(sNoTd);
    // create and append single piece history
    const pieceHistoryFragment = createPieceTd(moveHistory);
    tr.append(pieceHistoryFragment);
    fragment.append(tr);
  }
  tbodyElem.append(fragment);
};

const createMovingHistory = (pieceMovingData) => {
  const lastElem = movesHistory[movesHistory.length - 1];
  // console.log(lastElem);
  if (!lastElem || lastElem.length === 2) {
    const arr = [];
    arr.push(pieceMovingData);
    movesHistory.push(arr);
  } else {
    lastElem.push(pieceMovingData);
  }
  updatePiceMovingHistoryDoc(movesHistory);
};

export { updatePiceMovingHistoryDoc, createMovingHistory };
