import { capturePieceOrMove, playersInfoElem } from "./move";
import pieces from "./pieces";

const whitePieceElem = document.querySelector(
  "[data-player-variant='white']>.pieces"
);
const blackPieceElem = document.querySelector(
  "[data-player-variant='black']>.pieces"
);

const whitePieces = [];
const blackPieces = [];

/*   {
     pieceName: "rook",
     pieceImg: "../img/light-rook.png",
     capturedBy: "pawn",
     piecePos: "G4",
     capturingPiecePos: "H5",
   },
*/

class CapturedPiece {
  constructor(pieceName, pieceImg, capturedBy, piecePos, capturingPiecePos) {
    this.pieceName = pieceName;
    this.pieceImg = pieceImg;
    this.capturedBy = capturedBy;
    this.piecePos = piecePos;
    this.capturingPiecePos = capturingPiecePos;
  }
}

// update capturing pieces
const updatePieceCaptureHistory = (capturedPieceData, capturedPiecesData) => {
  if (!capturedPiecesData.length) {
    const capturePiceDataContainer = [];
    capturePiceDataContainer.push(capturedPieceData);
    capturedPiecesData.push(capturePiceDataContainer);
  } else {
    // const filteredArray = capturedPiecesData.filter((piecesData) =>
    //   piecesData.filter(
    //     (pieceData) => pieceData.pieceName === capturedPieceData.pieceName
    //   )
    // );
    // console.log(filteredArray);
    for (let individualPieceData of capturedPiecesData) {
      if (individualPieceData[0].pieceName === capturedPieceData.pieceName) {
        individualPieceData.push(capturedPieceData);
      } else {
        const capturePiceDataContainer = [];
        capturePiceDataContainer.push(capturedPieceData);
        capturedPiecesData.push(capturePiceDataContainer);
      }
    }
  }
};

const updateCapturingPieces = (elem, arr) => {
  elem.innerHTML = "";
  for (let e of arr) {
    const individualPieceElem = document.createElement("div");
    for (let a of e) {
      const pieceElem = document.createElement("div");
      pieceElem.classList.add("pieceImg");
      const img = document.createElement("img");
      img.src = a.pieceImg;
      img.alt = a.pieceName;
      pieceElem.append(img);
      individualPieceElem.append(pieceElem);
    }
    elem.append(individualPieceElem);
  }
};

const capturePiece = (targetCells, selectedCell, possibleMovesPos) => {
  let captured = true;
  // get all empty cell elements
  const emptyCells = document.querySelectorAll(".emptyCell");
  for (let targetCell of targetCells) {
    for (let possibleMovePos of possibleMovesPos) {
      if (
        targetCell.id === possibleMovePos &&
        targetCell.dataset.pieceVariant !== selectedCell.dataset.pieceVariant
      ) {
        // add a class on target cell
        // targetCell.classList.add("targetCell");
        const capture = async () => {
          const { pieceVariant, pieceName, piecePos, pieceId } =
            targetCell.dataset;
          const pieceInfo = pieces.find((piece) => piece.id === pieceId);

          const tempTargetPieceName = targetCell.dataset.pieceName;
          const tempSelectedPieceName = selectedCell.dataset.pieceName;
          try {
            const isPieceCaptured = await capturePieceOrMove(
              selectedCell,
              targetCell,
              emptyCells,
              captured
            );
            if (isPieceCaptured) {
              const capturedPieceData = new CapturedPiece(
                pieceName,
                pieceInfo.img,
                piecePos,
                selectedCell.dataset.pieceName,
                selectedCell.dataset.piecePos
              );
              console.log(pieceVariant);
              if (pieceVariant === "white") {
                updatePieceCaptureHistory(capturedPieceData, whitePieces);
                updateCapturingPieces(whitePieceElem, whitePieces);
              } else if (pieceVariant === "black") {
                updatePieceCaptureHistory(capturedPieceData, blackPieces);
                updateCapturingPieces(blackPieceElem, blackPieces);
                // do something
              }
              console.log(
                `${tempTargetPieceName} is captured by ${tempSelectedPieceName}`
              );
              captured = false;
            }
          } catch (error) {
            console.log("unable to capture piece");
          }
        };
        targetCell.addEventListener("click", capture);
      }
    }
  }
};

export { capturePiece };

/*
<div class="pieces">
  <div class="king">
    <div class="piece-img">
      <img src="./img/dark-king.png" alt="dark-king">
    </div>
  </div>
  <div class="rook">
    <div class="piece-img">
      <img src="./img/dark-rook.png" alt="dark-rook">
    </div>
    <div class="piece-img">
      <img src="./img/dark-rook.png" alt="dark-rook">
    </div>
  </div>
</div>
*/
