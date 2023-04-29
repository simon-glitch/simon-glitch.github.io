const button = document.querySelector("button");
const b_elem = document.querySelector("b");
button.onclick = function(){
  console.log("hiii");
  b_elem.classList.toggle("small_scale");
};

