import asyncio
import aturtle

# solve `towers of hanoi` problem for a stack of size n
def toh(n: int, start = 0, aux = 1, end = 2, piles = 3, recursing = False):
    tend = piles - 1
    if(not recursing): end = tend
    
    def f(i): return (aux if (i == end or i == start) else i)
    if(n < piles):
        return [
            *[(start, f(auxi + 1)) for auxi in range(0, n-1, 1)],
            (start, end),
            *[(f(auxi), end) for auxi in range(n-1, 0, -1)],
        ]
    
    sub = n - (piles - 2)
    # might be smart to set piles = to min(sub + 1, piles) here
    half_1st = toh(sub, start, end, aux, piles, True)
    middle = [
        *[(start, auxi) for auxi in range(2, tend, 1)],
        (start, end),
        *[(auxi - 1, end) for auxi in range(tend, 2, -1)],
    ]
    half_2nd = toh(sub, aux, start, end, piles, True)
    
    return half_1st + middle + half_2nd

# settings (vars)
pile_count = 4
my_n = 14
# block dimensions
height = 3
dwidth = 3
# number of `dwidth`s of extra size given to the 1st block
dextra = 0
# how fast to animate
MY_SPEED = 400

# block shapes
w = aturtle.Window(title="Towers of Hanoi")
blocks = [aturtle.shapes.vector.Shape([
    -width/2, 0,
    +width/2, 0,
    +width/2, height,
    -width/2, height,
]) for width in [
    ((i + dextra) * dwidth) for i in range(my_n, 0, -1)
]]
sprites = [(
    aturtle.sprites.VectorSprite(w.canvas, block, update=True)
) for block in blocks]
turtles = [(
    aturtle.turtle.Turtle(sprite)
) for sprite in sprites]

path = toh(my_n, piles=pile_count)

def log(p):
    print(f"move from pole {p[0]} to pole {p[1]};")
def log_all(path): (log(p) for p in path)

piles = [[] for i in range(pile_count)]
pile_width = dwidth * (my_n + dextra + 2)
lift_height = height * (my_n + 1)
async def draw():
    piles[0] += turtles
    
    offx = (pile_width * pile_count) / 2
    offy = (lift_height) / 2
    
    for t in turtles:
        i = turtles.index(t)
        t.sync_move_to(
            0 - offx,
            i * height - offy,
            down = False, speed = MY_SPEED
        )
    
    for p in path:
        from_i = p[0]
        to_i = p[1]
        
        # functionally move t
        t = piles[from_i].pop()
        piles[to_i].append(t)
        
        # visually move t
        # up
        t.sync_move_to(
            from_i * pile_width - offx,
            lift_height - offy,
            down = False, speed = MY_SPEED
        )
        # left / right
        t.sync_move_to(
            to_i * pile_width - offx,
            lift_height - offy,
            down = False, speed = MY_SPEED
        )
        # down
        t.sync_move_to(
            to_i * pile_width - offx,
            (len(piles[to_i]) - 1) * height - offy,
            down = False, speed = MY_SPEED
        )
        
        # log(p)

input(f"will take {len(path)} steps! press [enter] to run~")
asyncio.run(draw())

"""
piles_try = 5
max_try = 30
print([len(toh(
    try_n, piles=piles_try
)) for try_n in range(1, max_try +1)])
"""

