
# Function to create a string representation of a grid.
# each tuple should be (x, character, y)
def make_str(data: list[tuple[int, str, int]]):
    # grid is a list of rows, top to bottom;
    # each row is a list of characters, left to right;
    # ' ' (space) means that character is not empty
    grid = []
    w = 0
    h = 0
    for (x, char, y) in data:
        if(y + 1 > h):
            grid += [[' '] * w for _ in range(y + 1 - h)]
            h = y + 1
        if(x + 1 > w):
            for i in range(h):
                grid[i] += [' '] * (x + 1 - w)
            w = x + 1
        grid[y][x] = char
    return '\n'.join(''.join(row) for row in grid)

# you'll need to install the 'requests' and 'beautifulsoup4' packages;
import requests
from bs4 import BeautifulSoup

def read_published_doc(url):
    try:
        # fetch the content of the published page
        response = requests.get(url)
        # check for errors
        response.raise_for_status()

        # parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # the content of the doc should be in a div with an id of 'contents'
        content_div = soup.find('div', id='contents')
        
        if content_div:
            # get the text and clean up extra whitespace
            return content_div.get_text(separator='\n').strip()
        else:
            return "Could not find the 'contents' div."
    
    except Exception as e:
        return f"Error: {e}"

def main(url):
    text = read_published_doc(url).split('\n')
    data = []
    i = -1
    x = 0
    char = ''
    y = 0
    for line in text:
        if(i == -1):
            if(line == 'y-coordinate'):
                i = 0
            continue
        if(i == 0):
            x = int(line)
            i = 1
            continue
        if(i == 1):
            char = line
            i = 2
            continue
        if(i == 2):
            y = int(line)
            i = 0
            data.append((x, char, y))
            continue
    
    print(make_str(data))

main(
    # your specific URL
    "https://docs.google.com/document/d/e/2PACX-1vRPzbNQcx5UriHSbZ-9vmsTow_R6RRe7eyAU60xIF9Dlz-vaHiHNO2TKgDi7jy4ZpTpNqM7EvEcfr_p/pub"
)



