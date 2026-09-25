/** @import parser.js */

function test_1(){
    const hydra = new Hydra({input: {root: {
        type: "a",
        children: [{
            type: "b",
        },{
            type: "c",
        },],
    },},});
    
    hydra.execute(new Hydra_Action({
        input: new Head_Action({
            move: Hnode.down,
        }),
    }), hydra.parsing.root);
    
    const leaf = new Leaf({type: "b"});
    leaf.output_type = "hi";
    
    hydra.language.load({root:{children:[leaf]}});
    hydra.parsing.down();
    hydra.node_action(Hnode.enter, hydra.parsing.current);
    console.log(hydra);
}
function test_2(){
    const parser = new Parser({source: "Example text.", steps: [
        new Leaf({type: "E", output_type: "example E"}),
    ]});
    parser.chars();
    parser.parse();
    console.log(parser);
}
function test_3(){
    const parser = new Parser({source: "Example text.", steps: [
        new Layer({type: "char", children: [new Leaf({type: "E", output_type: "example E"})]}),
    ]});
    parser.chars();
    parser.parse();
    console.log(parser);
}

// test_1();
// test_2();
test_3();
console.log(call_tree);





