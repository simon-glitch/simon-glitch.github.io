
/*
i believe auto sets the type to a function pointer
so the compiler treats defer_func as an anonymous function, compiles its code, stores that somewhere, and leaves a pointer on the stack. i may as well use VS code to double check real quick...
*/

// /*
// not required
#include <stdio.h>
#include <stdlib.h>
// */

int main(int argc, const char *argv[])
{
    auto void defer_func(int*);
    int defer_val __attribute__((__cleanup__(defer_func)));
    void defer_func(int*){ printf("First.\n"); }
    
    printf("Second.\n");
    
    return 0;
}




