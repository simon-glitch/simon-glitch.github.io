
/*
You want to buy gas, but the gas station always rounds the numbers in their favor.

In theory, you can buy gas either by the dollar or by the gallon. The last time I bought gas though, I was given gas by the dollar. But I asked for a specific number of gallons. It seems they calculate by the dollar if you are pre-paying.

The gas price is almost always slightly higher than what is advertised:
* When buying by the gallon, the price is rounded up.
* When buying by the dollar, the gallons given are rounded down.

The only way to buy gas at the advertised gas price is buy gas by the dollar and pay an integer multiple of the gas price. This means you would have to buy an amount of gas equal to a clean integer multiple of 10 gallons. So always buy 10, 20, or similar number of gallons if you can.
*/

/** The price of gas, per whole gallon, in thousandths of dollars,
  * since price signs display 4 digits like that. */
const price = 2899;

/** The number of "thousandths" in a whole. */
const thousand = 1000;

/** The number of "hundredths" in a whole. */
const hundred = 100;

/**
 * Buy gas by the gallon. (gallons => dollars)
 * @param {Number} gallons The number of gallons you are buying (in thousandths of gallons).
 * @returns {Number} The price of the gas (in hundredths of dollars).
 */
function gas_gallon(gallons){
    return Math.ceil(
        Math.ceil(gallons * price / thousand) *
        hundred / thousand
    );
}

/**
 * Buy gas by the dollar. (dollars => gallons)
 * @param {Number} dollars The number of dollars you are paying (in hundredths of dollars).
 * @returns {Number} The number of gallons you will get (in thousandths of gallons).
 */
function gas_dollar(dollars){
    return Math.floor(
        dollars * thousand / hundred *
        thousand / price
    );
}

/** The number of cents in a dollar. */
const cents = hundred;
/**
 * Format money to cents if it's less than a dollar.
 * @param {Number} dollars The number of dollars (in thousandths of dollars).
 * @param {Number} fixed_digits The number of fixed digits
 * to display after the decimal point. Defaults to `2`.
 * @returns {String} The formatted string representing the amount of money.
 */
function to_money(dollars, fixed_digits = 2){
    /** char code 36; */
    const dollar_symbol = "$";
    /** char code 162; */
    const cent_symbol = "¢";
    let use_symbol = "";
    dollars = Number(dollars);
    if(!isFinite(dollars)) return NaN.toString();
    if(dollars < thousand){
        dollars = dollars * cents / thousand;
        use_symbol = cent_symbol;
    }
    else{
        use_symbol = dollar_symbol;
    }
    return use_symbol + dollars.toFixed(fixed_digits);
}

/*
As a consumer, you will need to use a certain amount of gas.
You want to stock extra gas in your car, for convenience,
    but it's okay if you don't fill up the tank all the way.
    Especially if you think the gas price is higher than usual and will be lower next time.
This means the best strategy is to simply buy as much gas as you can
    when you think the price is down, and as little gas as you need to,
    when you think the price is up. So, buy low, and avoid buying high.
However, let's say that for some odd reason, the gas price is the same everywhere,
    all the time. Well, in this case, the optimal strategy is to buy multiples of 10 gallons,
    as I explained earlier. But maybe that's not enough or it's too much.
In which case, it would be nice to have a formula
    to see which amount of dollars is relatively optimal.
*/

/**
 * Calculate the optimal number of dollars to pre-pay for the lowest effective gas price.
 * - `effective_gas_price = dollars / gas_dollar(dollars)`
 * @param {Number} min_gallons The minimum number of gallons you need to purchase
 * (in thousandths of gallons).
 * @param {Number} max_gallons The maximum number of gallons you can purchase
 * (in thousandths of gallons).
 * @param {Boolean} reverse Whether to find the worst number of dollars.
 * - `true` gives the **highest** effective gas price.
 * - `false` gives the **highest** effective gas price.
 * - Defaults to `false`.
 * @returns {Number} `dollars`: the optimal number of dollars to pre-pay
 * (in hundredths of dollars).
 */
function optimal_dollars(min_gallons, max_gallons, reverse = false){
    let dollars = gas_gallon(min_gallons);
    /** `effective_gas_price` */
    let egp = dollars * thousand / hundred * thousand / min_gallons;
    // set dollars to a reasonable starting value
    while(gas_dollar(dollars) > min_gallons) dollars--;
    while(gas_dollar(dollars) < min_gallons) dollars++;
    // What's funny is you might be getting more than min_gallons
    // but that's okay, bc it IS a minimum, and I **tried**
    // to start dollars at the minimum, but it's just not possible
    // to buy that exact number of gallons.
    
    // now, see if any value upto the max is any good
    for(
        let t_dollars = dollars + 1,
        t_gallons = gas_dollar(t_dollars),
        t_egp = 0;
        t_gallons < max_gallons;
        t_dollars++
    ){
        t_gallons = gas_dollar(t_dollars);
        t_egp = t_dollars * thousand / hundred * thousand / t_gallons;
        // check for improvement and use the best number
        if(
            reverse ?
            (t_egp >= egp) :
            (t_egp <= egp)
        ){
            egp = t_egp;
            dollars = t_dollars;
        }
    }
    
    // just return the best number found
    return dollars;
}

/**
 * Calculate the optimal number of gallons to purchase for the lowest effective gas price.
 * - `effective_gas_price = gas_gallon(gallons) / gallons
 * @param {Number} min_gallons The minimum number of gallons you need to purchase
 * (in thousandths of gallons).
 * @param {Number} max_gallons The maximum number of gallons you can purchase
 * (in thousandths of gallons).
 * @param {Boolean} reverse Whether to find the worst number of dollars.
 * - `true` gives the **highest** effective gas price.
 * - `false` gives the **highest** effective gas price.
 * - Defaults to `false`.
 * @returns {Number} `gallons`: the optimal number of gallons to purchase
 * (in hundredths of gallons).
 */
function optimal_gallons(min_gallons, max_gallons, reverse = false){
    let gallons = min_gallons;
    /** `effective_gas_price` */
    let egp = gas_gallon(gallons) * thousand / hundred * thousand / min_gallons;
    
    // now, see if any value upto the max is any good
    for(
        let t_gallons = gallons + 1,
        t_dollars = gas_gallon(t_gallons),
        t_egp = 0;
        t_gallons < max_gallons;
        t_gallons++
    ){
        t_dollars = gas_gallon(t_gallons);
        t_egp = t_dollars * thousand / hundred * thousand / t_gallons;
        // check for improvement and use the best number
        if(
            reverse ?
            (t_egp >= egp) :
            (t_egp <= egp)
        ){
            egp = t_egp;
            gallons = t_gallons;
        }
    }
    
    // just return the best number found
    return gallons;
}

/**
 * Calculate the optimal way to buy gas and how much to pay or buy.
 * - `effective_gas_price = dollars / gallons
 * @param {Number} min_gallons The minimum number of gallons you need to purchase
 * (in thousandths of gallons).
 * @param {Number} max_gallons The maximum number of gallons you can purchase
 * (in thousandths of gallons).
 * @returns {String} explanation of the optimal way to buy the gas, how many dollars it will cost, and how many gallons will be bought.
 */
function optimal(min_gallons, max_gallons){
    // d_: buying by the dollar
    const d_dollars = optimal_dollars(min_gallons, max_gallons);
    const d_gallons = gas_dollar(d_dollars);
    const d_egp = d_dollars * thousand / hundred * thousand / d_gallons;
    // g_: buying by the gallon
    const g_gallons = optimal_gallons(min_gallons, max_gallons);
    const g_dollars = gas_gallon(g_gallons);
    const g_egp = g_dollars * thousand / hundred * thousand / g_gallons;
    
    let gallons = 0, dollars = 0, egp = 0;
    let r_gallons = 0, r_dollars = 0, r_egp = 0;
    let pay_by = "";
    // if dollars are better
    // (default to dollars if dollars and gallons tie)
    const d_better = d_egp <= g_egp;
    if(d_better){
        dollars = d_dollars;
        gallons = d_gallons;
        egp = d_egp;
        pay_by = "dollar";
        r_dollars = optimal_dollars(min_gallons, max_gallons, true);
        r_gallons = gas_dollar(r_dollars);
        r_egp = r_dollars * thousand / hundred * thousand / r_gallons;
    }
    // if gallons are strictly better
    else{
        dollars = g_dollars;
        gallons = g_gallons;
        egp = g_egp;
        pay_by = "gallon";
        r_gallons = optimal_gallons(min_gallons, max_gallons, true);
        r_dollars = gas_gallon(r_gallons);
        r_egp = r_dollars * thousand / hundred * thousand / r_gallons;
    }
    
    return (`Pay by the ${pay_by}.
It will cost ${to_money(dollars / hundred)}.
You will get ${(gallons / thousand)} gallons.
The effective gas price will be ${to_money(egp / thousand, 5)} / gallon.
You "saved" ${to_money(
    // This is the most ridiculous thing ever.
    // Such a scam.
    // Essentially compare the best and worst deals.
    (r_egp - egp) *
    (r_gallons + gallons) / 2 /
    thousand
)}`
    );
}


/*
Now, you really won't save anything significant from doing this. But hey, I'm curious. Just how much could you save in theory if you used this method every time.

Let's look at some different gas-buying strategies, just so we can see who saves the most. This is such a waste of time! 
*/










