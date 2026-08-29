
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

const leaf = new Leaf("b");
leaf.output_type = "hi";

hydra.language.load({root:{children:[leaf]}});
hydra.parsing.down();
hydra.node_action(Hnode.enter, hydra.parsing.current);

console.log(call_tree);








