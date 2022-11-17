/*
This code is authored solely by Simon Willover
Simon will add more of these in the future
*/

// these 2 functions are so nice!
let to_day = function(str){
  let now = new Date();
  // empty date => today / now
  if(!str || str.match(/now|tod(ay)?/i)) return Date();
  
  // just a day of the week
  let days = ("sun,mon,tue,wed,thu,fri,sat").split(",");
  if(str.match(new RegExp("^\\s*("+ days.join("|") +")\\w*\\s*$", "i")) !== null){
    let goto = days.indexOf(str.match(/\w\w\w/)[0].toLowerCase());
    let curr = days.indexOf(now.toString().match(RegExp("\\b"+ days.join("|"), "i")[0]).toLowerCase());
    goto -= curr;
    goto += goto<0 ?7 :0;
    return new Date(now.getTime() + 1000*86400*goto);
  }
  
  let months = ("jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec").split(",");
  
  // just a month
  if(str.match(new RegExp("^\\s*("+ months.join("|") +")\\w*\\s*$", "i")) !== null) return str +" 1 "+ now.getFullYear();
  
  let days_per_month = [31,28,31,30,31,30,31,31,30,31,30,31];
  let then = new Date(now);
  then.setFullYear(now.getFullYear() +1);
  let days_this_year = (then.getTime() - now.getTime()) /1000 /86400;
  // put the leap day in february
  days_per_month[1] += days_this_year -365;
  // just a number or nth
  if(str.match(/^\s*\d+(st|nd|rd|th)?\s*$/i) !== null){
    let goto = str.match(/\d+/);
    let curr = now.getDate();
    goto -= curr;
    goto += goto<0 ? days_per_month[now.getMonth()] :0;
    return new Date(now.getTime() + 1000*86400*goto);
  }
  
  // just a month number and a day
  str = str.replace(/^\s*(\d+)[\\ \/](?=\s*\d+(st|nd|rd|th)?\s*$)/i, months[str.match(/\d+/)]+" ");
  
  // just a month name and a day
  if(str.match(new RegExp("^\\s*("+ months.join("|") +")\\w+\\s*\\d+(st|nd|rd|th)?\\s*$", "i")) !== null) str += " "+ now.getFullYear();
  
  
  return new Date(str);
};
let days = function(str1, str2){
  str1 = to_day(str1);
  str2 = to_day(str2);
  console.log(str1)
  return Math.floor(Math.abs( ((new Date(str1)).getTime() - (new Date(str2)).getTime()) /1000 /86400 ));
};
