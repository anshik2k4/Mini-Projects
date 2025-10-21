// let h1=document.querySelector("h1");

// function demo(color){
//     return new Promise((resolve,reject)=>{
// setTimeout(()=>{
//     let num=Math.floor(Math.random()*5);
// if(num>3){
//     reject("promise rejected");
// }
// h1.style.color=color;
// console.log("color succesfully changed to "+color);
// resolve();
// },2000);
//     });
// }

// async function change(){
//     try{
//     await demo("red");
//    await  demo("purple");
//     await demo("yellow");
//    await  demo("green");
//     await demo("blue");
//     }
//     catch(e){
//         console.log("Error Generated: "+e);
//     }

// let num=5;
// console.log("number is "+(num+2));

// }


// change();


// Api fetch using await and async
let url="https://catfact.ninja/fact2";
async function fetching(){
    try{
    let res= await fetch(url);
    let data= await fetch.json();
    console.log(res);
    console.log(data.fact);

}
catch(err){
    console.log(err);
}
console.log(byee);
}