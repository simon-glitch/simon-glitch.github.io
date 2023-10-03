
import re

brackets = [
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]



def check(s):
  def output(
    message,
    error_message = "", error_index = -1,
    suggest_message = "", suggest_index = -1
  ):
    has_error  = (error_index > -1)
    has_suggest  = (suggest_index > -1)
    l1 = (((" " * error_index) + "^") if (has_error) else (""))
    l2 = error_message
    l3 = ""
    l4 = ""
    if(has_suggest):
      l1 = l1[:(suggest_index-1)] + "^" + l1[suggest_index:]
      l2s = re.search("\S+$", l2[:suggest_index])
      # get the only match, if any
      l2s = "" if (l2s == None) else (
        l2[slice(*l2s.span())]
      )
      l2sl = len(l2s)
      
      l2 = l2[:(suggest_index - l2sl)] + ((" ") * l2sl) + "| " + l2s + l2[suggest_index:]
      
      l3 = (" " * suggest_index) + "|"
      l4 = suggest_message
    
    # dynamic line printing
    if(len(l1)): l1 = "\n" + l1
    if(len(l2)): l2 = "\n" + l2
    if(len(l3)): l3 = "\n" + l3
    if(len(l4)): l4 = "\n" + l4
    if(len(message)): message = "\n" + message
    
    message = s + l1 + l2 + l3 + l4 + message
    return message
  
  curr_type = -1
  prev_types = []
  k = [0]
  kindices = []
  j = 0
  # constant: bracket type count
  btc = len(brackets)
  current = 0
  
  failure = "Imbalanced Brackets"
  
  # used a right bracket when there are no left brackets or current
  def es(j,i):
    return output(failure, error_message=f'Syntax Error: found "{i}" at index {j}! You need to put more left/open brackets at of after index {(kindices[len(kindices) -1]) if (len(kindices) > 0) else (0)}.', error_index=j)
  # used too many of a bracket before changing types
  def el(j,i):
    return output(failure, error_message=f'Syntax Error: found "{i}" at index {j}! Expected "{brackets[curr_type][0]}" at index {(kindices[len(kindices) - 1]) if (len(kindices) > 0) else (0)}.', error_index=j)
  # used too few of a bracket before changing types
  def er(j,i):
    return output(failure, error_message=f'Syntax Error: found "{i}" at index {j}! Expected "{brackets[curr_type][1]}".', error_index=j)
  
  for i in s:
    # print("j", j, "i", i, "k", k, "current", current, "curr_type", curr_type, sep="|  ")
    if(curr_type > -1): k[current] += (
      (1) if(i == brackets[curr_type][0])
      else (
        (-1) if (i == brackets[curr_type][1])
        else (0)
      )
    )
    
    if(curr_type > -1):
      for ibt in range(btc):
        if((ibt != curr_type) and (i not in brackets[curr_type])):
          if(i == brackets[ibt][0]):
            # enter new bracket type
            if(k[current] == 0):
              if(len(prev_types) == 0):
                # same code as the else below this for-loop
                for ibt in range(btc):
                  if(i == brackets[ibt][0]):
                    curr_type = ibt
                    kindices.append(j)
                    k[0] = 1
                    break
                  if(i == brackets[ibt][1]):
                    return es(j,i)
                break
              # print("functioning!")
              # pop off the current stack context
              k.pop()
              kindices.pop()
              curr_type = prev_types.pop()
              current -= 1
              k[current] -= 1
            # append to the current stack context
            k.append(0)
            kindices.append(j)
            prev_types.append(curr_type)
            curr_type = ibt
            current += 1
            k[current] += 1
            print("new type", "i", i, "j", j, "k", k, "current", current, "curr_type", curr_type, "prev_types", prev_types, sep=",  ")
            break
          if(i == brackets[ibt][1]):
            if(k[current] < 0):
              return el(j,i)
            if(k[current] > 0):
              return er(j,i)
            # print("functioning?")
            # pop off the current stack context
            k.pop()
            kindices.pop()
            curr_type = prev_types.pop()
            current -= 1
            k[current] -= 1
            break
    
    # curr_type equaled -1
    # that means that there is no current type
    else:
      for ibt in range(btc):
        if(i == brackets[ibt][0]):
          curr_type = ibt
          kindices.append(j)
          k[0] = 1
          break
        if(i == brackets[ibt][1]):
          return es(j,i)
    
    # oh no!
    if(k[current] < 0):
      return es(j,i)
    
    # don't forget to increment `j`!
    j += 1
  if(k[current] > 0):
    return 'Syntax Error: unexpected end of string! Expected a "' + brackets[curr_type][1] + '" to close off "' + brackets[curr_type][0] + '".'
  
  return 'No errors! Code has balanced brackets.'


tests = {
  "valid": [
    "",
    "()",
    "[]",
    "{}",
    "<>",
    "(())",
    "<(())>",
    "<<>>",
    "{()}",
    "[{()}]",
    "(({{}}))",
    "()()()",
    "[][]",
    "(()[][])",
    "({}[]()<>)",
    "(()(((([][[{<<>{}{{<{}>}}>}]])){})[]))",
    "{}{}{}[][[]]",
    "{{{{}{{}}[]}}}",
    "",
    "",
    "[[[[[]]]]]"
  ],
  "invalid": [
    ")",
    "]",
    "}",
    ">",
    "(",
    "[",
    "{",
    "<",
    "([",
    "()[",
    "(())[",
    "({})<",
    "([{",
    "((]",
    "((>",
    "(()]",
    "(((([][}]))))",
    "(((([][{}])))"
  ]
}


def testall():
  for ti in range(len(tests["valid"])):
    t = tests["valid"][ti]
    # print(f'valid {ti}:\n  "{t}"\n  ' + check(t))

  for ti in range(len(tests["invalid"])):
    t = tests["invalid"][ti]
    # print(f'invalid {ti}:\n' + check(t))




