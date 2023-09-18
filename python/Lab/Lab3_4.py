"""CS 108 - Lab 3.4

Describe the module here. Fix the lab number above and the name/date below.
Delete the second @author line if working solo.

@author: Simon Willover (saw52)
@date: Fall, 2023
"""

# this function converts the input into the desired output
def dechar(text):
    # store the original text, since we are going to overwrite it on the next line
    ogtext = text
    # sort the string so it is in alphabetcal order
    text = "".join(sorted(text))
    # d is where we count the number of occurences of each letter
    d = [0] * 26
    for i in text:
        # we use ord to get the letter's index; i.e. figure out what letter it is
        d[ord(i) - 97] += 1
    out = ""
    for i in range(len(d)):
        if(0 != d[i]):
            # we then use chr to convert the ordinal indexes in d back to a letter
            out += f"\n{chr(i + 97)}: {d[i]}"
    # this slice [1::] is to remove the newline character from the first line of out
    out = out[1::]
    # this last line gives the length of the text and echoes the text backs
    out += f"\nThere are a total of {len(text)} characters in {ogtext}."
    return out

# we gotta do this weird chunk of stuff for zybooks!
print(dechar(input("Please enter a word consisting of only lower-case English letters >> ")))




