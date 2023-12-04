# King Taco Rules
by Simon Willover.

# About The Game
King Taco was originally a different idea for an even crazier card game.

This version of King Taco is a improvement on another project of mine: Super Uno. Once upon a time, I felt like making an extension of the game Uno. This game is a significant improvement on that project, because:
* the cards are more balanced,
* the rules {are / will be} better fleshed-out,
* and I added more cards and rules!

The idea of Super Uno was to remove all of the boring number cards and make all cards OP. This game actually nerfs non-numbers, by making them require mana. This rule also buffs numbers, by making numbers give mana. There are many other specific rules that are supposed to make the game both strategic and fun. In the future, I will see just how good or terrible these rules are in practice! For now, the game will sit as is, with whichever rules I feel like implementing. I am programming the game after all, so this project will require quite a bit of work.

# About These Rules
I tried to write these rules in a clear and comprehensible manner. I also added in lots of tips, since they make the functionality of cards more clear. Besides, I want players / readers to understand the intention of the cards. Game rules are one thing, but game **design** is much more important. So, this is really a document describing the game's **design**. However, I won't bother to explain how each rule connects to the game's code, since that would be a lot of unnecessary hassle. I will note though, that some of the game's rules are actually designed to make them easier for *me* to program in - i.e. some of the rules are actually intuitive to me, even though they might not be to you.

## Small TODO:
I would like to number each and every clause of the rules, so I can be like, "violation of rule 11.4.2.3", or "exception to rule 5.4.10.3" or whatever. Wouldn't that be fun? Ah yes -- yes it very much **would**, indeed.

# The Deck
The suggested deck is as follows:
* 6 colors of non-wild cards:
    * red, yellow, green, cyan, blue, magenta;
    * each color has the exact same distribution of cards
* 4 numbers cards (per color), numbered 1 to 4
* 1 of each effect card (per color):
    * `inverse`
    * `+= 2`
    * `all ++`
    * `skip`
    * `rage`
    * `calm`
    *  `lock`
    * `go fishing`
    * `shield`
    * `curse`
    * `NOPE`
    * `x2`
    * `-1`
    * `harvest`
* a set of `WILD` cards:
    * 1 plain `WILD` card for each red numbered card,
    * and 1 WILD card for each red effect card.

This equates to `(14 + 4) * 7 = 126` cards. I think that that is enough cards to have a good 'ol time playing the game. It also makes a good weapon if anyone tries to assassinate you before you start setting up the table for King Taco. Haha, lol, JK on that last one!

# Winning The Game
King Taco is similar to UNO in that emptying the hand allows one to win.

Once a player, U, empties U's hand on U's turn:
* U starts an auction to try to win.
* Every player receive an initial 1 `auction poin`t.
* U gets additional `auction point`s equal to U's current mana.
* If U played a number card last, then U will gain additional `auction point`s equal to the number on the card.
* Every **other** player is now given the opportunity to discard 1 number card. This is still considered part of U's turn.
    * If a given player (other than U) has at least 1 number card, they must discard exactly 1 number card of their choice from their hand.
* If the playability condition is current set to the "inverted default", or an `inverted lock`, then:
    * the player with the lowest auction score must try to win;
    * if there is a tie, then a random one of the tying eligible players will be selected, and the selected player must try to win.
* Otherwise:
    * the player with the highest auction score must try to win;
    * if there is a tie, then a random one of the tying eligible players will be selected, and the selected player must try to win.
* Some player, V, who is not necessarily the original U, must now try to win:
    * There is an internal game variable called `goto`; at the start of the game, `goto` starts at `goto = 4`.
    * V now has a random probability of `P = 1 in goto` to win; if this probability succeeds, then V simply wins. If not, then:
        * `goto` will descrease by 1,
        * U will be forced to immedtiately draw 7 cards,
        * U's turn will end,
        * and V's mana will be set to 0.

## Isn't that extremely complicated though?!
Why, yes. Yes it is. I like complexity, so just deal with it, bro!~

# Playing Cards
Given a player, U:
* On U's turn, U will try to play 1 card.
* If U can play a card in U's hand, then U **must** choose a playable card from U's hand and play it.
    * Sometimes, this can happen to U's detriment.
* If U can't play any card (because U has no cards that meet the current playability conditions), then U must draw 1 card.
* If U has been **forced** to draw this turn, *and {U can't stack any card, or U has allowed the effect to trigger}*, then U may not play any cards this turn. U must draw exactly the number of cards specificed by the effect. U does not have to draw any extra cards, regardless of whether U can play this turn.

# Stacking Cards
Often times, an effect card *(named: the 1st card)* can have another effect card *(named: the 2nd card)* stacked on top of it. The effect of the first card will only trigger if the next player *(the player who could have played the 2nd card)* allows it.
* If the next player, U has no card that U can stack on the 1st card, then U is **forced** to allow the effect to trigger.
* U can voluntarily choose to allow the card effect to trigger. In which case, U does not have to tell anyone that U is choosing to do this.
    * This voluntary choice is made simply by playing any stackable card. A card is stackable if the effect rules say that it can be stacked on the current stack.
    * If U chooses to play a stackable card, it always stacks.
        * U can not decide to break the stack and then play the stackable card as the base to a new stack.
        * The stack is **only** broken if the next card can **not** stack.
        * ^ *i.e. The stack breaks when a card that doesn't meet the current stackability condition is played*
        * When the stack is broken, the effect of the stack will trigger, as if the effect was triggered **before** the stacked card was played.
    * If the effect of the stack would require U to draw cards, then U is not even allowed to play a non-stackable card. U is forced to either:
        * Play a stackable card, forcing the effect to be delayed for one turn.
        * OR Draw the required number of cards.
    * For `go fishing`, there is a specific option to **accept** the effect, since `go fishing` changes the game flow and the logic of turns.
* Therefore, other players can not necessarily infer wether U can stack a 2nd card on the 1st card.

Stacking the 2nd card requires the 2nd card to satisfy both the current playability condition AND the current stackability condition.

## Hmm, those rules ALSO seem complex, Simon
Ah, good catch there, reader. Yes, indeed: those rules are extremely complex. You'll just have to memorize them and have fun doing so!~

# Playability Conditions
*(Given that the 2nd card is being played **immeditaley** after the 1st card.)*

The default playability condition, is that:
* the 2nd card has the same color as the 1st card,
* OR the 2nd card has the same symbol as the 1st card,
* OR the 2nd card is a wild.

## Rage
Playability condition created by `rage`:
* the 2nd card exists

So, `rage` allows all cards to be played.

## Calm
Playability condition created by `rage`:
* the 2nd card is not a wild.

## Lock
When the effect of `lock` is applied to U, I can define a lock.
* U can choose any **non-WILD** color  in the game; this will be the color  of the lock
* U can choose any **non-NOPE** symbol in the game; this will be the symbol of the lock

Playability condition created by `rage`:
* the 2nd card has the same color as the lock,
* OR the 2nd card has the same symbol as the lock,
* OR the 2nd card is wild.

## Inverse
The default playability condition, when the playability condition has been reversed by the `inverse` card is that:
* All 3 of the previous conditions are not satisfied. i.e:
    * the 2nd card has a different color than the 1st card,
    * AND the 2nd card has a different symbol than the 1st card,
    * AND the 2nd card is NOT wild.

Therefore, the inverse card can actually block wilds.

### Exceptions to `inverse`
The inverse card can be stacked on top of `calm` and `rage`. When stacked, it simply swaps `calm` with `rage` (and vice versa).
* However, if the inverse is played on a different effect stack, it will actually have **no effect** on the playability condition. Here are some examples:

```
1 {
    green  | rage
    yellow | 5
    blue   | inverse
}
* with 4 players, and no extra turns between card plays
```

In example {1}, the `blue inverse` reverses the direction of play, but doesn't effect the playability condition. The `green rage` card takes precedence. And, no, the `inverse` will not change playability conditions after the `rage` ends.

```
2 {
    green  | rage
    yellow | x2
    blue   | inverse
}
* with 4 players, and no extra turns between card plays
```
In example {2}, the `blue inverse` will in fact stack with `green rage`.

### Inverted Lock
When an odd number of inverses are stacked on a lock, the resulting lock effect will be inverted. We call this an inverted lock.

The inverted lock can be defined by the player receiving the effect; this process is the same as the one used for lock.

The playaility condition of an inverted lock is:
* the 2nd card has a different color than the lock,
* AND the 2nd card has a different symbol than the lock,
* AND the 2nd card is not wild.

So, `inverse` still blocks wilds when used on `lock`. In fact, `lock` -> `inverse` allows the player playing the inverse to define a black list for the lifespan of the inverted lock.

Stacking `inverse` on `lock` delays the effect of the inverted lock for that turn, because stacking always does that.

Playing inverse during the lifespan of a `lock`:
* it does not extend or change the lifespan,
* but it DOES still transform the `lock` into an inverted lock.

# Stackability Conditions
The stackability conditions for cards are extremely consistent.

Basically, you can just use this matrix:
```
[Matrix goes here]
```

The code actually uses a "simpler" method than the matrix, but it is only makes sense to programmers and requires one to learn specific terminology.

Some cards have effects (when stacked) that change the stackability conditions for cards added later in the same stack. These exceptions are explained in the card's specific effect rules.

# Wilds
The key idea with wilds is that they can be played regardless of the {color and symbol} of the {last card or current lock}. Still, swapping the color in a jiffy is really nice.
* However, a `WILD` also triggers a `WILD` effect when played.

## Effect on Plyability Condition
Given a player U plays a `WILD`:
* U must choose a color from the colors in the game; this chosen COLOR is now the color of the wild, with respect to the playability condition
* the next card **played** on top of the meet the current playability condition
* we call this the `WILD` effect

### Additional Playability Condition Effects
A `WILD` is slightly similar to a `lock`, in one *tiny* way.

The `WILD` will restrict the color of the next card played on top of it, if possible.
* This restriction is inverted when the playability condition is inverted by inverse.
    * In the case of the `WILD inverse`, the card sets the color and still inverts the playability condition.
* If a `lock` or `rage` is active, the `WILD` will apply no restriction.
* `WILD` can not be played while `calm` is active, but `lock` can.

The symbol of a `WILD` with no secondary effect is `null`. Non-wild cards do not have this same symbol, and thus can not be played on top it by matching their symbol.

Stacking:
* A card (named: 2nd card) can not be **stacked** on top of a WILD (named: 1st card) when:
    * the 1st card has no secondary effect;
    * the 2nd card does not meet the playability condition, *given that the color of the WILD is the chosen color*

So, `WILD {chosen color = green} All +1 -> inverse` is not a valid card stack,
* *when no other effects are running*.


# Lifespans
Some cards have an effect that alters the game's behvior for a certain period of time. Specifically, `rage`, `calm`, `lock`, `inverse`, `go fishing`, `shield`, and `curse` each have a lifespan of exactly one round.

For all of these cards, x2 doubles the lifespan. This means that it will take twice as many rounds for the effect to end.

What counts as a round. A round is literally one turn per player. If there are 5 players, each round is 5 turns. This is true regardless of changes to the direction of play. If you have house rules that change the order of play, I suggest that you still define a round as simply one turn per player, regardless of these other changes.

Stacking copies of a card increases lifetime by 1.
* `f(x) = x+1` and `g(x) = 2*x` are not commutative. `f(g(x)) != g(f(x))`.
* This means that [`rage` -> `x2` -> `rage`] is not the same as [`rage -> rage -> x2`].
    * [`rage` -> `x2` -> `rage`] triggers a `rage` effect with a lifespan of 3 rounds.
    * [`rage` -> `rage` -> `x2`] has a lifespan of 4 rounds.
    * Make sure to play your `x2` earlier if you don't the effect that much, and later if you want to maximize the effect.

# Mana
Every card requires mana in order to have an effect.
Here is a table of how much mana is needed for each card:

| card name  | mana |
| ---------- | ---- |
| inverse    | 1    |
| += 2       | 1    |
| all ++     | 2    |
| skip       | 2    |
| rage       | 1    |
| calm       | 1    |
| lock       | 2    |
| go fishing | 3    |
| shield     | 1    |
| curse      | 1    |
| NOPE       | 3    |
| x2         | 2    |
| -1         | 1    |
| harvest    | 4    |

Given a player, U:
* if U lacks the mana required for an effect card, and U plays it, the card has no effect. U can not stack a card if U lacks the required mana. U can still play effect cards to gain mana, though
* when U discards a card, U will neither gain nor lose mana
* when U plays a number card, U gains 2 mana
* when U plays an effect card,
    * and DOES have enough mana to activate its effect,
    * U MUST activate its effect card
* when U plays an effect card,
    * and doesn't have enough mana to activate its effect:
    * U gains 1 mana,
    * and the effect can not be activated after this one mana is gained
* when U can't play any card, U loses 1 mana
* if U already has 4 mana, and U tries to gain more, the mana will be capped at 4

Mana is what makes this game highly strategic, with lots of risk and reward.

## Wilds don't require mana, but their effects do
The `WILD` effect from wilds costs no mana. If a `WILD` has another effect attached to it, the secondary effect costs mana.

*So, just the `WILD` effect triggers when U doesn't have enough mana.*

In the case of wilds with secondary effects that change the playability condition:
* The secondary effect activates if U has enough mana; the secondary effect will overwrite the `WILD` effect.
* If U doesn't have enough mana, then the `WILD` effect will trigger instead.

# Effects
Every card requires mana in order to be played. See [#Mana](#mana) for more info.

## Inverse
(`INV` | `inverse`)

Playing an `inverse` on its own will:
    * reverse the direction of play.
    * invert the playability condition for 1 round

Stacking:
* stacking another `inverse` on top of it will:
    * set the direction of play back to what it was before.
    * set the playability condition back to what it was before.

So, any even number of inverses will do nothing.

Basically, `f(x) = -x`

## += 2
(`P2` | `+= 2`)

Playing a `+= 2` will require the next player to draw 2 card on their next turn. This also prevents the next player from playing a card.

A card can still be stacked on the `+= 2` in response though:
* stacking an `inverse` will:
    * reverse the direction of play
    * make the next player (under the now reversed-direction of play) the recipient
    * time out {the player who played the stacked card} (i.e. a `self-skip`), for one turn, as well
* stacking another `+= 2` will:
    * make the next player the recipient
    * increase the number of cards to be drawn by the recipient by 2
* stacking a `skip` will:
    * make the next player (after {the player who played the stacked card}) the recipient
    * time out the player who plays the stacked card (i.e. a `self-skip`), for one turn, as well
* stacking an `all ++` will:
    * make the next player the recipient
    * increase the number of cards to be drawn by the recipient by the number of players
    * force all players other than the recipient to draw 1 card (per `all ++` card in the effect stack) when the recipient draws their card

## All ++
(`AP1` | `all ++`)

On its own, when `All ++` is played:
* everyone is the recipient of the effect.
* the effect is that each recipient must draw 1 (additional) card.
* timeout {the player who played the stacked card} by {1 turn for every card drawn by the next player}

Stacking:
* stacking an `inverse` on `all++` will:
    * reverse the direction of play
    * make the next player (under the now reversed-direction of play) the sole recipient
    * multiply the number of cards to be drawn by {the number of players}
    * that way the next player has to draw all of the cards that everyone else would have drawn **combined!**
* stacking a `+= 2` on `all ++` will:
    * increase the numbers of cards to be drawn by 2.
* stacking a `all ++` on `all ++` will:
    * increase the numbers of cards to be drawn by 1.
* stacking a `skip` on `all ++` will:
    * cause all players to be skipped one time per card that they had to draw
    * make it so that none of the players have to draw (additional) cards.
    Stacking another `all ++` after this will start a new effect chain with just the new `all ++`.

## Skip
(`SKIP` | `skip`)

On it's own, skip causes the next player to get a time out for 1 turn.

The next player can respond to the `skip` before this effect is applied:
* stacking another `skip` will:
    * set the recipient to be the next player after {the player who played the stacked card}
* stacking a `+= 2` will:
    * set the recipient to be the next player after {the player who played the stacked card}
    * increase the length of the timeout by 2
    * force the player who played the stack card to draw 2 cards
* stacking an `all ++` will:
    * cause everyone except {the player who played the stacked card} to receive one turn of timeout for each turn of timeout that {the player who played the stacked card} would have received otherwise.
* stacking an `inverse`:
    * reverse the direction of play
    * set the recipient to be the next player after {the player who played the stacked card}


## Rage
(`RAGE` | `rage`)
The effect of `rage` is explained in [Playability Conditions: Rage].
This effect changes the playability condition for 1 round.
* You can stack another `rage` to increase this duration by 1 round.
* If `rage` is played while another playability condition effect is active (i.e. while under the effect of `calm`, or `lock`), the previous effect will be completely nullified.

`x2`, and `NOPE` stack according to their own rules.

Given a player U:
* If `U` stacks a `+=2` on `rage`, then `rage` will last for 2 more turns, but U will be forced (as the recipient of the effect) to draw 2 cards on their next turn.

## Calm
(`CALM` | `calm`)
The effect of `calm` is explained in [Playability Conditions: Calm].
This effect changes the playability condition for 1 round.
* You can stack another `calm` to increase this duration by 1 round.
* If `calm` is played while another playability condition effect is active (i.e. while under the effect of `rage`, or `lock`), the previous effect will be completely nullified.

`x2`, and `NOPE` stack according to their own rules.

Given a player U:
* If `U` stacks a `+=2` on `calm`, then `rage` will last for 2 more turns, but U will be forced (as the recipient of the effect) to draw 2 cards on their next turn.

## Lock
(`LOCK` | `lock`)
The effect of `lock` is explained in [Playability Conditions: Lock].
This effect changes the playability condition for 1 round.
* You can stack another `lock` to increase this duration by 1 round.
* If `lock` is played while another playability condition effect is active (i.e. while under the effect of `rage`, or `calm`), the previous effect will be completely nullified.

`x2`, and `NOPE` stack according to their own rules.

Given a player U:
* If `U` stacks a `+=2` on `lock`, then `rage` will last for 2 more turns, but U will be forced (as the recipient of the effect) to draw 2 cards on their next turn.

## Go Fishing
(`GOF` | `go fishing`)
Arguable the 2nd most powerful card. This card changes the game rules to `go fishing` mode for 1 round.

## Shield
(`SHE` | `shield`)
The shield protects a player from all other cards for 1 round.

`x2` and `NOPE` can be stacked on the shield.
* An odd number of `NOPE`s will disable the shield.
* Each `x2` doubles the shield,
    * and sets the recipient of the effect to the player who played the `x2`
    * (thus stealing the shield).

## Curse
(`CUR` | `curse`)
Curse prevents a player from being shielded, and can not be applied to a player who has already been shielded.



## NOPE
(`NOPE` | `NOPE`)
This card nullifies the effect of another card. A 2nd `NOPE` can be stacked on top of another `NOPE`, nullifying the 1st `NOPE` and reactivating whichever effect the 1st `NOPE` blocked. *So, NOPES havea right to left evaluation order.*

`NOPE` is bascially the function `f(x) = 0/x`, where {`0/0 = 1`, and `0/x = 0` for all `x != 0`}.
* *If you don't understand that, don't worry. The NOPE card is actually pretty intuitive*.

### NOPE is OP
The `NOPE` card can be played by `U`, even when it is not `U`'s turn, and even when `U` is in timeout.

Playability Conditions for `NOPE`:
* `NOPE` can not be played while under the effect of `go fishing`.
* Futheremore, a `WILD NOPE` can not be played while under the effect of `go fishing`.
* And a `NOPE` must match the color of the current `lock` while under the effect of a `lock`.
* `NOPE` **can** ignore the color of a WILD, and does not need to meet any other playability conditions, as long as it meets the conditions above.

This makes the `NOPE` a general purpose defense against most cards.

### NOPING Yourself Out
The NOPE card should only ever be played in a stack, though. If you play the `NOPE` card as the base of a stack, no other cards can be stacked on top of it, and it will have a gruesome effect:
* When a given player U, playes a `NOPE` as the base of a stack, U thereby NOPES themself out of the game.
* U loses the current game, and can no longer win the current game.
* U should make sure to shuffle U's hand back into the draw pile, before the next player's turn begins.
* The number of turns in a round also decreases by 1, since U is no longer in the game.
* Finally, the next player after U is now the next player after the player who came before U in the turn order.
* ^ Basically:
    * `{A -> U -> B}`, where:
        * `A` is the player before `U` in the default playing order,
        * and `B` is the player after `U` in the default playing order,
    * simplifies to `{A -> B}`

Futhermore, a `NOPE` card can not be stacked on top of another card if it is the only card in U's hand. This means that a player with only 1 card in their hand can't use the `NOPE`'s overpowered rules to get an easy win.

#### Assassinations
You can therefore assassinate another player

## X2
(`X2` | `x2`)
The `X2` has an interesting effect when played on its own.

Given a player U:
* If U plays `X2` as the base of a stack:
    * no other cards can be stacked on top of it;
    * U is forced to immediately draw 1 card;
    * U will gain 1 mana for the 1 card drawn;

Otherwise:
* `x2` can be played on top of these base cards to double their lifespan:
    * `rage`
    * `calm`
    * `lock`
    * `shield`
    * `curse`
    * `go fishing`
    * In the case of all of these, the base card's effect is delayed for one turn, because stacking always delays a card's effect for one turn.
        * Imagine `rage` is played on turn 3, `x2` is played on turn 4, and a `red 3` is played on turn 5. The effect of the `rage` therefore starts on turn 5. The `rage` will last for 2 rounds, starting at and including turn 5. If there are currently 3 players, then the `rage` will end on turn `5 + 3*2 - 1 = 10`. This means that the `rage` effect will be applied **during** turn 10, and not during turn 11.



## --
(`M1` | `--`)
When U plays, this card, U can discard 1 card. U is the recipient of the effect. The effect is triggered when the next player permits U to discard the card, by playing a non-stackable card.

Stacking another card on this card lets the next player steal the discard.

Stacking:
* `x2` will double the number of cards to be discarded
* `--` will increase the number of cards to be discarded by 1
* `+=2` will decrease the number of cards to be discarded by 2
    * if the number becomes 0, then only a `NOPE` card can be stacked
    * a `NOPE` card will set the number of cards to be discarded back to 1
    * if the number, n, goes below 0, then the effect is changed to the effect of a `+=2`, with a draw count of `n` cards to be drawn, and the recipient is pushed to the next player after the last player who put a card in the stack

## Harvest
(`HAR` | `harvest`)
There is a reason `harvest` costs 4 mana to use. It's unfair and devastating to other players.

When U plays `harvest`, U will be the "recipient" of its effect.

The effect lasts for 1 round. The effect is:
* All mana that would normally by gained by any other player, V (for all V != U), is collected by U.
* The mana V already has is not collected. Only new mana influx is collected by U.
* When V spends mana, this still happens at the cost of V's mana supply. U receives all gains and none of the costs.

This can be pretty OP, since it can prevent certain players from collecting the mana they need for future plays.

Only 1 player can `harvest` at a time. Further `harvest` effects will simply overwrite the previous `harvest`. So if V plays a `harvest` card, V will start collecting from that point onwards.

The `harvest` can be stacked on. The `harvest` thus doesn't start until the stack ends. If a player, V, chooses to finish the stack and allow the effect to activate, the effect triggers instantly. The effect will even `harvest` mana collected from V is V draws or plays immediately after the last card in the stack.

Finally, I should note that `harvest` will incinerate mana if U's mana is already at the max capacity. So, if U manages to recover to full mana during the `harvest`, then all mana gains of other players will simply be incinerated (wasted). This is essentially a lose-lose situation for everyone. If U plays another `harvest` while U's own harvest is active, the 2nd harvest will still **overwrite** the 1st. The lifespan of the 1st harvest will not increase by 1 round; rather, the 1st harvest's lifespan is reduced to 0, and the 2nd harvest starts with its normal lifespan of 1 round.

Stacking:
* `x2` and `NOPE` stack as usual.
* Another `harvest` will increase the lifespan by 1 round, and delay the effect from starting for 1 more round, when the 2nd `harvest` is put in the same stack as the 1st.
* `inverse` does not stack with `harvest`

If anyone plays or stacks `go fishing` during a `harvest`, U gains 1 mana from the card. This 1 mana is not affected by anything else stacked on top of `go fishing`.

The `inverse` card actually costs 0 mana during a `harvest`, since it is a good way to waste time that U could potentially be harvesting mana from other players.

## WILDS with Secondary Effects
Many of the WILDS have a secondary effect, such as `+=2`. For simplicity, these effects are exactly the same as the effects of the other colored effect cards. There is no need to have `+=4` or a `SUPER NOPE`. In a previous prototype of this game, I included those as cards, but that just makes WILDS too OP. The `calm` and `inverse` cards already serve an important purpose of making `WILDS` not OP.

If you want to better understand how the `WILD inverse`, `WILD rage`, `WILD calm`, and `WILD lock` work, see:
* [#Wilds: Additional Playability Condition Effects](#Additional-Playability-Condition-Effects)

# Cheating
I don't have any suggestions for how you should handle cheating. I will just trust players to be polite with each other and handle this on their own.


| 3 -1  |  1  0
| 1  0  |  0  1
V
| 0 -1  |  1 -3
| 1  0  |  0  1
V
| 0  1  | -1  3
| 1  0  |  0  1
V
| 1  0  |  0  1
| 0  1  | -1  3


| -6 -3  |  5
| -5 -3  |  2
|  5  6  |  8
V
| -6 -3  |   5
|  0  3  |  10
|  5  6  |   8
V
| -6  0  |  15
|  0  3  |  10
|  5  6  |   8
V
| -6  0  |  15
|  0  3  |  10
|  5  0  | -12
V
|  6  0  | -15
|  5  0  | -12
|  0  3  |  10
V
|  30  0  | -75
|  30  0  | -72
|   0  3  |  10
V
|  30  0  | -75
|   0  0  |   3
|   0  3  |  10
V
|  30  0  | -75
|   0  3  |  10
|   0  0  |   3
V



