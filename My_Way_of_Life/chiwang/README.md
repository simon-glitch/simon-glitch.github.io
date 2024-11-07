
# Chiwang Webgame Enging

# Meta
The author hopes that this README document is easy for most users to read.

# About
Chiwang runs a game script in order to load a game. Chiwang can therefore be called a "game engine".

# Audience
This engine is intended to be used by people who are new to game development and/or programming.

## Limitations
The chiwang engine does not teach any user how to make games or programs. The engine simply helps make it easier to make a game, by reducing the amount of code that needs to be written. The engine only works on webpages, and only makes a webgame.

A webgame is a game that can easily be played by anyone, on any device with a web browser. A webgame is usually played by simply going to a webpage (i.e. by loading the webpage within the device's web browser). Typically these games are free, accessible, and open to all players. The chiwang engine is intended to make game's that match this description, but it can be used for other purposes, as long as those purposes are allowed by the copyright.

# Goals
This project will include a JavaScript library, which helps a game script run as a game, by doing the following:
* building the webpage for the game
* making the necessary JavaScript objects, which can be found in `window.Games`
* attaching the necessary event listeners to the webpage

The JavaScript library can simply be included as a script. A developer can do this by adding a script element for it, like so:
* `<script src="./engine.js"></script>`
* This library does not expect to be deferred.
* `.` is a placeholder for the URL to the folder containing the engine.

This project includes the definition of a programming language, called Chiwi.

This project will include an interpreter, called the Chiwang interpreter, which runs a Chiwi file. Every Chiwi file is expected to use the `.chiwi` file extension. Finally, the Chiwi language is designed to be used by the Chiwang interpreter to make webgames, but it could be used in other contexts.

This project will include a transpiler, called the Chiwang transpiler. The Chiwang transpiler can convert between [Idle Game Maker](https://orteil.dashnet.org/igm) (IGM) scripts, Chiwi game scripts, and JS game scripts.
* Some definitions:
    * A Chiwi game script is the contents of a Chiwi file that has been written to be run by the Chiwang interpreter.
    * An IGM game script is a string of text that has been written for the IGM engine to run as a game, as described by its [handbook](https://orteil.dashnet.org/igm).
    * A Chiwi game script is the contents of a Chiwi file that has been written to be run by the Chiwang interpreter.
* Conversions that the Chiwang transpiler can perform:
    * IGM   to Chiwi
    * IGM   to JS
    * Chiwi to JS
* The Chiwang transpiler can not perform any other conversions.

A keen reader might notice that IGM is backwards compatible with Chiwi and Chiwi is backwards compatible with JS. This is intentional.

# See also
More details about the chiwang engine can be seen in the [`./docs`](./docs/intro.md) folder.

# Inspiration
Originally, this project was going to be a remake of IGM, but the author of this project has learned a lot since he first used IGM.
