let h1=document.querySelector("h1");
let container=document.querySelector(".container");
let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset");
let btns = document.querySelectorAll(".btn");
let body=document.querySelector("body");


let player0=true;
let playerx=false;

for(let box of boxes){
 box.addEventListener("click", function() {

      if(box.innerText!=="") return;
       if(playerx===false){
      box.innerText="X";

      playerx=true;
       }
       else{
        box.innerText="O";
        playerx=false;
       }

      
        checkMatch();
      

    });

}


  function areAllBoxesFilled() {
  for(let box of boxes){
    if(box.innerText =="") {
      return false; // found an empty box
    }
  }
  return true; // all boxes filled
}

const winner=[[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

function checkMatch(){
   for (let pattern of winner) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    )
    {

    
  container.classList.add("winner");
  let message=document.createElement("p");
  message.innerText=`Congrates Dude!!  ${boxes[a].innerText} is the winner`;
  message.classList.add("msg");
 container.parentNode.appendChild(message);

         
    }

else{

    if(areAllBoxesFilled()){

container.classList.add("winner");
  let message=document.createElement("p");
  message.innerText="No one won!! Lets play again";
  message.classList.add("loose");
  container.parentNode.appendChild(message);
}
}
   }
     
}
    


resetbtn.addEventListener("click",()=>{
   window.location.reload();
  
});

