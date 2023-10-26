
import re
import math

cols = 9
rows = 9

def create_multi_table():
    """Create a formatted multiplication table

    Parameters
    ----------
    None


    Returns
    -------
    A list of lists of integers
        It contains the 81 multiplication results.

    """
    
    return map(lambda row: list(map(lambda x,y: ((x+1)*(y+1)), row, list(range(cols)))), map(lambda x: [x]*cols, list(range(rows))))

# The function for pretty-printing a multiplication table has two parameters: a list of lists for the multiplication table and the number of spaces for each column.

def set_width(text, width, filler = " "):
    while(len(text) < width):
        text = filler + text
    return text

def pprint_multi_table(table, num_space):
    """Pretty-print a multiplication table

    Parameters
    ----------
    table : a list of lists of integers
        It contains all 81 multiplication results.
    num_space : int
        The number of spaces for each column (recommended at least 4)
        In the first column of the results, 3 spaces are used for printing
        " | ".
        There are num_space+3 white spaces before printing the first '-'.


    Returns
    -------
        None
    """
    
    num_space = max(
        num_space,
        math.floor(math.log10(rows * cols)) + 1
    )
    
    row_c = math.floor(math.log10(rows)) + 1
    
    print(
        "A multiplication table:\n\n" +
        (
            " " * (row_c + 1) +
            ''.join(map(
                lambda col_num: (
                    set_width(str(col_num + 1), num_space)
                ),
                list(range(cols))
            )) +
            "\n"
        ) +
        (" " * (row_c + 3) + "-" * (cols * num_space - 2) + "\n") +
        '\n'.join(map(
            lambda row, row_num: (
              set_width(str(row_num + 1), row_c) +
              re.sub(
                  "^   ",
                  " |  ",
                  ''.join(map(lambda cell: set_width(str(cell), num_space), row))
              )
            ), table, list(range(rows))
        ))
    )

pprint_multi_table(create_multi_table(), 6)




