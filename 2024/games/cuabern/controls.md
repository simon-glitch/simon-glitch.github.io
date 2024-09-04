
These are just ideas for the controls for a platformer game with some combat mechanics.

# Controller reference
Switch controller

```
|  [ZL]            [ZR]  |
|  [ L]            [ R]  |
+------------------------+
|  d-pad  middle   mains |
|    ^     s  e      x   |
|  <   >           y   a |
|    V     +  -      b   |
|                        |
| L-stick        R-stick |
```
* L-stick and R-stick will be referred to as LS and RS respectively.

## Input maximization
This section explains how a game can make more distinctions between different buttons on a controller.

In practice, these controls (i.e. input distinctions) could be used to let the player quickly do a wide variety of different things. These controls could even be used to let a player type on a controller, or play certain PC games using a controller instead of a keyboard. However, it would require the player to be quite skilled. This section is simply exploring the possible input space that developers have to work with.

ZL, ZR, L, and R can be toggled on and off independently by most humans with at least 3 fingers on one hand and 4 fingers on the other hand (1 extra finger helps improve controller stability).
* This means 16 possible combinations of toggles.
* Furthermore, and of the 4 buttons on the left and 4 buttons on the right.
    * All of these can be reached easily using either thumb.
    * Both sets of buttons can be controlled separately, so that means there are essentially 21 thumb inputs:
        * 1 thumb input for not pressing any thumb buttons
        * 8 thumb inputs for pressing 1 of the 8 buttons
        * and 16 more thumb inputs for pressing 2 buttons at once
            * however, it is very difficult to distinguish from a player trying to press buttons on both sides and a player trying to quickly press buttons on just 1 side and then press buttons on just the other side
            * therefore, 4 of the thumb inputs need to be removed; in practice, this means that d-pad buttons would do nothing when pressed on their own
* The thumb buttons and the toggles are all independent,
    * so a skillful player can make upto 336 different inputs.
    * Unfortunately, 256 of these require pressing thumb buttons on both sides at once.
        * 128 of those inputs also require using L toggles and R toggles at the same time.
        * No one is going to remember that up + a + L + ZR + R makes the character take their shoes off
    * If we repurpose the d-pad as a set of normal buttons, that leaves us with 128 inputs.
        * However, 64 of these inputs require using L toggles and R toggles at the same time.
        * So let's reduce the number to 64.
    * The 32 remaining d-pad inputs have the problem of occupying the left thumb, which is usually busy controlling the L-stick. The L-stick is usually important for stuff like moving the character around, but the 32 d-pad inputs can still be used.
        * So, d-pad inputs should be used sparingly.
* The middle buttons are a bit too hard to reach for certain gameplay mechanics, such as combat.
    * And adding combos for the middle buttons, such as ZR + s would make them too difficult to use.
    * So they should be reserved for straight forward stuff like opening a pause menu that does not need to be opened too frequently.
    * Its common to categorize the middle buttons as special inputs for this reason.
* That's a total of 72 inputs:
    * 32 are normal inputs.
    * Another 32 are d-pad inputs.
    * And the last 4 are special inputs.

Switch joy-cons have extra motion controls, and the pro controller has some motion controls, but these gimmicks are not necessarily good for all types of play. Therefore, I will not be using them.

Most controllers have a similar button layout, so I will just use this button layout as my standard reference.

# Base controls



