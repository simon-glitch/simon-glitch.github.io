
const _ = undefined;

const tm = new Move_Type();
tm.move = true;
const tc = new Move_Type();
tc.capture = true;
const ta = new Move_Type();
ta.move = true;
ta.capture = true;

//const s = (...m) => new Move_Set(...m);
//const o = (o) => new Move(o);
//const p = (x, y) => new Point(x, y);

// this is good code!
const PAWN   = new Piece("Pawn",   "P", new Move_Set(
    new Move({
        n: "forward_1",
        p: new Point(0, 1),
        t: tm,
        s: [(b,t,m) => [true, new Move({
            n: "forward_2",
            p: new Point(1, 0),
            t: tm,
            d: [(b,t,m) => [
                t.movec === 0,
            ]],
        })]],
    }),
    new Move({
        n: "capture",
        p: new Point(1, 1),
        t: tc,
    }),
    ...[-1,1].map(s => new Move({
        n: "en_passant",
        p: new Point(s, 1),
        t: tm,
        d: [(b,t,m) => [
            b.history.at(-1) instanceof Move &&
            b.history.at(-1).name === "forward_2" &&
            b.history.at(-1).dest === b.tile(
                t.x + s,
                t.y + 2,
            )
        ]],
        e: [(b,t,m) => b.move(
            t.x,
            t.y,
            t.x + s,
            t.y,
        )]
    })),
));
const KNIGHT = new Piece("Knight", "N", new Move_Set(
    // the knight is actually one of the easiest pieces to code
    ...[
        [ 2,  1],
        [ 1,  2],
        [-1,  2],
        [-2,  1],
        [-2, -1],
        [-1, -2],
        [ 1, -2],
        [ 2, -1],
    ] // don't mind the functional stuff
    .map(v => (f => f(...v))((x, y) => new Move({
        n: "capture",
        p: new Point(x, y),
        t: ta,
    }))),
));
const BISHOP = new Piece("Bishop", "B", new Move_Set(
    // moves
));
const ROOK   = new Piece("Rook",   "R", new Move_Set(
    // moves
));
const QUEEN  = new Piece("Queen",  "Q", new Move_Set(
    // moves
));
// castling is a king move;
const KING   = new Piece("King",   "K", new Move_Set(
    // moves
));

/*
Some goals:
* Checkers.
* Chess vs Checkers.
* Atomic Chess.
* Horde Chess.
* Connect 4.
* Other games?
*/

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
b.setup(standard_board).update();
b.initialize([
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING,
]).check();
console.log(""+b);
b.rows[1][1].move_map.Pawn.move[0].execute();
console.log(""+b);
