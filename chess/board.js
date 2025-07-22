
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
    constructor(x, y){
        this.x = Number(x);
        this.y = Number(y);
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
     * The static children of this move.
     * @type {Move[]}
     */
    static_children = [];
    /**
     * The dyanmic children of this move.
     * @type {Move[]}
     */
    dynamic_children = [];
    /**
     * The conditions required for a piece to make this move.
     * - The static conditions can only use the coordinates of the tile that the piece is moving from.
     * - Children moves (returned from the static conditions) are added and initialized.
     * @type {Cond_F[]}
     */
    static_conditions = [];
    /**
     * The conditions required for a piece to make this move.
     * - The dynamic conditions can use any and all information about the board, allowing the availability of the move to change throughout the corse of the game.
     * - Children moves (returned from the dynamic conditions) are dynamically added for only this turn. They will be removed when the turn is over.
     * @type {Cond_F[]}
     */
    dynamic_conditions = [];
    /**
     * Side-effects of the move. Currently not implemented.
     * @type {Cond_F[]}
     */
    effects = [];
    /**
     * Nickname for the move.
     */
    name = "";
    /**
     * The parameters are the same as their members.
     * @param {Point} p ;
     * @param {Cond_F[]} static_conditions ;
     * @param {Cond_F[]} dynamic_conditions ;
     * @param {Cond_F[]} effects ;
     * @param {string} name ;
     */
    constructor(p, static_conditions, dynamic_conditions, effects, name){
        this.p = p ?? this.p;
        this.static_conditions = static_conditions ?? this.static_conditions;
        this.dynamic_conditions = dynamic_conditions ?? this.dynamic_conditions;
        this.effects = effects ?? this.effects;
        this.name = name ?? this.name;
        this.children = [];
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
        this.s_claim(A);
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
        this.d_claim(A);
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
     * Tell the children of this move who their parent is.
     * @param {Move_C} children the children of this move;
     */
    claim(children){
        this.children.push(...children);
        for(let i = 1; i < children.length; i++){
            children[i].parent = this;
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

class Move_Set{
    /**
     * Move (requires the tile to be empty).
     * @type Move[]
     */
    move = [];
    /**
     * Capture (requires the tile to have an enemy piece).
     * @type Move[]
     */
    capture = [];
    /**
     * Move and capture.
     * @type Move[]
     */
    move_cap = [];
    /**
     * @param {Move[]} move see the property;
     * @param {Move[]} capture see the property;
     * @param {Move[]} move_cap see the property;
     */
    constructor(move, capture, move_cap){
        this.move = move ?? [];
        this.capture = capture ?? [];
        this.move_cap = move_cap ?? [];
    }
    /** Make a copy of this move set. */
    copy(){
        const that = new Move_Set();
        that.move = this.move.map(
            m => m.copy()
        );
        that.capture = this.capture.map(
            m => m.copy()
        );
        that.move_cap = this.move_cap.map(
            m => m.copy()
        );
        return that;
    }
    /**
     * Initialize each move in this move set.
     * - i.e. check all of its static conditions.
     * @param {Board} board the board this move is being made on;
     * @param {Tile} tile the tile this move is being made from;
     */
    initialize(board, tile){
        this.sub(board, tile, this.move);
        this.sub(board, tile, this.capture);
        this.sub(board, tile, this.move_cap);
    }
    /** Used to keep the code of `initialize` shorter. */
    sub(board, tile, list){
        const LIMIT = 100;
        for(let i = 0; i < list.length; i++){
            if(i >= LIMIT){
                console.log("that's bad!");
                return;
            }
            const m = list[i];
            m.initialize(board, tile);
            if(!m[0] || m.length === 1) continue;
            m.shift();
            list.push(...m);
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



