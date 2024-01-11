// dark pieces
import darkKing from "../img/dark-king.png";
import darkQueen from "../img/dark-queen.png";
import darkBishop from "../img/dark-bishop.png";
import darkKnight from "../img/dark-knight.png";
import darkRook from "../img/dark-rook.png";
import darkPawn from "../img/dark-pawn.png";

// light pieces43
import lightKing from "../img/light-king.png";
import lightQueen from "../img/light-queen.png";
import lightBishop from "../img/light-bishop.png";
import lightKnight from "../img/light-knight.png";
import lightRook from "../img/light-rook.png";
import lightPawn from "../img/light-pawn.png";

const pieces = [
  // black pieces
  { pos: "D8", id: "black-king", name: "king", img: darkKing },
  { pos: "E8", id: "black-queen", name: "queen", img: darkQueen },
  {
    pos: "C8",
    id: "black-bishop1",
    name: "bishop",
    img: darkBishop,
  },
  {
    pos: "F8",
    id: "black-bishop2",
    name: "bishop",
    img: darkBishop,
  },
  {
    pos: "B8",
    id: "black-knight1",
    name: "knight",
    img: darkKnight,
  },
  {
    pos: "G8",
    id: "black-knight2",
    name: "knight",
    img: darkKnight,
  },
  { pos: "A8", id: "black-rook1", name: "rook", img: darkRook },
  { pos: "H8", id: "black-rook", name: "rook", img: darkRook },
  { pos: "A7", id: "black-pawn1", name: "pawn", img: darkPawn },
  { pos: "B7", id: "black-pawn2", name: "pawn", img: darkPawn },
  { pos: "C7", id: "black-pawn3", name: "pawn", img: darkPawn },
  { pos: "D7", id: "black-pawn4", name: "pawn", img: darkPawn },
  { pos: "E7", id: "black-pawn5", name: "pawn", img: darkPawn },
  { pos: "F7", id: "black-pawn6", name: "pawn", img: darkPawn },
  { pos: "G7", id: "black-pawn7", name: "pawn", img: darkPawn },
  { pos: "H7", id: "black-pawn8", name: "pawn", img: darkPawn },
  // white pieces
  { pos: "D1", id: "white-king", name: "king", img: lightKing },
  {
    pos: "E1",
    id: "white-queen",
    name: "queen",
    img: lightQueen,
  },
  {
    pos: "C1",
    id: "white-bishop1",
    name: "bishop",
    img: lightBishop,
  },
  {
    pos: "F1",
    id: "white-bishop2",
    name: "bishop",
    img: lightBishop,
  },
  {
    pos: "B1",
    id: "white-knight1",
    name: "knight",
    img: lightKnight,
  },
  {
    pos: "G1",
    id: "white-knight2",
    name: "knight",
    img: lightKnight,
  },
  { pos: "A1", id: "white-rook1", name: "rook", img: lightRook },
  { pos: "H1", id: "white-rook", name: "rook", img: lightRook },
  { pos: "A2", id: "white-pawn1", name: "pawn", img: lightPawn },
  { pos: "B2", id: "white-pawn2", name: "pawn", img: lightPawn },
  { pos: "C2", id: "white-pawn3", name: "pawn", img: lightPawn },
  { pos: "D2", id: "white-pawn4", name: "pawn", img: lightPawn },
  { pos: "E2", id: "white-pawn5", name: "pawn", img: lightPawn },
  { pos: "F2", id: "white-pawn6", name: "pawn", img: lightPawn },
  { pos: "G2", id: "white-pawn7", name: "pawn", img: lightPawn },
  { pos: "H2", id: "white-pawn8", name: "pawn", img: lightPawn },
];

export default pieces;
