/*
There was code from Gemini to generate squared square here. But I don't like Gemini's code that much anyways and it was not 100% correct. And it was not finding an elegant solution to find the x coords. I will return to this project and solve the problem on my own.
*/

N = 10000;
sq5 = Math.log(5)/2;
phi = Math.log((1 + Math.sqrt(5))/2);
function fib(n){return (phi*n - sq5)};
s = Array(N).fill(0).map((v,i,a)=>N - i).map(fib).reduce((a,b)=>a + Math.exp(b - fib(N)));
(Math.log(s) + fib(N)) / (Math.LN2 * N)


