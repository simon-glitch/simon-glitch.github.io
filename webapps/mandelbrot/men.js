

cmp(a, b)({
  "left down": cmp(a, c)({
    "left down": "a is heavier",
    "flat": "b is lighter",
    "left up": "paradox",
  }),
  "flat": cmp(c, d)({
    "left down": cmp(a, c)({
      "left down": "paradox",
      "flat": "d is lighter",
      "left up": "c is heavier",
    }),
    "flat": "paradox",
    "left up": cmp(a, c)({
      "left down": "c is lighter",
      "flat": "d is heavier",
      "left up": "paradox",
    }),
  }),
  "left up": cmp(b, c)({
    "left down": "b is heavier",
    "flat": "a is ligher",
    "left up": "paradox",
  }),
})



