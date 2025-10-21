// let id=setInterval(()=>{
//     console.log("The king");

// },3000);

// let id2=setTimeout(()=>{
// clearInterval(id);
// },15000);

// dom practice

// let body=document.querySelector("body");
// let p=document.createElement("p");
// p.innerText="Hi I am red";
// p.style.color="red";
// body.appendChild(p);


// let h3=document.createElement("h3");
// h3.innerText="Hi I am blue";
// h3.style.color="blue";
// body.appendChild(h3);


//   let div=document.createElement("div");
//   div.style.border="2px solid black";
//   let h1=document.createElement("h1");
//   h1.innerText="Hi I am another one  inside div";
//    let para=document.createElement("p");
//   para.innerText="Mee too!!";
// div.style.backgroundColor="pink";

// body.appendChild(div);
// div.appendChild(h1);
// div.appendChild(para);



// Select the body or any container where you want to add elements
const body = document.querySelector("body");

// Create an input element
const input = document.createElement("input");
input.type = "text";  // Optional: set input type

// Create a button element
const button = document.createElement("button");
button.innerText = "Click me";  // Set button text

// Append the input and button to the body (or container)
body.appendChild(input);
body.appendChild(button);
