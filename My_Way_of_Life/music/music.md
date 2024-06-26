
# Intro

I'm getting pretty annoyed trying to learn music, because I can't get definitions for the most basic pieces of terminology.

The more I think about this, the more I feel like I should hate music *theory*, even though I love music. Being honest, I simply hate the lack of clarification by people who write about music theory. If you are someone who has ever done any writing on this subject, please avoid every talking to me, because we will only ever have angry arguments.

Terms I don't comprehend at all and am going to spend the next week trying to understand:
* note
* frequency
* pitch
* tone
* overtone
* duration
* rythm
* meter
* beat
* measure
* line
* accented
* movement of music (how can music move if it's not a physical object?)
* 
* 
* 

# Aside
Me preparing to write my 100,000 page dictionary on every subject in this world.

# A note
```
A Note = {
    A tone,
    A duration,
    A frequency,
    [optional] An instrument,
}
```

So, a **note** does have a **pitch**. And the pitch is the most prominent **frequency** in the note. Wikepedia says pitch is a perceived phenomenon, but it's not. Pitch is only defined as the perception of frequency when the main frequency can *not* be correctly perceived. As long as the present sounds are easy enough to understand for the listener, the 2 things are the exact same thing with no differences at all.

## A tone
```
A tone = {
    A pitch: main pitch,
    Pitches[]: overtones,
}
```

A **tone** includes a pitch. To be more exact, {a tone} = {a pitch: the main frequency in the tone} + {**overtones**: the secondary frequencies of the tone}. Different instruments can produce different tones (and thus different overtones) when playing notes with the same pitch. i.e. the main frequency in the sounds produced by 2 instruments can be the same, but the overtones are different.

The prominence of an overtone is how noticeable it is (and how much it distracts the listener from the pitch).

A human can sing a tone, but can't really sing *(just)* a pitch, since every voice has an overtone attached to it.
* A pitch is the main sound that a human is trying to produce.
* A tone is the combined *(true / full)* sound being produced instead.
* A note is the tone + duration + *other small details*.

## Types of Notes
A note seems to be able to refer to many things:
* A physical note:
    * The phenonemnon of a sound which has a clear main pitch.
* Functional notes:
    * Notes that are defined by the actions used to to produce physical notes
    * A *human* function note:
        * The process of using an instrument in a specific way to produce a physical note.
        * This can be equivalent to a key, or string.
    * A *physical* function note:
        * A vibration or oscillation that produces a pitch. Notes are represented by symbols that indicate the pitch and length of a musical sound.
* A syntactic note:
    * The musical notation to represent a physical note, or a functional note, whichever one makes more sense in context.
* A tonal note:
    * The description of a note as a tone, or as a pitch accompanied by an overtone.

## Distance or different
The distance of difference between 2 notes is the difference in the Y coordinates of 2 notes as they are placed on a [staff](#a-staff) (see [Notation](#Notation)).

This distance is always a pure, unitless number. The value is calculated as {the measured vertical distance between the notes} divided by {the vertical distance between any pair of the horizontal lines of the staff}. Due to the fact that notes are consistent across different staffs, and have consistent names, the distance between notes can also be measured by assigning indices to their names.

The "notes" (actually, each letter is a set of notes, which are defined very generally here) A, B, C, D, E, F, G have respective indices of 0,1,2,3,4,5,6. If the octave number is declared, using the formatter "[Name][Number]", such as in "D5", then the absolute index of a note is `absIndex(note) = indexOf(Name(note)) + Number(note) * 7`. The distance between two notes is, **therefore**, the difference of the values returned from evaluating `absIndex` on each of them.
* i.e. `diff(note 1, note 2) = absIndex(note 2) - absIndex(note 1)`
* applying `abs` to this result might also make sense
    * i.e. `dist(note 1, note 2) = abs(diff(note 1, note 2))`
    * i.e. `dist(note 1, note 2) = abs(absIndex(note 2) - absIndex(note 1))`

# An interval
The vertical distance between syntactic notes.

# Notation
Western musical notation uses a staff.

## A staff
A staff is a set of 5 equally spaced horizontal lines. These 5 lines represent 1 octave from top to bottom.

