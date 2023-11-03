import js
from js import window

# grab the doc boi
document = window.document
body = document.body
Array = window.Array
Uint8Array = window.Uint8Array

# JavaScript lets us use its methods, and even constructors through proxies
# print(Array(10).fill("stuff"))
# but we can't use the new keyword in Python
# print(Uint8Array(10))
# ^ TypeError: Constructor Uint8Array requires 'new'

# what we can do is just make a new function that handles this
new = (window.Function(
"""return function __new__(constructor, ...args){
    return (new constructor(...args));
}"""
))()

# now, we can construct any JS object
# print(new(Uint8Array, 10))

# this actually works
# for i in (Array(10).fill(0)):
#     print(i)

# this ALSO works!
# for i in (new(Uint8Array, 10)):
#     print(i)


# We can deifne a way better range object in JavaScript
window.UintNArray = (window.Function(
"""return function UintNArray(length, maxabs){
    maxabs ??= length;
    scale = Math.floor(Math.log2(Math.floor(Math.log2(maxabs)))) + 1;
    scale = Math.max(3, scale);
    switch(scale){
        case 3:
            return new Uint8Array(length);
            break;
        case 4:
            return new Uint16Array(length);
            break;
        case 5:
            return new Uint32Array(length);
            break;
        case 6:
            return new BigUint64Array(length);
            break;
        default:
            break;
    }
    throw RangeError(maxabs + " is not a valid maxabs");
}"""
))()

window.Range = (window.Function(
"""return function Range(min, max, sep = 1){
    max ?? (max = min, min = 0);
    length = Math.floor((max - min) / sep);
    if(!(length > 0)) return new Uint8Array();
    
    const maxabs = Math.max(
        (min < 0 ?(1 - min) :min),
        (max < 0 ?(1 - max) :max)
    )
    const arr = UintNArray(length, maxabs);
    
    if(sep > 0)
        for(let j = 0, i = min; j < length; j++, i += sep)
            arr[j] = i;
    if(sep < 0)
        for(let j = 0, i = max; j < length; j++, i -= sep)
            arr[j] = i;
    
    return arr;
}"""
))()

Range = window.Range

class Event:
    """
    The JavaScript Event class.
    """

class HTMLElement:
    """
    The JavaScript HTMLElement class.

    Note: `new(HTMLElement)` is illegal.
    * You will have to use `document.createElement()`
    """
    def addEventListener(
        self,
        eventType: str,
        callback: function
    ) -> None:
        """See [MDN's page](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on `addEventListener` for more details."""
    def removeEventListener(
        self,
        eventType: str,
        callback: function
    ) -> None:
        """See [MDN's page](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) on `removeEventListener` for more details."""


Event = window.Event
HTMLElement = window.HTMLElement

class Any:
    """
    Any object or type available in Python
    """

