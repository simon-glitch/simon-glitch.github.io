  w_pawn_multiplier = choose(remaining, pieces.w.pawns) / factorial(pieces.w.pawns)
  remaining -= pieces.w.pawns
  b_pawn_multiplier = choose(remaining, pieces.b.pawns) / factorial(pieces.b.pawns)
  remaining -= pieces.b.pawns
