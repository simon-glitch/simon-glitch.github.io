
# Taochi Controls

Keep in mind, these controls are based on a QWERTY keyboard.

First of all, I should clarify that there are 3 types of "interaction" which the webapp records when the user makes inputs. These are:
* Key Input (KI)
* Menu Input (MI)
* Canvas Input (CI)

## Undo History Shenanigans

Each of these can be accessed as a text file. This text file is referred to as the History File (HF). This text file can be edited, in the History Editor (HE). This means that you can arbitrarily modify your "undo history". You can also create macros in this HF, and even manage "undo timelines".

KI actually includes MI and CI, literally. The HE will display actions in the KI HF as combinations of key presses, by default, but they are not internally stored this way. The KI HF actually stores the same actions as the MI HF and CI HF do, and each action in the KI HF will directly point to it's corresponding action in the MI or CI HF. This means that you sometimes can't edit certain pieces of text in both files at the same time, even though you are allowed to edit multiple HFs at the same time (since the HE does allow the existence of multiple cursors).

Since the KI HF stores actions (and not keys), it will auto translate any actions according to the current key mapping. This can go both ways. This is why I made it so you are also able to make KIs "literal": just add "quotes" and the KI will be interpreted literally. In the MI HF and CI HF, this literal KI will be written out as `Literal[your keys here]`.

In case you are wondering *why* I want this much fancy behavior to be available in the HE, well, I think it just makes sense. A lot of applications have support for "undo" and "redo", and sometimes I end up needing a little bit more control of that particular kind. Many people will never use the HE to it's fully capacity. I get that. I just think it would be inconsistent and sometimes inconvenient to not have full control over every last small little thing.

## Mouse Shenanigans
You actually aren't limited to normal mouse movement. You can create cursors. These are objects on the canvas which behave just like your mouse does. These can be manipulated just like other objects, and allow you to make multiple mouse interactions at once.

Upon opening the webapp, you can't interact with the canvas directly. Instead, you have to create a cursor, and then use the cursor. A cursor is created on click though, and it automatically follows the mouse.

This system is a bit janky, but it allows for fine and exact control over your artwork.

## Table of Interactions
This is a list of every MI and what it does.

`Undo KI`:
* Undoes the last KI, and also undoes its respective MI or CI.

`Undo MI`:
* Undoes the last MI, and also undoes its respective KI.

`Undo CI`:
* Undoes the last CI, and also undoes its respective KI.

`Redo KI`:
* Redoes (or just executes) the next KI, and also redoes its respective MI or CI.

`Redo MI`:
* Redoes (or just executes) the next MI, and also redoes its respective KI.

`Redo CI`:
* Redoes (or just executes) the next CI, and also redoes its respective KI.

`Enter HE`:
* Stuff

`Switch Tab`:
* In the canvas: switch between layers.
* In the settings: switch between sections of the settings.
* In the tool menu: switch between sections of the tools menu.
* In the HE: switch between the KI HF, MI HF, and CI HF.

`Summon Cursor`:
* Summon a new cursor. Cursor defaults to being "lifted".

`Drop cursors`:
* Drop all cursors currently being held.

`Deactivate cursors`:
* Deactivate (pause) all cursors currently being held.

`Activate cursors`:
* Activate (unpause) all cursors currently being held.

`Toggle cursors`:
* Toggle Activation of all cursors currently being held.

`Destroy cursors`:
* Destroy all cursors currently being held.

`Toggle mouse selection`:
* Toggle whether the mouse can create selection fields.
* If this is on, then:
    * the mouse can select cursors and objects, as if it was a cursor, without any hassle;
    * and the action `summon selection field` will create a selection field on the mouse (as well as an on all active cursors);
* If this is off, then:
    * the mouse can not select cursors or objects; only cursors can perform selections;
    * and the action `summon selection field` will only create selections from active cursors;

`Summon Selection Field`:
* Starts a selection from all active mouse cursors.
* A selection field is a rectangle, created from a cursor as its origin.
    * All objects within the selection field will be selected.
* This selection allows actions to be performed on those objects, such as moving them, coloring them, copying them, and so on.

`Finalize Selection`:
* Remove all selection fields and keep the objects within them selected.
* This action is only required when distinguishing between resizing objects and resizing selection fields, since the `resize selection field` action takes precedence over the `resize selected object` action.

`Dismiss Selection`:
* Unselects all actively selected objects, and clears any selected objects.

`Resize Selection Field`:
* Enters "object resizing control mode" (CM:OR), with the current selection fields as the active objects.

`Resize Object`:
* Enters "object resizing control mode" (CM:OR), with the selected object as the objects to resize.

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

`Name`:
* Stuff

### While In Resizing Mode
`Continue Left` -> `Expand Left`:
* Expand the left boundary of the object (or selection) to the left.

`Continue Right` -> `Expand Right`:
* Expand the right boundary of the object (or selection) to the right.

`Continue Up` -> `Expand Up`:
* Expand the up boundary of the object (or selection) to the up.

`Continue Down` -> `Expand Down`:
* Expand the down boundary of the object (or selection) to the down.

`Start dragging to Top Left Corner`:
* Obvious.

`Start dragging to Top Right Corner`:
* Obvious.

`Start dragging to Bottom Left Corner`:
* Obvious.

`Start dragging to Bottom Right Corner`:
* Obvious.

#### While in Corner Dragging Mode
`Start dragging to [given] Corner`:
* If the corner is the current corner, exit corner dragging mode (CM:CD), and return to previous control mode.

`Name`:
* Stuff

`Name`:
* Stuff




