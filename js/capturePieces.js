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
const updateCapturingPieces = (pieceElem, capturedPieces) => {
  pieceElem.innerHTML = "";
  for (let capturedPiece of capturedPieces) {
    const div = document.createElement("div");
    div.classList.add("pieceImg");
    const img = document.createElement("img");
    img.src = capturedPiece.pieceImg;
    img.alt = capturedPiece.pieceName;
    div.append(img);
    pieceElem.append(div);
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
                whitePieces.push(capturedPieceData);
                updateCapturingPieces(whitePieceElem, whitePieces);
              } else if (pieceVariant === "black") {
                blackPieces.push(capturedPieceData);
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
