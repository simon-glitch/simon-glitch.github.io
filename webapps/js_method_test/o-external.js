SCOPE_TESTING: {

  const a1 = new Num(5);
  const a2 = 5;

  let test1, test2, test3, test4, test5, test6, test7, test8, test9, test10;


  // add ^3
  test1 = function(){
    time((b) => {
      a1.add(
        a1.add(
          a1.add(
            new Num(b)
          )
        )
      );
    }, "add^3").then((v) => {
      console.log("methodized Object add^3:");
      console.log(v);
      
      test2();
    });
  };

  test2 = function(){
    time((b) => {
      a2.add(
        a2.add(
          a2.add(
            b
          )
        )
      );
    }, "add^3").then((v) => {
      console.log("methodized add^3:");
      console.log(v);
      
      test3();
    });
  };

  test3 = function(){
    // then do the 2nd test (i.e. our control group)
    time((b) => {
      a1 + (a1 + (a1 + b));
    }, "add^3").then((v) => {
      console.log("normal add^3:");
      console.log(v);
      
      test4();
    });
  };

  // add ^1
  test4 = function(){
    time((b) => {
      a1.add(new Num(b));
    }, "add^1").then((v) => {
      console.log("methodized Object add:");
      console.log(v);
      
      test5();
    });
  };

  test5 = function(){
    time((b) => {
      a2.add(b);
    }, "add^1").then((v) => {
      console.log("methodized add:");
      console.log(v);
      
      test6();
    });
  };

  test6 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      a2 + b;
    }, "add^1").then((v) => {
      console.log("normal add:");
      console.log(v);
      
      test7();
    });
  };

  // hypot
  test7 = function(){
    time((b) => {
      a1.hypot(new Num(b));
    }, "hypot").then((v) => {
      console.log("methodized Object hypot:");
      console.log(v);
      
      test8();
    });
  };

  test8 = function(){
    time((b) => {
      a2.hypot(b);
    }, "hypot").then((v) => {
      console.log("methodized hypot:");
      console.log(v);
      
      test9();
    });
  };

  test9 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      Math.hypot(a2, b);
    }, "hypot").then((v) => {
      console.log("normal hypot:");
      console.log(v);
      
      test10();
    });
  };

  // base return
  test10 = function(){
    // then do the 2nd hypot test (i.e. our control group)
    time((b) => {
      return a2;
    }, "return").then((v) => {
      console.log("return:");
      console.log(v);
      
      return;
    });
  };

  test1();
}
