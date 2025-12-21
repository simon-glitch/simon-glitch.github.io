
# Minesweeper basics
In standard minsweeper, a number tile counts the mines in the 8 tiles around. For this encryption method, we modify that. Consider each of the 8 ortho-diagonal directions that come out from a number. We will have the number see a random subset of the tiles in each of the direction, with a distance limit. For example, with a distance limit of 4, if we select 2 numbers frome each direction, the number will see 16 tiles.

Here are the tiles being selected from:
```
O...O...O
.O..O..O.
..O.O.O..
...OOO...
OOOO.OOOO
...OOO...
..O.O.O..
.O..O..O.
O...O...O
```

Here is a possible selection:
```
O........
....O....
..O.O.O..
.....O...
.O.O.O..O
...O.O...
..O......
.........
........O
```

There are (4 choose 2)^8 possible random selections with these params.

We are also going to assume the minesweeper field is a 16x16 grid, and that it is a torus. So for a number in the top right corner, here are all of the squares it could possible see:

```
OOOO.......OOOO.
..............OO
.............O.O
............O..O
...........O...O
................
................
................
................
................
................
................
...O...........O
..O............O
.O.............O
O..............O
```

This could be scaled up to a 256x256 grid, with a max distance of 8, and 4 values selected from each cell. But I don't think that is necessary.

# Encryption
Okay, now that we now how the board works, let's use it to encrypt a value. We will assume that the value we want to encrypt is a sequence of 256 bits. We can interpret each bit as indicating whether there is a mine in that cell or not. Now in minesweeper, the game does not tell you whether each cell has a mine it. Instead, it obfuscates that information by giving you number hints. We will do the same thing for our encryption. So we'll convert out 256 bits into a 256 number vector. A simple matrix, `A`, could be multiplied by the mine vector `x`, to get the hint vector, `y`. You don't need to use linear algebra to find `A` or `x`. You can simply run a minesweeper solver on `y`. And minesweeper solvers are very cheap. We just need some way to make it unclear what the numbers in `y` mean to anyone else. Well, earlier I proposed randomizing the rules for which tiles each number sees. This means randomizing the rows of `A`. However, it's not completely random. Since each number can only see a fraction of the board. Without loss of generality, this is plenty enough for `A` to be practically random.

We'll have some secret key, `s`, and we'll just hash `s` with some salt. This hash needs to be NOT reversible. We can actually include the salt in the message. The secret key can be stored on our device and reused indefinitely. The salt can therefore be completely random. The attacker will probably never even be able to find the hash of `s`, but if they somehow do, the secret key should still be safe.

The hash of `s` will then be used as a random seed. Combining it with the coordinates of each cell in the grid, we can randomly select 16 cells for each number number to look at.

We also need to ensure that the mine density is approximately 50%, So we'll use the same salt from earlier, and hash the entire input string. So `x = hash(actual data, with salt)`. This hash needs to be reversible using the salt. So `actual data = reverse hash(x, with salt)`. The attacker will never be able to find `x`, so them knowing the salt doesn't matter.

Now, just changing which cells the numbers see is not sufficient. But that's okay. We can be clever. First, we need to make it so the numbers vary more. Due to the nature of the binomial distribution, most of the numbers will be close to 8 (since that is half of the number of cells they see). We can fix this by randomly multpiplying the value of each mine by 1 to 4. This can be randomized using the salt of `s`, the same way the numbers were. So numbers now range from 0 to 32, and are slightly more uniform.

Then we can actually only store the numbers mod 4.

Both of these operations mean that solvability is not guaranteed. To fix THAT, we will add an offset of 0 to 3 to each mine's multiplier. The actual multiplier of the mine will be `((base multiplier + offset) mod 4) + 1`. This will also be done with tiles that were not even originally mines. The offset's will also be stored in the final message, and not encrypted. So they can just be completely random.

Now, we can modify these offsets randomly in order to guarantee solvability. This just needs to be random enough that the attacker cannot tell which tiles are mines. I believe we can just select random offsets and then have some kind of solver tweak them. So this should be simple.

Now our minefield is pretty heavily obfuscated. But I think a smart attacker could STILL figure out which tiles are mines, with enough trial and error. The time to do this would probably be `n^3`, where `n =` the number of tiles. But we can easily obfuscate this further, making the required amount of compute explode exponentially. All we need to do is hm... ah, I know. We'll just repeat the process. Our original input was `n` bits, and our stored data is `n*4` (excluding the salt). Let's select a random bit from each of the 4 bits corresponding with each tile. We'll use the hash of the hash of `s` as our seed this time. Now we'll take those randomly selected bits, and we'll just um... encrypt with the same method. And then we'll cycle the resulting bits by a random value from 0 to 6 (there are now 7 bits per tile), using the same seed again. And then we'll repeat that a few more times, growing the data by 3 bits each time.

This is multiplying the final size of our data significantly, so it's a bit data heavy. But even just 5 steps should be sufficient to prevent anyone from ever figuring out, well, anything about any of the intermediate steps. We now have data we can easily and quickly decrypt by just cycling some bits and doing some minesweeper, and the attacker has no idea which bits to cycle where, and no idea which tiles each number looks at or what multiplier each mine has. We could also maybe reuse the offsets to reduce the final size of our data, or make the offsets and multipliers smaller (i.e. offset of 0 or 1 and multiplier of 1 to 2) after the first step. But do we need to? With 5 steps, the final output data is only 16 times the input data. Plus the salt, which is just an encrypted string we slap on the end.

# Conclusion
The time to encrypt and decrypt is simply `O(n)`, while the time to decrypt is some power of `n`, due to all the different things you'd have to brute force. I think even for a quantum computer in the future, this ecryption method would be impossible to crack, and it's far, far simpler than anything else out there. In fact, you can literally run this on the CPU, in JavaScript.

I think I might have come up with something truly revolutionary today.





