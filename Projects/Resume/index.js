let arrow =
    `<svg viewBox="0 0 5 5">
    <polygon points="2.5,0 0.5,5 4.5,5" class="triangle" />
    Sorry, your browser does not support inline SVG.
    </svg>`
; 
let f = function(q){
  let id, el, which, qq;
  qq = q.querySelector("input");
  if(!qq) return;
  id = qq.id;
  if(!id) return;
  el = document.querySelector("#for-" + id);
  if(!el) return;
  which = qq.checked ?"remove" :"add";
  /*
  which == "add" will hide the element
  which == "remove" will display the element
  */
  el.classList[which]("shrunk");
};

let q = document.querySelectorAll(".collapse");
let g = function(){
  f(this);
};
for(let i = 0, q2; i < q.length; i++){
  q[i].oninput = g;
  q2 = q[i].querySelector("span");
  if(q2) q2.innerHTML += arrow;
  q2 = q[i].querySelector("input");
  if(q2) q2.checked = true;
}

document.querySelector("title").remove();



