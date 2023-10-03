

# choice boi!
choices = []
for i in range(64):
  choices.append([])
  for j in range(64):
    # top and bottom are all 1s
    if(i == 0 or j == 0):
      choices[i].append(1)
    # rest is just pascal's triangle, but skewed
    # so just add the neighbor above and the neighbor to the left
    else:
      choices[i].append(choices[i - 1][j] + choices[i][j - 1])

# n choose k
def choose(nn, k):
  # you could dynamically expand choices, but I don't need any n or k beyond 64 for this project
  return choices[nn - k][k]

def factorial(nn):
  f = 1
  for i in range(2, nn):
    f *= i
  return f

while (False):
  n = int(input("n: "))
  k = int(input("k: "))
  print(f"{n} choose {k} = {choose(n, k)};")


# these counts are for 1 player
king_c = 1
queen_c = 1
knight_c = 2
bishop_c = 2
rook_c = 2
pawn_c = 8
piece_c = king_c + queen_c + knight_c + bishop_c + rook_c + pawn_c
# this value is the total number of pieces between both players
#   it is obviously just 32
piece_c_b = piece_c * 2

# we want to account for moves where either side can castle separately
# castling is only possible if the rook and king are in the right place
#   I don't need to account for anything else, as far as that is concerned

def slump(pieces):
  pieces.s.kings = pieces.w.kings + pieces.b.kings
  pieces.s.queens = pieces.w.queens + pieces.b.queens
  pieces.s.rooks = pieces.w.rooks + pieces.b.rooks
  pieces.s.bishops = pieces.w.bishops + pieces.b.bishops
  pieces.s.knights = pieces.w.knights + pieces.b.knights
  pieces.s.pawns = pieces.w.pawns + pieces.b.pawns

def permutate(pieces, total_tiles, white_pawn_only_tiles, black_pawn_only_tiles, s_pawn_tiles):
  # slump(pieces)
  
  remaining = total_tiles
  
  # this won't take too long, right?
  pawn_multiplier = 0
  
  # imagine we have i white pawns in their private tiles, and j black pawns in their private tiles
  for i in range(pieces.w.pawns):
    for j in range(pieces.b.pawns):
      # dont account for impossible placements
      if(i > white_pawn_only_tiles or j > black_pawn_only_tiles):
        continue
      # now just account for the 2 sets of pawns separately
      m1 = choose(white_pawn_only_tiles, i)
      m2 = choose(black_pawn_only_tiles, j)
      # remove pawns from selection
      pieces.w.pawns -= i
      pieces.b.pawns -= j
      
      w_pawn_multiplier = choose(s_pawn_tiles, pieces.w.pawns)
      s_pawn_tiles -= pieces.w.pawns
      b_pawn_multiplier = choose(s_pawn_tiles, pieces.b.pawns)
      
      # multiply all of the independent quantities, and accumulate them!
      pawn_multiplier += m1 * m2 * w_pawn_multiplier * b_pawn_multiplier
      
      # add this back in too
      s_pawn_tiles += pieces.w.pawns
      # add pawns back into selection
      pieces.w.pawns += i
      pieces.b.pawns += j
  
  
  w_king_multiplier = choose(remaining, pieces.w.kings)
  remaining -= pieces.w.kings
  b_king_multiplier = choose(remaining, pieces.b.kings)
  remaining -= pieces.b.kings
  
  w_queen_multiplier = choose(remaining, pieces.w.queens)
  remaining -= pieces.w.queens
  b_queen_multiplier = choose(remaining, pieces.b.queens)
  remaining -= pieces.b.queens
  
  w_rook_multiplier = choose(remaining, pieces.w.rooks)
  remaining -= pieces.w.rooks
  b_rook_multiplier = choose(remaining, pieces.b.rooks)
  remaining -= pieces.b.rooks
  
  w_bishop_multiplier = choose(remaining, pieces.w.bishops)
  remaining -= pieces.w.bishops
  b_bishop_multiplier = choose(remaining, pieces.b.bishops)
  remaining -= pieces.b.bishops
  
  w_knight_multiplier = choose(remaining, pieces.w.knights)
  remaining -= pieces.w.knights
  b_knight_multiplier = choose(remaining, pieces.b.knights)
  remaining -= pieces.b.knights
  
  return (w_king_multiplier * b_king_multiplier * w_queen_multiplier * b_queen_multiplier * w_rook_multiplier * b_rook_multiplier * w_bishop_multiplier * b_bishop_multiplier * w_knight_multiplier * b_knight_multiplier * pawn_multiplier)


def positions_with(pieces, white_rooks_stuck, black_rooks_stuck):
  
  # rooks stuck means kings stuck too
  white_king_stuck = (1 if (white_rooks_stuck > 0) else 0)
  black_king_stuck = (1 if (black_rooks_stuck > 0) else 0)
  # how many kings are stuck (due to rooks being stuck)
  kings_stuck = white_king_stuck + black_king_stuck
  
  # make sure we don't permutate the rooks right now
  pieces.w.rooks -= white_rooks_stuck
  pieces.b.rooks -= black_rooks_stuck
  pieces.w.kings -= white_king_stuck
  pieces.b.kings -= black_king_stuck
  
  # this is the number of ways that the other pieces can be arranged
  other_pieces = permutate(pieces, 
    64 - white_rooks_stuck - black_rooks_stuck - kings_stuck,
    8 - black_rooks_stuck - black_king_stuck,
    8 - white_rooks_stuck - white_king_stuck,
    64 - 8*2
  )
  
  # make sure we can permutate the rooks next time
  pieces.w.rooks += white_rooks_stuck
  pieces.b.rooks += black_rooks_stuck
  pieces.w.kings += white_king_stuck
  pieces.b.kings += black_king_stuck
  
  # this is the number of ways that castling could be allowed or disallowed for each rook
  castling_mult = 2 ** (white_rooks_stuck + black_rooks_stuck)
  
  # how many ways are there that en_passant could be available right now
  en_passant_mult = (pieces.w.pawns + pieces.b.pawns)
  
  # each of the previous 2 values is independent, so we can just multiply them
  return (other_pieces * castling_mult * en_passant_mult)


class sub_pieces_class():
  def __init__(self):
    self.pawns   = pawn_c
    self.knights = knight_c
    self.bishops = bishop_c
    self.rooks   = rook_c
    self.queens  = queen_c
    self.kings   = king_c

class pieces_class():
  def __init__(self):
    self.w = sub_pieces_class()
    self.b = sub_pieces_class()

def all_positions():
  pieces = pieces_class()
  
  positions = 0
  
  for i1  in range(pawn_c):
    pieces.w.pawns -= 1
    for i2  in range(pawn_c):
      pieces.b.pawns -= 1
      for i3  in range(knight_c):
        pieces.w.knights -= 1
        for i4  in range(knight_c):
          pieces.b.knights -= 1
          for i5  in range(bishop_c):
            pieces.w.bishops -= 1
            for i6  in range(bishop_c):
              pieces.b.bishops -= 1
              for i7  in range(rook_c):
                pieces.w.rooks -= 1
                for i8  in range(rook_c):
                  pieces.b.rooks -= 1
                  for i9  in range(queen_c):
                    pieces.w.queens -= 1
                    for i10 in range(queen_c):
                      pieces.b.queens -= 1
                      
                      w_rooks = pieces.w.rooks
                      wrs = 0
                      for i11 in range(w_rooks):
                        wrs += 1
                        pieces.w.rooks -= 1
                        
                        b_rooks = pieces.b.rooks
                        brs = 0
                        for i12 in range(b_rooks):
                          brs += 1
                          pieces.w.rooks -= 1
                          
                          # positions += 1
                          positions += positions_with(pieces, wrs, brs)
                        
                        pieces.b.rooks   = b_rooks
                      pieces.w.rooks   = w_rooks
                    pieces.b.queens  = queen_c
                  pieces.w.queens  = queen_c
                pieces.b.rooks   = rook_c
              pieces.w.rooks   = rook_c
            pieces.b.bishops = bishop_c
          pieces.w.bishops = bishop_c
        pieces.b.knights = knight_c
      pieces.w.knights = knight_c
    pieces.b.pawns   = pawn_c
  pieces.w.pawns   = pawn_c
  
  return positions
  


print("== pos ==")
print(all_positions())
print(positions_with(pieces_class(), 2, 2))


  # I don't need this code, because both players need to have exactly 1 king
  # for i11 in range(king_c):
  #   pieces.w.kings -= 1
  #   for i12 in range(king_c):
  #     pieces.b.kings -= 1
  #     ...
  #   pieces.b.kings   = king_c
  # pieces.w.kings   = king_c





