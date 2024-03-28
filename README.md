Simon-glitch, a site by Simanelix.
contact me on reddit as u/Simanalix.

Ooh! I got to 1000 commits on this repository not too long ago!

Current projects:
* (p = priority)

| p | name        | description                                                           |
|---|-------------|-----------------------------------------------------------------------|
| 1 | King Taco   | Web app for a card game, scripted via Python                          |
| 2 | Matrices.js | Simple, performant library for working with matrices (linear algebra) |
| 3 | SSIGM       | My alt version of Orteil's Idle Game Maker                            |
| 4 | Minesweeper | I want to make a good Minesweeper web app one of these days!          |

I haven't really actually done any of these projects yet, since I don't really have the time, motivation, or confidence.

I will complete project #1 within the next 2 weeks.

## Aside
* (March 27, 2024)

Q.4 uses `q.add`, but Q.1 uses `q.append` :frown:; also Q.4 says `v.pushFront` does not exist, but the C++ STL does have one; also, performing multiple insertions to a vector (in the same location) only takes `O(n + i)` time total, where `i` is the number of a new items; this is `O(n/i + 1)` time per individual append; if we amortize over a large value of `i`, this means pushing to inserting in the moddle of a vector takes `O(1)` time;

At location `mySize - 1`. A really fast answer is that arrays and vectors are built in a left-to-right fashion. A better answer is that putting the top at 0 implies you are inserting at 0 and shifting ("pushing") the rest of the vector 1 index to the right. Obviously, shifting a vector/array requires 1 additional operation per item in it, which becomes impractical (or slow) for a large vector/array. I know you asked about a fixed-size array, but I would like to clarify that this answer also applies to vectors.

