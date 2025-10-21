let input=document.querySelector("input");
let btn=document.querySelector("button");
let ul=document.querySelector("ul");
let li=document.querySelector("li");
btn.addEventListener("click",()=>{
    let task=input.value;
    let item=document.createElement("li");
    let dlte =document.createElement("button");
    dlte.innerText="Delete";
    dlte.classList.add("Delete");
     item.innerText=task;
    item.appendChild(dlte);
    ul.appendChild(item);
    input.value="";



    //  dlte.addEventListener("click",  ()=> {
    //     let par = dlte.parentElement;
    //     par.remove();
    // });


   });


    // through Event delegation propeeties

    ul.addEventListener("click",(event)=>{
    let element=event.target.nodeName;
    if(element=="BUTTON"){
        let par=event.target.parentElement;
        par.remove();
    }

    });
    

