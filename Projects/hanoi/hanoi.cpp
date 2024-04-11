
#include <iostream>
#include <vector>
// #include <cmath>

// instead of using namespace std, we'll do this
std::ostream &cout = std::cout;
std::istream &cin  = std::cin;

template<typename Item>
class vector : public std::vector<Item>{};

/**
  * Simple pair of items.
  * Essentially, `pair(a, b) == {a, b}`
**/
template<typename Item>
class pair{
public:
    Item a;
    Item b;
    // empty base constructor
    pair(){}
    // pair of 2 copies of the same value
    pair(const Item &ia){
        a = ia;
        b = ia;
    }
    // 2 explicit values
    pair(const Item &ia, const Item &ib){
        a = ia;
        b = ib;
    }
    Item &operator[](const uint64_t i) const {
        return (i & 1) ?&b :&a;
    }
    operator Item *() const {
        return new Item[2] {a, b};
    }
};

// solve `towers of hanoi` problem for a stack of size n
void tohi(int n, int start, int aux, int end, int piles, bool recursing, vector<pair<int>> &res){
    int tend = piles - 1;
    if(!recursing) end = tend;
    
    // used twice in the code
    const pair<int> mp(start, end);
    
    auto f = [start, aux, end](int i){return ((i == end or i == start) ?aux :i);};
    if(n < piles){
        for(int i = 0; i < n - 1; i++){
            const pair<int> p(start, f(i + 1));
            res.push_back(p);
        }
        res.push_back(mp);
        for(int i = n-1; i > 0; i--){
            const pair<int> p(f(i), end);
            res.push_back(p);
        }
        
        return;
    }
    
    int sub = n - (piles - 2);
    // might be smart to set piles = to min(sub + 1, piles) here
    
    // we pass in `res` so we don't have to rebuild it
    tohi(sub, start, end, aux, piles, true, res);
    
    for(int i = 2; i < tend - 1; i++){
        const pair<int> p(start, i);
        res.push_back(p);
    }
    res.push_back(mp);
    for(int i = tend; i > 2; i--){
        const pair<int> p(i - 1, end);
        res.push_back(p);
    }
    
    // we pass in `res` so we don't have to rebuild it
    tohi(sub, aux, start, end, piles, true, res);
}

vector<pair<int>> toh(const int n, const int piles = 3){
    vector<pair<int>> res;
    tohi(n, 0, 1, 2, piles, false, res);
    return res;
}

int main(const int argc, const char *argv[]){
    vector<pair<int>> these;
    switch(std::min(argc, 3)){
        case 3: these = toh(atoi(argv[1]), atoi(argv[2])); break;
        case 2: these = toh(atoi(argv[1])); break;
        case 1: these = toh(2); break;
    }
    
    cout << "solution:\n";
    for(auto i = these.begin(); i != these.end(); i++){
        cout << "  ";
        cout << i->a;
        cout << ",";
        cout << i->b;
        cout << "\n";
    }
    
    return 0;
}





/*
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

*/

