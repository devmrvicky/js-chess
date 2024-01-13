import { CreatePieceMovingHistoryObj } from "./move";

const tableElem = document.querySelector("table");
const tbodyElem = tableElem.querySelector("tbody");

// // class for creating object
// class CreatePieceMovingHistoryObj {
//   constructor(
//     pieceName,
//     pieceImg,
//     startingCell,
//     endingCell,
//     capturedPice = null,
//     capturedPieceImg = null
//   ) {
//     this.pieceName = pieceName;
//     this.pieceImg = pieceImg;
//     this.startingCell = startingCell;
//     this.endingCell = endingCell;
//     this.capturedPice = capturedPice;
//     this.capturedPieceImg = capturedPieceImg;
//   }
// }

// const movesHistory = [
//   [
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//   ],
//   [
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//   ],
//   [
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//   ],
//   [
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//   ],
//   [
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//   ],
//   [
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//     {
//       pieceName: "pawn",
//       pieceImg: "../img/light-pawn.png",
//       startingCell: "H4",
//       endingCell: "H5",
//       capturedPice: null,
//       capturedPieceImg: null,
//     },
//   ],
// ];

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

/*
  <tr>
    <td>1.</td>
    <td>
      <div>
        <img src="./img/light-pawn.png" alt="light-pawn">
        <span>
          d4 to d6
        </span>
      </div>
    </td>
    <td>
      <div>
        <img src="./img/light-pawn.png" alt="light-pawn">
        <span>
          d4 to d6
        </span>
      </div>
    </td>
  </tr>
*/
