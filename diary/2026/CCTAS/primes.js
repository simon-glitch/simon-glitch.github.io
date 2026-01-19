
/*
"prime-factors" Copyright 2024 by Rod Piercel
http://localhost/mathsisfun/app.html?folder=numbers&file=prime-factors
https://www.mathsisfun.com/numbers/images/prime-factors.js

cleaned up by Simanelix;
*/

let w, h;
const my = {};
window.my = my;

async function init() {
    my.version = "0.94 - Simanelix's revision";
	
    // max safe integer in JS;
	my.MAX  = 9007199254740991 ;
	my.MAXB = 9007199254740991n;
    
    // make morePrimes work gradually;
    my.GOAL = 16;
    my.MS_PER_WAIT = 100;
    my.MS_PER_SEARCH = 100;
    
    // fail if numbers take too long to factor;
    my.CHECK_FREQUENCY = 10000;
    my.MS_PER_FACTOR = 1000;
    
	loadLowPrimes();
    await morePrimes();
}

function test() {
	let tests = [
        1, 2, 3, 2000, 20000, 57556, 57557,
        79523, 80089, 82919, 82920, 99907, 9007199254740881, 9007199254740991,
        9, 99, 999, 9999, 99999, 999999, 9999999, 99999999, 999999999, 9999999999,
        99999999999, 999999999999, 9999999999999, 99999999999999, 999999999999999,
        1111111111111111,
        9999999999999999n,
        99999999999999999n,
        999999999999999999n,
        9999999999999999999n,
        99999999999999999999n,
        999999999999999999999n,
        9999999999999999999999n,
        99999999999999999999999n,
        999999999999999999999999n,
        9999999999999999999999999n,
        // how many 9's is reasonable?
        99999999999999999999999999n,
        2n*3n*5n*7n*11n*13n*17n*19n*23n*29n*31n*37n*41n*43n*47n*53n*59n*61n*67n*71n*73n*79n*83n*89n*97n,
        2n*3n*4n*5n*6n*7n*8n*9n*10n*11n*12n*13n*14n*15n*16n*17n*18n*19n*20n,
    ];
    
	for (let i = 0; i < tests.length; i++) {
		let sttTm = performance.now();
        
		let t = tests[i];
		let r = getFactorsB(t);
        
		let elapse = performance.now() - sttTm;
		console.log("test", {elapse, t, r});
	}
}

function addFact(fact, power) {
	for (let i = 0; i < power; i++) {
		my.FArr.push(fact);
	}
}

function getExpFactors(F) {
	let FP = [[F[0], 1]]; // factors and their powers
	let n = 0;
	for (let i = 1; i < F.length; i++) {
		if (F[i] == FP[n][0]) {
			FP[n][1]++;
		} else {
			n++;
			FP[n] = [F[i], 1];
		}
	}
	//console.log("FP",FP.toString());
    
	return FP;
}

/* normal Number methods; */
function getFactors(TheNum) {
	my.FArr = [];
	if (TheNum > my.MAX) {
        console.warn("use getFactorsB for numbers larger than", my.MAX);
		return my.FArr;
	}
    
	my.numLeft = TheNum;
    
	if (my.numLeft == 0 || my.numLeft == 1) {
		return my.FArr;
	}
    
    let doneQ = false;
    let p = 0;
    for (; p < my.lowPrimes.length; p++) {
        if (!testFact(my.lowPrimes[p])) {
            doneQ = true;
            break;
        }
    }
    if (!doneQ) {
        // take advantage of "prime triplets", one of them is divisible by 3 so don't check;
        // move to a multiple of 6, less 1;
        const last = my.lowPrimes[p - 1];
        // so, this rounds down to the nearest value of the form 6n-1, then subtracts 2 to get to the first candidate factor;
        let fact = Math.floor((last + 5) / 6) * 6 - 1;
        while (true) {
            // test +2 and +6: skip +4 as it is a multiple of 3;
            if (!testFact(fact)) break;
            fact += 2;
            if (!testFact(fact)) break;
            fact += 4;
        }
    }
    if (my.numLeft != 1) addFact(my.numLeft, 1);
    
	return my.FArr;
}

function testFact(fact) {
    // early out if not divisible;
    if (my.numLeft % fact != 0) return (my.numLeft / fact) > fact;
    
	let power = 0;
	do {
		power++;
		my.numLeft = my.numLeft / fact;
	} while (my.numLeft % fact == 0);
	if (power != 0) {
		addFact(fact, power);
	}
	return (my.numLeft / fact) > fact;
}

/* BigInt methods; */
function getFactorsB(TheNum) {
    if(typeof TheNum === "number" || TheNum <= my.MAXB) {
        return getFactors(Number(TheNum));
    }
    
	my.FArr = [];
	my.numLeft = TheNum;
    
    let doneQ = false;
    let p = 0;
    for (; my.numLeft > my.MAXB && p < my.lowPrimesB.length; p++) {
        if (!testFactB(my.lowPrimesB[p])) {
            doneQ = true;
            break;
        }
    }
    if (!doneQ && my.numLeft <= my.MAXB) {
        my.numLeft = Number(my.numLeft);
        for (; p < my.lowPrimes.length; p++) {
            if (!testFact(my.lowPrimes[p])) {
                doneQ = true;
                break;
            }
        }
    }
    if (!doneQ) {
        // in-case the second for loop ran;
        my.numLeft = BigInt(my.numLeft);
        
        // take advantage of "prime triplets", one of them is divisible by 3 so don't check;
        // move to a multiple of 6, less 1;
        const last = my.lowPrimesB[p - 1];
        // so, this rounds down to the nearest value of the form 6n-1, then subtracts 2 to get to the first candidate factor;
        let fact = (last + 5n) / 6n * 6n - 1n;
        // run this one initial time;
        testFactB(fact);
        
        let cycle = 0;
        
        const time_start = performance.now();
        while (my.numLeft > my.MAXB) {
            // test +2 and +6: skip +4 as it is a multiple of 3;
            fact += 2n;
            if (!testFactB(fact)) break;
            fact += 4n;
            if (!testFactB(fact)) break;
            
            // check elapsed time occasionally;
            cycle++;
            if(cycle == my.CHECK_FREQUENCY) {
                cycle = 0;
                const time_check = performance.now();
                if(time_check - time_start > my.MS_PER_FACTOR) {
                    console.log(`number has huge factors, greater than ${fact};`);
                    break;
                }
            }
        }
        // only do the rest of this if we are down to a Number;
        if (my.numLeft <= my.MAXB){
        my.numLeft = Number(my.numLeft);
        fact = Number(fact);
        while (true) {
            // test +2 and +6: skip +4 as it is a multiple of 3;
            if (!testFact(fact)) break;
            fact += 2;
            if (!testFact(fact)) break;
            fact += 4;
        }
        }
    }
    if (typeof my.numLeft === "bigint") addFact(my.numLeft, 1);
    else if (my.numLeft != 1) addFact(my.numLeft, 1);
    
	return my.FArr;
}

function testFactB(fact) {
    // early out if not divisible;
    if (my.numLeft % fact != 0n) return (my.numLeft / fact) > fact;
    
    // this can be a Number;
	let power = 0;
	do {
		power++;
		my.numLeft = my.numLeft / fact;
	} while (my.numLeft % fact == 0n);
	if (power != 0) {
		addFact(Number(fact), power);
	}
	return (my.numLeft / fact) > fact;
}

function semiprimeQ(n) {
    // 2 and 3 are handled already;
    return (
        ((((n % 5) ||
        (n % 7)) ||
        ((n % 11) ||
        (n % 13))) ||
        (((n % 17) ||
        (n % 19)) ||
        ((n % 23) ||
        (n % 29)))) ||
        ((((n % 31) ||
        (n % 37)) ||
        ((n % 41) ||
        (n % 43))) ||
        (((n % 47) ||
        (n % 53)) ||
        ((n % 59) ||
        (n % 61))))
    );
}

/* setup functions; */
function loadLowPrimes() {
    // this initital list only needs 2 to 7 to get started;
	my.lowPrimes = [2, 3, 5, 7];
    my.lowPrimesB = my.lowPrimes.map(BigInt);
}

async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function morePrimes() {
    let time_start = performance.now();
    for(let i = my.lowPrimes[my.lowPrimes.length-1] + 2; my.lowPrimes.length < my.GOAL; i += 2) {
        const f = getFactors(i);
        if (f.length == 1 && f[0] == i) {
            my.lowPrimes.push(i);
            my.lowPrimesB.push(BigInt(i));
        }
        
        let time_now = performance.now();
        if (time_now - time_start > my.MS_PER_SEARCH) {
            console.clear();
            console.log(`morePrimes: ${(100 * my.lowPrimes.length / my.GOAL).toFixed(1)}% done;`);
            
            await wait(my.MS_PER_WAIT);
            time_start = performance.now();
        }
    }
}

init().then(() => {
    // test();
});

