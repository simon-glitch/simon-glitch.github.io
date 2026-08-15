
function good_number(your_number, radix){
  if(your_number === 1n) return 0n;
  let p = 1n;
  let radix_to_the_power_of_p_minus_1 = radix - 1n;
  while(radix_to_the_power_of_p_minus_1 % your_number /*while mod != 0n*/){
    radix_to_the_power_of_p_minus_1 *= radix;
    radix_to_the_power_of_p_minus_1 += radix - 1n;
    p++;
  }
  return p;
}

function black_magic(number, radix, factors){
  if(number == 0n) return "1/0";
  if(number == 1n) return "1.r";
  const rn = Number(radix);
  let reduced = number;
  const inverse_factors = factors.map(v => radix / v);
  const factor_count = factors.map(v => 0n);
  for(let i = 0; i < factors.length; i++){
    while(!(reduced % factors[i]) /*while mod == 0n*/){
      factor_count[i]++;
      reduced /= factors[i];
    }
  }
  const good_p = good_number(reduced, radix);
  const mul = radix ** good_p;
  let special = good_p ? (mul - 1n) / reduced : 1n;
  // console.log("special", special.toString(rn));
  for(let i = 0; i < factors.length; i++){
    special *= inverse_factors[i] ** factor_count[i];
  }
  const special_twice = special * mul + special;
  // console.log("good_p", good_p);
  // console.log("special later", special.toString(rn));
  // console.log("special_twice", special_twice.toString(rn));
  let repeating_part = "";
  let non_repeating_part = "";
  if(good_p){
    special = special_twice / mul;
    repeating_part = (special % mul).toString(rn);
    non_repeating_part = (special / mul).toString(rn);
  }
  else{
    non_repeating_part = special.toString(rn);
  }
  // console.log("repeating_part", repeating_part);
  // console.log("non_repeating_part", non_repeating_part);
  const lead_digits = Math.max(...factor_count.map(Number));
  // console.log("lead_digits", lead_digits);
  return "0." + non_repeating_part.padStart(lead_digits, "0").slice(0, lead_digits) + "r" + repeating_part.padStart(Number(good_p), "0");
}

for(let i = 2n; i <= 36n; i++){
  console.log(`1/${i} == ${black_magic(i, 2n, [2n])}`);
}

for(let i = 2n; i <= 36n; i++){
  console.log(`1/${i} == ${black_magic(i, 6n, [3n,2n])}`);
}

/*
1/2 == 0.1r
1/3 == 0.r01
1/4 == 0.01r
1/5 == 0.r0011
1/6 == 0.0r01
1/7 == 0.r001
1/8 == 0.001r
1/9 == 0.r000111
1/10 == 0.0r0011
1/11 == 0.r0001011101
1/12 == 0.00r01
1/13 == 0.r000100111011
1/14 == 0.0r001
1/15 == 0.r0001
1/16 == 0.0001r
1/17 == 0.r00001111
1/18 == 0.0r000111
1/19 == 0.r000011010111100101
1/20 == 0.00r0011
1/21 == 0.r000011
1/22 == 0.0r0001011101
1/23 == 0.r00001011001
1/24 == 0.000r01
1/25 == 0.r00001010001111010111
1/26 == 0.0r000100111011
1/27 == 0.r000010010111101101
1/28 == 0.00r001
1/29 == 0.r0000100011010011110111001011
1/30 == 0.0r0001
1/31 == 0.r00001
1/32 == 0.00001r
1/33 == 0.r0000011111
1/34 == 0.0r00001111
1/35 == 0.r000001110101
1/36 == 0.00r000111
*/
