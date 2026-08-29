
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
}));

const leaf = new Leaf("b");

hydra.language.load({root:{children:[leaf]}});
hydra.parsing.down();
hydra.node_action(Hnode.enter, hydra.parsing.current);

console.log(call_tree);








