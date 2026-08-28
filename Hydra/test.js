
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

console.log(call_tree);








