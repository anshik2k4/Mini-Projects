
let h1=document.querySelector("h1");
let h2=document.querySelector("h2");
let started=false;
let level=0;
let btncolor=["red","green","blue","yellow"];
let userseq=[];
let randomseq=[];
let highscore=0;

window.addEventListener("keypress",()=>{
    if(started===false){
        started=true;
         console.log("game satrted");

  levelup();
    }
});

 function gameflash(Randombtn){
            Randombtn.classList.add("whiteEffect");
            setTimeout(function(){
                Randombtn.classList.remove("whiteEffect");
            },250);
        
     }

      function userflash(Randombtn){
            Randombtn.classList.add("purpleeffect");
            setTimeout(function(){
                Randombtn.classList.remove("purpleeffect");
            },250);
        
     }

    function levelup(){
        userseq=[];
   h2.innerText=`level ${++level}`;
let RandomIdx=Math.floor(Math.random()*4);
let btn=btncolor[RandomIdx];
   randomseq.push(btn);
let Randombtn=document.querySelector(`.${btn}`);
   gameflash(Randombtn);

    }
function checksequence() {
    let idx = userseq.length - 1; // last entered button ka index

    if (userseq[idx] === randomseq[idx]) {
        if (userseq.length === randomseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // galat press hua → check high score
        if (level > highscore) {
            highscore = level;
            h2.innerHTML = `Game Over!! 🎉 New High Score: <b>${highscore}</b>. <br> Press any key to restart`;
        } else {
            h2.innerHTML = `Game Over!! Your Score was <b>${level}</b>. <br> High Score: <b>${highscore}</b> <br> Press any key to restart`;
        }
        reset();
    }
}


    

    function buttonpress(){
      let btnno=this;
      userflash(btnno);
      let usercolor=btnno.getAttribute("id");
      userseq.push(usercolor);
      console.log(userseq);
      checksequence();
    }

    let btnpress=document.querySelectorAll(".container-btn");

    for( let btn of btnpress){
        btn.addEventListener("click",buttonpress);
    }
    function userpress(){

    }
    
    function reset(){
           started=false;
         level=0;
        randomseq=[];
        userseq=[];
    }