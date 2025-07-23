
/**
 * The definition of the "color" of a chess player.
 */
class Owner{
    name = "";
    color = "";
    constructor(name, color){
        this.name = String(name);
        this.color = String(color);
    }
    toString(){
        return this.color;
    }
};

/**
 * A coordinate with an `x` value and a `y` value.
 * - `x` is for "columns", or "files".
 * - `y` is for "rows", or "ranks".
 * - A1 is treated as `x=1, y=1`.
 * - B3 is treated as `x=3, y=2`.
 * - H7 is treated as `x=7, y=8`.
 * - Note that the point can also be an offset or vector.
 */
class Point{
    x = 0;
    y = 0;
    /**
     * Whether the point is relative.
     */
    relative = true;
    constructor(x, y){
        this.x = Number(x);
        this.y = Number(y);
    }
    /**
     * Make the point be relative.
     */
    rel(){
        this.relative = true;
    }
    /**
     * Make the point be absolute (not relative).
     */
    abs(){
        this.relative = false;
    }
};

/**
 * The first element indicates whether the condition has been met. If the condition is not met, the move will not be possible to make.
 * - All elements after the boolean are "children" moves to define.
 * - Each child move requires all conditions of this move to be met in order to be made.
 * - The child will remember its parent and check if the parent's conditions are met.
 * @typedef {[Boolean, ...Move[]]} Move_C
 */

/**
 * About:
 * - `board`: the chess board.
 * - `tile`: the tile the move is coming from.
 * - `move`: the move this is a condition for.
 * @typedef {(board: Board, tile: Tile, move: Move) => Move_C} Cond_F
 */

/**
 * A set of move conditions and the corresponding children.
 * - `Move.static` and `Move.dynamic` explain this in detail.
 * - Each type of condition generates its own specific type of children.
 */
class Conditions{
    /**
     * The move these conditions are for.
     * @type {Move}
     */
    move = null;
    /**
     * The conditions of the move.
     * @type {Cond_F[]}
     */
    conditions = [];
    /**
     * The children moves.
     * @type {Move[]}
     */
    children = [];
    constructor(move){
        this.move = move;
        this.conditions = [];
        this.children = [];
    }
    /**
     * Tell the children of the move who their parent is.
     * @param {Move_C} children the children of this move;
     */
    claim(children){
        for(let i = 1; i < children.length; i++){
            /** @type {Move} */
            const c = children[i];
            c.parent = this.move;
            this.children.push(c);
            if(c.p.relative){
                c.p.x += this.move.p.x;
                c.p.y += this.move.p.y;
            }
        }
    }

}

/**
 * The type of a move.
 * - The move type acts like a dynamic condition of the move.
 * - There are only 2 types currently, but you could add more. What's fun is you can code checkers with these rules.
 */
class Move_Type{
    /**
     * Whether this move can be done as a capture.
     */
    capture = false;
    /**
     * Whether this move can be done as a move to an empty tile (a non-capture).
     */
    move = false;
}

/**
 * A chess move. These can have a lot of complex conditions and rules.
 * - I thought I would just write a simple class. Now I have this absolutely insane mess. You would need a whole chart to understand what's going on here. I think you can ignore `claim` and `parent`.
 */
class Move{
    /**
     * The offset of this move. i.e. how much it changes the x and y coordinates of the piece.
     */
    p = new Point(0, 0);
    /**
     * The parent of this move.
     * @type {Move}
     */
    parent = null;
    /**
     * The static conditions required for a piece to make this move.
     * - The static conditions can only use the coordinates of the tile that the piece is moving from.
     * - Children moves (returned from the static conditions) are added and initialized.
     */
    static = new Conditions();
    /**
     * The dynamic conditions required for a piece to make this move.
     * - The dynamic conditions can use any and all information about the board, allowing the availability of the move to change throughout the corse of the game.
     * - Children moves (returned from the dynamic conditions) are dynamically added for only this turn. They will be removed when the turn is over.
     */
    dynamic = new Conditions();
    /**
     * Side-effects of the move. Currently not implemented.
     * @type {Cond_F[]}
     */
    effects = [];
    /**
     * What type of move this is.
     * - See `Move_Type`.
     */
    type = new Move_Type();
    /**
     * Nickname for the move.
     */
    name = "";
    /**
     * The properties of options define the properties of this move.
     * @param {{p: Point, s:
     * Cond_F[], d: Cond_F[], e: Cond_F[],
     * t: Move_Type, n: string}} options
     * - `point` or `p`: `this.p`;
     * - `static` or `s`: the static conditions;
     * - `dynamic` or `d`: the dynamic conditions;
     * - `effects` or `e`: `this.effects`;
     * - `type` or `t`: `this.type`;
     * - `name` or `n`: `this.n`;
     */
    constructor(options){
        this.static = new Conditions(this);
        this.dynamic = new Conditions(this);
        const p = options.point   ?? options.p ?? this.p;
        const s = options.static  ?? options.s ?? this.static .conditions;
        const d = options.dynamic ?? options.d ?? this.dynamic.conditions;
        const e = options.effects ?? options.e ?? this.effects;
        const t = options.type    ?? options.t ?? this.type;
        const n = options.name    ?? options.n ?? this.name;
        this.p                  = p;
        this.static .conditions = s;
        this.dynamic.conditions = d;
        this.effects            = e;
        this.type               = t;
        this.name               = n;
    }
    /**
     * Initialize the chess move.
     * @param {Board} board the chess board
     * @param {Tile} tile the chess tile this move is coming from
     * @returns {[Boolean, Move]}
     */
    initialize(board, tile){
        const c_board = board;
        const c_tile = tile;
        // bounds check
        if(
            tile.y + this.p.y < 0 ||
            tile.y + this.p.y >= board.height ||
            tile.x + this.p.x < 0 ||
            tile.x + this.p.x >= board.width
        ) return [false];
        
        /** @type {Move_C} */
        const A = [true];
        for(let f of this.static_conditions){
            const B = f(board, tile, this);
            if(!B[0]){
                return B;
            }
            B.shift();
            A.push(...B);
        }
        this.static.claim(A);
        this.execute = (
            (this.dynamic_conditions.length === 0)
            ? function(){
                this.move(board, tile);
            }
            : function(){
                const C = this.check();
                if(C[0]) this.move(board, tile);
            }
        );
        return A;
    }
    /**
     * Check the dynamic conditions of this move.
     * @param {Board} board the chess board
     * @param {Tile} tile the chess tile this move is coming from
     */
    check(board, tile){
        /** @type {Move_C} */
        const A = [true];
        for(let f of this.dynamic_conditions){
            const B = f(board, tile, this);
            if(B[0]){
                return B;
            }
            B.shift();
            A.push(...B);
        }
        this.dynamic.claim(A);
        return A;
    }
    /**
     * Execute this move without checking any conditions.
     * @param {Board} board the chess board
     * @param {Tile} tile the chess tile this move is coming from
     */
    move(board, tile){
        board.move(
            tile.coords.x - 1,
            tile.coords.y - 1,
            tile.coords.x - 1 + this.p.x,
            tile.coords.y - 1 + this.p.y,
        );
        for(let e of this.effects){
            this.effects(board, tile, this);
        }
    }
    /**
     * Copy constructor.
     * @returns {Move} a new move;
     */
    copy(){
        return new Move(
            this.p,
            this.static_conditions,
            this.dynamic_conditions,
            this.effects,
            this.name,
        );
    }
};

/**
 * @extends Array<Move>
 */
class Move_Set extends Array{
    constructor(){
        super(...arguments);
    }
    /**
     * Make a copy of this move set.
     */
    copy(){
        return new Move_Set(...this.map(
            m => m.copy()
        ));
    }
    /**
     * Initialize each move in this move set.
     * - i.e. check all of its static conditions.
     * @param {Board} board the board this move is being made on;
     * @param {Tile} tile the tile this move is being made from;
     */
    initialize(board, tile){
        const LIMIT = 100;
        for(let i = 0; i < this.length; i++){
            if(i >= LIMIT){
                console.log(
                    "RangeError: Piece has more than" +
                    "the maximum number of moves (" +
                    LIMIT + ")."
                );
                return;
            }
            const m = this[i];
            m.initialize(board, tile);
            if(!m[0] || m.length === 1) continue;
            m.shift();
            this.push(...m);
        }
    }
};

/**
 * The definition of a chess piece.
 */
class Piece{
    name = "";
    letter = "";
    /**
     * @type {Move_Set}
     */
    moves = null;
    /**
     * @param {String} name the full name of the piece
     * @param {String} letter the single-letter name of the piece
     * @param {Move_Set} moves 
     */
    constructor(name, letter, moves){
        this.name = name;
        this.letter = letter;
        this.moves = moves;
    }
    toString(){
        return this.letter;
    }
};

/** The "owner" for an empty tile. */
const NOONE = new Owner("Noone", " ");
/** The "piece" for an empty tile. */
const EMPTY = new Piece("Empty", "-");

const BLACK = new Owner("Black", ".");
const WHITE = new Owner("White", " ");

/**
 * A "tile", or "square", on the chess board.
 */
class Tile{
    name = "";
    piece = EMPTY;
    owner = NOONE;
    movec = 0;
    /**
     * The coordinates of this tile.
     */
    coords = new Point(0, 0);
    /**
     * Map of each piece to the moves it can make on this tile.
     * @type {Object<string, Move_Set>}
     */
    move_map = {};
    constructor(){
        this.coords = new Point(0, 0);
        this.move_map = {};
    }
    toString(){
        return "" + this.piece + this.owner;
    }
    /**
     * Setup all moves for a given piece on this tile.
     * @param {Piece} piece the piece;
     * @param {Board} board the board this tile is on;
     */
    initialize(piece, board){
        console.log("? 4");
        const moves = piece.moves.copy();
        moves.initialize(board, this);
        this.move_map[piece.name] = moves;
    }
};

/**
 * A row of the chess board.
 * @extends Array<Tile>
 */
class Row extends Array{
    number = 0;
    constructor(width){
        super(...arguments);
        for(let x = 0; x < width; x++){
            this[x] = new Tile();
        }
    }
    toString(){
        return this.join(" ");
    }
    update(){
        this.forEach((t, i) => {
            t.name = column(i) + this.number;
            t.coords.x = i + 1;
            t.coords.y = this.number;
        });
    }
};

/**
 * The chess board.
 */
class Board{
    /**
     * @type {Row[]} The rows of the board.
     */
    rows = [];
    width = 0;
    height = 0;
    /**
     * @param {int} width the number of files the board has;
     * @param {int} height the number of ranks the board has;
     */
    constructor(width, height){
        this.width = Math.floor(Number(width));
        this.height = Math.floor(Number(height));
        this.rows = [];
        for(let y = 0; y < height; y++){
            this.rows[y] = new Row(width);
        }
        this.update();
    }
    /**
     * Update the numbers, names, and coordinates of all rows and tiles.
     * @returns the board, so the method can be chained;
     */
    update(){
        this.rows.forEach((r, i) => {
            r.number = i + 1;
            r.update();
        });
        
        return this;
    }
    /**
     * Place a piece.
     * - A1 is treated as x=1, y=1.
     * - A8 is treated as x=8, y=1.
     * - H8 is treated as x=8, y=8
     * @param {int} x x coordinate of the tile to place the piece on;
     * @param {int} y y coordinate of the tile to place the piece on;
     * @param {Piece} piece 
     * @param {Owner} owner 
     * @returns the board, so the method can be chained;
     */
    place(x, y, piece, owner){
        const t = this.rows[y][x];
        t.piece = piece;
        t.owner = owner;
        
        return this;
    }
    /**
     * Move a piece.
     * @param {int} x1 x coordinate of the starting tile;
     * @param {int} y1 y coordinate of the starting tile;
     * @param {int} x2 x coordinate of the ending tile;
     * @param {int} y2 y coordinate of the ending tile;
     * @returns the board, so the method can be chained;
     */
    move(x1, y1, x2, y2){
        const t1 = this.rows[y1][x1];
        const t2 = this.rows[y2][x2];
        t2.piece = t1.piece;
        t2.owner = t1.owner;
        t2.movec = t1.movec + 1;
        t1.piece = EMPTY;
        t1.owner = NOONE;
        t1.movec = 0;
        
        return this;
    }
    /**
     * Figure out how all of the pieces move based on their move sets.
     * - `board -> tile -> move_set -> move`
     * @param {Piece[]} pieces all possible pieces that can play on this board;
     * @returns the board, so the method can be chained;
     */
    initialize(pieces){
        console.log("? 1");
        for(let y = 0; y < this.height; y++){
            const row = this.rows[y];
            for(let x = 0; x < this.width; x++){
                console.log("? 2");
                const tile = row[x];
                for(let i = 0; i < pieces.length; i++){
                    console.log("? 3");
                    tile.initialize(pieces[i], this);
                }
            }
        }
        return this;
    }
    /**
     * Check the dynamic conditions of the moves of all of the pieces on the board.
     * @returns the board, so the method can be chained;
     */
    check(){
        return this;
    }
    /**
     * Setup a full game.
     * @param {{pieces: Piece[][], colors: Owner[][]}} data the board setup to use;
     * @returns the board, so the method can be chained;
     * @throws an aggregate error of any issues found;
     */
    setup(data){
        const dp = (
            data.pieces ?? data.piece ??
            data.p
        );
        const dc = (
            data.colors ?? data.color ??
            data.owners ?? data.owner ??
            data.c
        );
        
        const de = [];
        
        this.rows.forEach((r, y) => {
            r.forEach((t, x) => {
                let p, c;
                try{
                    p = dp[y][x];
                }
                catch(e){
                    e.message = `(piece ${x}, ${y}) ` + e.message;
                    de.push(e);
                }
                try{
                    c = dc[y][x];
                }
                catch(e){
                    e.message = `(color ${x}, ${y}) ` + e.message;
                    de.push(e);
                }
                if(p instanceof Piece){
                    t.piece = p;
                }
                else{
                    de.push(new TypeError(
                        `(piece ${x}, ${y}) ` +
                        "TypeError: value is not a piece."
                    ));
                }
                if(c instanceof Owner){
                    t.owner = c;
                }
                else{
                    de.push(new TypeError(
                        `(color ${x}, ${y}) ` +
                        "TypeError: value is not a color (type Owner)."
                    ));
                }
            });
        });
        
        if(de.length > 0){
            throw new AggregateError(de);
        }
        
        return this;
    }
    /**
     * Print the board.
     */
    toString(){
        return this.rows.join("\n");
    }
};



