
/*
I have a small question:
    If we don't include any I/O, then how do we verify that we calculated the correct values?
    I'm guessing we just run the program in debug mode and inspect the values that way.
    #include <stdio.h>
*/
#include <stdint.h>

int Fib[40] = {0};

// use a function to find the n-th fibonacci number, with n as a parameter
int nth_fib(uint64_t n){
    // store the first 2 fibonacci numbers as variables
    // set a := 0
    uint64_t a = 0;
    // set b := 0
    uint64_t b = 1;
    // if n is 0, then return the base case Fib[0] = 0
    if(n == 0) return a;
    // if n is 1, then return the base case Fib[1] = 1
    if(n == 1) return b;
    // if n is greater than or equal to 2, then iteratively calculate the fibonacci numbers up to the n-th one
    // set i := 0
    uint64_t i = 1;
    // while(i < n):
    for(; i < n; i+=2){
        // rather than using a 3rd variable to store a + b, we will just overwrite a and b
        // at the start of the loop, a is Fib[i-1], and b is Fib[i]
        // we won't need Fib[i-1] anymore after calculating Fib[i+1], so let's overwrite a
        // Fib[i+1] = Fib[i-1] + Fib[i]
        // a := a + b
        a += b;
        // at the start of the loop, b is Fib[i], and is now Fib[i+1]
        // we won't need Fib[i] anymore after calculating Fib[i+2], so let's overwrite b
        // Fib[i+2] = Fib[i] + Fib[i+1]
        // b := a + b
        b += a;
    // i := i + 2
    // a = Fib[i-1] again, rather than Fib[i+1], since the value of i shifted
    // similarly, b = Fib[i] again, rather than Fib[i+2]
    // end while
    }
    
    // now, i either = n or n+1
    // i will = n   if n is odd,
    //      and n+1 if n is even
    // we need to return the n-th fibonacci number either way
    // if n is odd, then i == n,
    // b = Fib[i] = Fib[n],
    // so return b
    if(n % 2 == 1) return b;
    // if n is even, then i == n+1,
    // a = Fib[i-1] = Fib[n+1-1] = Fib[n],
    // so return b
    return a;
// end function
}

int main()
{
    for(int n = 0; n < 40; n++){
        Fib[n] = nth_fib(n);
    }
    return 0;
}
