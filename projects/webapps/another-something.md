


Here is how to refactor an English sentence analytically:

```js
{
  input: "Upon the insistent adjurations of certain brothers I wrote a work — as an example of meditating about the rational basis of faith — in the role of someone who by arguing silently with himself investigates what he does not yet know.",
  key_verbs: [
    {verb: "wrote", subject: "I", object: "a work"},
    {verb: "meditating", subject: "anyone", object: "the rational basis of faith"},
    {verb: "investigates", subject: "someone", object: "what he does not yet know"},
    {verb: "is", implied: true, subject: "a work", object: "an example of meditating about the rational basis of faith"},
  ],
  output: [
    "Upon the insistent adjurations of certain brothers I wrote an essay.",
    "The essay was an example of how someone could meditate about the rational basis of faith.",
    "I wrote the essay in the role of a certain someone.",
    "By arguing silently with himself, that certain someone investigates what he does not yet know.",
  ],
}
```
