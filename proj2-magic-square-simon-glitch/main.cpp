#include <iostream>
#include <cmath>
#include <fstream>
#include <time.h>
using namespace std;

// for some reason, JSDocs in VS Code are really janky!
/**
  * Needs to be `17`, because my code adds 2 hidden columns / rows.
  * 
  * - - - -
  * ### Test results
  * 6001 uses about 144 MB, which is much as I'm okay with!
  * ```bash
  | $ ./proj2 5999 1
  | argc = 3
  | | took << 0.328 seconds to build square;
  | | can't print square because it's too big!
  | | magic number seems to be:
  | | | other diagonal = 107946011999
  | | magic number SHOULD BE: 107946011999
  * ```
  * 
  * I tested the new function vs the old one with:
    - `./proj2 5999 1` for the old function
    - `./proj2 5999` for the new function
  * Over 8 trial runs of each function, I found that:
    - the old function took ~0.31125 seconds to run
    - the new function took ~0.42125 seconds to run
    - therefore, the old function is actually 35.3% faster than the new function
**/
#define MAX_SQU_SIZE 17
// allow for insanely large values
// I had a lot of fun testing this code
// it's a shame you weren't able to test it because I forgot to remove a call to fout when I removed everything else related to fout
// I'll use ctrl+f next time, that way I'll know there aren't any calls to anything that will trip up your machine
// I'll also just compile the code, because the compiler made it pretty obvious to me that the last fout needed to be removed
int magic[MAX_SQU_SIZE][MAX_SQU_SIZE] = {0};

/*
Don't read this function. It has little to do with assignment and could've just been accomplished the std function suggested in the instructions
*/
string print_table_slice(int *items, unsigned width, unsigned height, unsigned actual_width){
    unsigned col_widths[width] = {0};
    int *row_index = items;
    
    // maximum size of the type we will be representing with a string
    int max_rep_size = 11; // for `int`
    
    string res = "TABLE:\n";
    
    for(unsigned ix = 0; ix < height; ix++){
        unsigned c_width = 0;
        int *index = row_index + ix;
        
        for(unsigned iy = 0; iy < width; iy++){
            // every int fits in 10 digits
            char buffer[max_rep_size] = {0};
            unsigned length = ((string) itoa(*index, buffer, 10)).length();
            c_width = max(length, c_width);
            index += actual_width;
        }
        
        col_widths[ix] = c_width;
    }
    for(unsigned iy = 0; iy < height; iy++){
        int *index = row_index;
        unsigned *col_width = col_widths;
        
        // padding on the left
        res += "| ";
        
        for(unsigned ix = 0; ix < width; ix++){
            char buffer[max_rep_size] = {0};
            string str = itoa(*index, buffer, 10);
            unsigned length = str.length();
            
            // it's beautiful when seemingly bad code just works
            switch(*col_width - length){
                // this literally adds the number of spaces as specified by (*col_width - length)
                case 15: res += " ";
                case 14: res += " ";
                case 13: res += " ";
                case 12: res += " ";
                case 11: res += " ";
                case 10: res += " ";
                case  9: res += " ";
                case  8: res += " ";
                case  7: res += " ";
                case  6: res += " ";
                case  5: res += " ";
                case  4: res += " ";
                case  3: res += " ";
                case  2: res += " ";
                case  1: res += " ";
                default: break;
            }
            
            res += str;
            res += (ix == width -1) ?"\n" :",";
            
            col_width++;
            index++;
        }
        
        row_index += actual_width;
    }
    
    return res;
}

int loop_square(int *table, int i, unsigned width, unsigned actual_width, int k){
    // move up and to the right; part of I.1
    long long dest = i - ((int) actual_width) + 1;
    // check loop types
    //   I.2 case
    bool loop_up = dest < 0;
    //   I.3 case
    bool loop_ri = (i % actual_width) >= width - 1;
    // value at dest; part of I.4
    int val = (loop_up || loop_ri) ?0 :table[dest];
    // for I.4
    bool weird_down = false;
    
    // weird down movement (I.4)
    if(loop_up && loop_ri){
        weird_down = true;
    }
    // I.2
    else if(loop_up){
        // go down by {width} rows
        dest += actual_width * width;
    }
    else if(loop_ri){
        // go left by {width} columns
        dest -= width;
    }
    
    // more for I.4
    // this is not in the directions: if we move down because of moving out of the square, and then still find a value below us, this next instruction will make us move down AGAIN;
    // however, this does simplify the code, so I'm leaving it here
    // besides, we will never run into a case where we move down twice, as long as everything else is implemented correctly
    if(val > 0){
        weird_down = true;
    }
    
    // final touch for I.4
    if(weird_down){
        dest = i + actual_width;
    }
    
    // use this in the loop so we can keep going
    return dest;
}

/**
This is surprisingly shorter than the ugle mess of the original `do_magic`.

But something feels wrong with how this code is simpler than the hard to read instructions that you gave us. You write like everything is complicated, but it's really not.
**/
void do_magic(int *table, int size){
    int i = (size - 1) / 2;
    const int square = size * size;
    for(int k = 1; k <= square; k++){
        // "place" our integer; part of I.1
        table[i] = k;
        // get pointer to the next square to fill in
        i = loop_square(table, i, size, MAX_SQU_SIZE, k);
        // testing
        if(i < 0 || i > MAX_SQU_SIZE * MAX_SQU_SIZE){
            // cerr << "i = " << i << "\n";
            throw logic_error("i should never have that value");
        }
    }
}

/**
The intstruction that this function follows are:
    description: The following is a procedure for constructing an n x n magic square for any odd integer n.
    
    I.1: Place the integer K, then move up one row and one column to the right, then increment to the next integer (k + 1).
    I.2: If a move takes you above the top row in the jth column, move to the bottom of the jth column and place the integer there. Then CONTINUE.
    I.3: If a move takes you outside to the right of the square in the ith row, move to ith row at the left side, and place this integer there. Then CONTINUE.
    I.4: If a move takes you to an already filled square or if you move out of the square at the upper-right-hand corner, place the integer immediately below the last integer.
**/
void do_magic_old(int *table, int size){
    int inc = (size - 1) / 2;
    int *pindex = table + inc;
    int index = inc;
    int cycle;
    
    const int max_k = size * size;
    for(int k = 1; k <= max_k;){
        int mod;
        
        if(*pindex > 0){
            // I.4 handling
            switch (cycle){
                // case 3 means I.4
                case 3: inc = MAX_SQU_SIZE; goto checks;
                // default means I.1, I.2, and I.3
                default: inc = MAX_SQU_SIZE * 2 - 1;
            }
            // I.2 and I.4: loop from "above" the top row to at the bottom row
            if(index > MAX_SQU_SIZE * (size - 2)) inc -= MAX_SQU_SIZE * MAX_SQU_SIZE;
            goto checks;
        }
        
        // write the integer at the current square
        *pindex = k;
        /*
        k++ actually fits best here, since it's not used below this point in the loop
        moving this can line can cause a bug
        */
        k++;
        
        inc = 1 - MAX_SQU_SIZE;
        
        mod = index % MAX_SQU_SIZE;
        
        // why write 3 if statements when 1 switch statement will do the trick?
        // okay, maybe the switch statement isn't very helpful
        // left part = I.3, right part = I.2
        cycle = (mod >= size - 1) * 2 + (index < MAX_SQU_SIZE);
        switch(cycle){
            // delays I.4 handling until next step, since I.4 doesn't do the looping, but I.2 and I.3 do
            case 3: goto end;
            // if(I.3's rule) do I.3
            case 2: inc -= mod + 1; break;
            // if(I.2's rule) do I.2
            case 1: inc += MAX_SQU_SIZE * size;
            default:;
        }
        
        // this is here so I.4 can skip the loop around the edges used by I.2 and I.3
        // now that I think about it, it might be possible to simplify this code
        checks:
        pindex += inc;
        index += inc;
        
        // this is also here so I.4 can skip not just the looping, but also trigger the special handling in the first switch statement of this loop
        // as I said, I think this code can be simplified, but I don't actually know how
        // maybe I'll come back to it and simplify it
        end:;
    }
}


/*
Other instruction:
    Make sure 1 < (`size` is odd) < 15
*/

/**
  * ### Program parameters
  * `argv[1] =` the number of rows and columns the magic square chould have; must follow `int` formatting rules
  * `argv[2]:` (optional) if given, makes program print 2 extra rows and columns, in order to show the sums of the rows and columns
  * 
  * I'd like to reemphasize: the instructions are actually wrong and this code does not follow them.
  * 
  * I definitely prefer `do_magic_old` over `do_magic`, but that's personal preference;
    - if you want a short function that looks linear, `do_magic` is better;
    - if you want a function that looks like it's skipping steps, because it is, and doesn't use any nasty `else`s, `do_magic_old` is better for that
**/
int main(int argc, char *argv[]) {
    const int fake_max = MAX_SQU_SIZE - 2;
    clock_t start, end;
    double cpu_time_used;
    
    if(argc < 2){
        cerr << "argc must be greater than 1; you need to pass in extra arguments, like this:\n";
        cerr << "$ " << "./proj2" << " " << ((fake_max / 2) + 1 - ((fake_max / 2) % 2));
        return 1;
    }
    
    // size (i.e. width in columns and height in rows) of the magic square
    int size;
    
    try{
        size = atoi(argv[1]);
    }
    catch(exception &e){
        cerr << "User Syntax Error:\n| your string:\n| > ";
        cerr << argv[1];
        cerr << "\n| does not follow C++'s [int] formatting rules;\n";
        return 1;
    }
    if(size < 1 || size > fake_max){
        cerr << "size must be between 1 and " << fake_max << " (inclusive)!";
        return 1;
    }
    if(size % 2 == 0){
        cerr << "size must be odd!";
        return 1;
    }
    
    // make the magic square
    start = clock();
    
    // pass in a 2nd param of any value to test the old function
    if(argc > 2)
        do_magic_old(magic[0], size);
    // pass in just 1 param to test the new function
    else
        do_magic(magic[0], size);
    end = clock();
    cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC;
    cout << "took " << cpu_time_used << " seconds to build square;\n";
    
    // now, let's double check the sums
    // - and store the results in the extra columns and rows on the magic square
    long long other_diag = 0, row_sum, col_sum;
    for(int ix, iy = 0; iy < size; iy++){
        for(ix = 0, row_sum = 0, col_sum = 0; ix < size; ix++){
            // we can just do both of these at once!
            row_sum += magic[iy][ix];
            col_sum += magic[ix][iy];
        }
        
        // apparently casting is different on different sides of the inequality!
        long long *p1 = (long long *) (&(magic[iy][size]));
        long long *p3 = (long long *) (&(magic[size][size]));
        long long *p4 = (long long *) (&(magic[size + 1][size]));
        *p1 = row_sum;
        *p3 += magic[iy][iy];
        *p4 += magic[size - iy - 1][iy];
        // done twice, for clarity in certain cases
        other_diag += magic[size - iy - 1][iy];
        
        // needs split vertically
        int *p2 = &(magic[size][iy]);
        *p2 = col_sum % 0x100000000;
        *(p2 + MAX_SQU_SIZE) = col_sum >> 32;
    }
    
    
    // extra rows and columns to print in the table
    const int ERAC = (argc > 2) ?2 :0;
    // I'm limitting the print size for *reasons*
    if((size + ERAC) * (size + ERAC) < 2*1000){
        start = clock();
        // fun fact: you can't pass a 2D array into a function (or at least, I don't *think* you can)
        cout << print_table_slice(magic[0], size + ERAC, size + ERAC, MAX_SQU_SIZE);
        end = clock();
        cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC;
        cout << "took " << cpu_time_used << " seconds to print square;\n";
    }
    else{
        cout << "can't print square because it's too big!\n";
    }
    cout << "magic number seems to be:\n  other diagonal = " << other_diag << "\n";
    // n*(n+1)/2 is the TOTAL of the whole square, so we just divide that by n to get the total for a column or row
    cout << "magic number SHOULD BE: " << ((size * ((long long) (size * size + 1))) / 2) << "\n";
    
    return 0;
}