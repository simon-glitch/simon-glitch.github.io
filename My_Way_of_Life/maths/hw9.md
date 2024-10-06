
(s = t) == (for all n in N (a_n = b_n))
reason: (implied definition of the equality of 2 sequences);

therefore, by DeMorgan's 1st law for quantifiers:
(not (s = t)) == (exists n in N (not (a_n = b_n)));

lemma 1: {
* for any propositions, p, q, r, and s:
* ((p -> r) and (q -> s)) -> ((p or q) -> (r or s));
* this is a proof by cases, using a truth table;
* t = p -> r
* u = q -> s
* v = t and u
* w = p or q
* x = r or s
* y = w -> x
* z = v -> y
* = ((p -> r) and (q -> s)) -> ((p or q) -> (r or s));
  |p|q|r|s| t|u|v| w|x|y| z|
  |-|-|-|-| -|-|-| -|-|-| -|
  |T|T|T|T| T|T|T| T|T|T| T|
  |T|T|T|F| T|F|F| T|T|T| T|
  |T|T|F|T| F|T|F| T|T|T| T|
  |T|T|F|F| F|F|F| T|F|F| T|
  |T|F|T|T| T|T|T| T|T|T| T|
  |T|F|T|F| T|T|T| T|T|T| T|
  |T|F|F|T| F|T|F| T|T|T| T|
  |T|F|F|F| F|T|F| T|F|T| T|
  |F|T|T|T| T|T|T| T|T|T| T|
  |F|T|T|F| T|F|F| T|T|T| T|
  |F|T|F|T| T|T|T| T|T|T| T|
  |F|T|F|F| T|F|F| T|F|F| T|
  |F|F|T|T| T|T|T| F|T|T| T|
  |F|F|T|F| T|T|T| F|T|T| T|
  |F|F|F|T| T|T|T| F|T|T| T|
  |F|F|F|F| T|T|T| F|F|T| T|
}

(n in A) -> (a_n = 1);
(not (n in A)) -> (a_n = 0);
(n in A) or (not (n in A)) is a tautology, so (a_n = 0) or (a_n = 1) is a tautology too (lemma 1);

(exists n in N (((n in A) and not (n in B)) or (not (n in A) and (n in B)))) -> not (A = B);
