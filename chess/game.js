
const _ = undefined;

const PAWN   = new Piece("Pawn",   "P", new Move_Set(
    [
        new Move(
            new Point(0, 1),
            _, _, _, "forward_1",
        ),
    ], [], _
));
const KNIGHT = new Piece("Knight", "N", new Move_Set(
    _, _, [],
));
const BISHOP = new Piece("Bishop", "B", new Move_Set(
    _, _, [],
));
const ROOK   = new Piece("Rook",   "R", new Move_Set(
    _, _, [],
));
const QUEEN  = new Piece("Queen",  "Q", new Move_Set(
    _, _, [],
));
// castling is a king move;
const KING   = new Piece("King",   "K", new Move_Set(
    _, _, [],
));


const standard_board = {
    pieces: [
        [ ROOK, KNIGHT, BISHOP,  KING, QUEEN, BISHOP, KNIGHT,  ROOK,],
        [ PAWN,   PAWN,   PAWN,  PAWN,  PAWN,   PAWN,   PAWN,  PAWN,],
        [EMPTY,  EMPTY,  EMPTY, EMPTY, EMPTY,  EMPTY,  EMPTY, EMPTY,],
        [EMPTY,  EMPTY,  EMPTY, EMPTY, EMPTY,  EMPTY,  EMPTY, EMPTY,],
        [EMPTY,  EMPTY,  EMPTY, EMPTY, EMPTY,  EMPTY,  EMPTY, EMPTY,],
        [EMPTY,  EMPTY,  EMPTY, EMPTY, EMPTY,  EMPTY,  EMPTY, EMPTY,],
        [ PAWN,   PAWN,   PAWN,  PAWN,  PAWN,   PAWN,   PAWN,  PAWN,],
        [ ROOK, KNIGHT, BISHOP,  KING, QUEEN, BISHOP, KNIGHT,  ROOK,],
    ],
    colors: [
        [BLACK,  BLACK,  BLACK, BLACK, BLACK,  BLACK,  BLACK, BLACK,],
        [BLACK,  BLACK,  BLACK, BLACK, BLACK,  BLACK,  BLACK, BLACK,],
        [NOONE,  NOONE,  NOONE, NOONE, NOONE,  NOONE,  NOONE, NOONE,],
        [NOONE,  NOONE,  NOONE, NOONE, NOONE,  NOONE,  NOONE, NOONE,],
        [NOONE,  NOONE,  NOONE, NOONE, NOONE,  NOONE,  NOONE, NOONE,],
        [NOONE,  NOONE,  NOONE, NOONE, NOONE,  NOONE,  NOONE, NOONE,],
        [WHITE,  WHITE,  WHITE, WHITE, WHITE,  WHITE,  WHITE, WHITE,],
        [WHITE,  WHITE,  WHITE, WHITE, WHITE,  WHITE,  WHITE, WHITE,],
    ],
};

const b = new Board(8, 8);
b.setup(standard_board);
console.log(""+b);

