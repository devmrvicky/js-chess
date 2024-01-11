// dark pieces
import darkKing from "../img/dark-king.png";
import darkQueen from "../img/dark-queen.png";
import darkBishop from "../img/dark-bishop.png";
import darkKnight from "../img/dark-knight.png";
import darkRook from "../img/dark-rook.png";
import darkPawn from "../img/dark-pawn.png";

// light pieces
import lightKing from "../img/light-king.png";
import lightQueen from "../img/light-queen.png";
import lightBishop from "../img/light-bishop.png";
import lightKnight from "../img/light-knight.png";
import lightRook from "../img/light-rook.png";
import lightPawn from "../img/light-pawn.png";

const pieces = [
  // black pieces
  { pos: "D8", id: "dark-king", name: "king", img: darkKing },
  { pos: "E8", id: "dark-queen", name: "queen", img: darkQueen },
  {
    pos: "C8",
    id: "dark-bishop1",
    name: "bishop",
    img: darkBishop,
  },
  {
    pos: "F8",
    id: "dark-bishop2",
    name: "bishop",
    img: darkBishop,
  },
  {
    pos: "B8",
    id: "dark-knight1",
    name: "knight",
    img: darkKnight,
  },
  {
    pos: "G8",
    id: "dark-knight2",
    name: "knight",
    img: darkKnight,
  },
  { pos: "A8", id: "dark-rook1", name: "rook", img: darkRook },
  { pos: "H8", id: "dark-rook", name: "rook", img: darkRook },
  { pos: "A7", id: "dark-pawn1", name: "pawn", img: darkPawn },
  { pos: "B7", id: "dark-pawn2", name: "pawn", img: darkPawn },
  { pos: "C7", id: "dark-pawn3", name: "pawn", img: darkPawn },
  { pos: "D7", id: "dark-pawn4", name: "pawn", img: darkPawn },
  { pos: "E7", id: "dark-pawn5", name: "pawn", img: darkPawn },
  { pos: "F7", id: "dark-pawn6", name: "pawn", img: darkPawn },
  { pos: "G7", id: "dark-pawn7", name: "pawn", img: darkPawn },
  { pos: "H7", id: "dark-pawn8", name: "pawn", img: darkPawn },
  // white pieces
  { pos: "D1", id: "light-king", name: "king", img: lightKing },
  {
    pos: "E1",
    id: "light-queen",
    name: "queen",
    img: lightQueen,
  },
  {
    pos: "C1",
    id: "light-bishop1",
    name: "bishop",
    img: lightBishop,
  },
  {
    pos: "F1",
    id: "light-bishop2",
    name: "bishop",
    img: lightBishop,
  },
  {
    pos: "B1",
    id: "light-knight1",
    name: "knight",
    img: lightKnight,
  },
  {
    pos: "G1",
    id: "light-knight2",
    name: "knight",
    img: lightKnight,
  },
  { pos: "A1", id: "light-rook1", name: "rook", img: lightRook },
  { pos: "H1", id: "light-rook", name: "rook", img: lightRook },
  { pos: "A2", id: "light-pawn1", name: "pawn", img: lightPawn },
  { pos: "B2", id: "light-pawn2", name: "pawn", img: lightPawn },
  { pos: "C2", id: "light-pawn3", name: "pawn", img: lightPawn },
  { pos: "D2", id: "light-pawn4", name: "pawn", img: lightPawn },
  { pos: "E2", id: "light-pawn5", name: "pawn", img: lightPawn },
  { pos: "F2", id: "light-pawn6", name: "pawn", img: lightPawn },
  { pos: "G2", id: "light-pawn7", name: "pawn", img: lightPawn },
  { pos: "H2", id: "light-pawn8", name: "pawn", img: lightPawn },
];

export default pieces;
