import { capturePieceOrMove } from "./move";

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
          const tempTargetPieceName = targetCell.dataset.pieceName;
          const tempSelectedPieceName = selectedCell.dataset.pieceName;
          try {
            const isCapturedPiece = await capturePieceOrMove(
              selectedCell,
              targetCell,
              emptyCells,
              captured
            );
            if (isCapturedPiece) {
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
