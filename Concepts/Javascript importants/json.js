// JSON=Javascript Object Notation


// To convert json data into js object we use parse() method to convert it.


// let json='{"fact":"The oldest cat on record was Cr\u00e8me Puff from Austin, Texas, who lived from 1967 to August 6, 2005, three days after her 38th birthday. A cat typically can live up to 20 years, which is equivalent to about 96 human years.","length":220}';
// let result= JSON.parse(json);
// console.log(result.fact);

// // Converting Js object into json data we use stringify() method


// let student ={
//      name:"Anshik",
//      roll:12176,
//      section:606,
// };
// let newResult=JSON.stringify(student);
// console.log(newResult);
// console.log(newResult.roll);  //undefined aayega kuki ye json format me hai aur hum js objet format me hi isko acces krskte hai ,,,means wps se parse mathod lgaao ya direct student ke through access kro 
// console.log(newResult.name);  // undefined due to same reason



// fetching Api 

// let url="https://catfact.ninja/fact";

// fetch(url)
// .then((res)=>{
//   console.log("Data 1 passed: "+res);
//   return res.json();  // json  me convertt kr rhee
// }).then((data)=>{  // usko receive kr liye json me converted data ko
//     console.log("this is data: "+data.fact); // print kraa rhe ise 
//     return fetch(url); // again ke url pass kr rhe
// }).then((res)=>{
//     console.log("Data 2 is passed: "+res);
//     return res.json();
// }).then((data)=>{
//     console.log("This is data2: "+data.fact);
// }).catch((err)=>{
//     console.log("Error generated");
// });



// Doing that code using async and await function to reduce the redundancy

// let url="https://catfact.ninja/fact";

// async function getfact(){

//     try{

// let res=await fetch(url); // await ka mtlb jb tk response nhii aata tb tk code aage nhi bdhega 
// console.log(res); // response received
// let data1=await res.json(); // converting it into json
// console.log(data1); // printing the data
// console.log( "the fact of this data is:"+data1.fact); // printing ther data fact 

// let res2=await fetch(url);
// console.log(res2);
// let data2=await res2.json();
// console.log(data2);
// console.log( "the fact of this data2 is:"+data2.fact);
// }

// catch(err){
//     console.log("this is the error");
// }

// console.log("Happy Happy Happy");

// }

// getfact();

// let url = "https://catfact.ninja/fact";
// Yeh URL ek API endpoint hai jo random cat facts deta hai.

// async function getfact() {...}
// Yeh function asynchronous hai, matlab isme await keyword use karke asynchronous operations ko synchronously likh sakte hain.

// try { ... } catch(err) { ... }
// Yeh block errors ko handle karta hai. Agar try block me koi error aayegi to catch block usse pakad lega.

// let res = await fetch(url);
// Yeh line API call karta hai fetch ke through URL par. await ke sath iska matlab hai ki jab tak response nahi aata, aage code nahi chalega.

// console.log(res);
// Yaha response object console me print hoga (isme headers, status, etc. hote hain).

// let data1 = await res.json();
// Yeh response body ko JSON format me convert karta hai.

// console.log(data1);
// Pure JSON data ko console pe print karta hai.

// console.log("the fact of this data is:" + data1.fact);
// JSON object me se fact property ko console pe print karta hai, jo cat fact hota hai.

// Phir wahi process dubara hota hai res2 aur data2 ke sath ek aur cat fact ke liye API ko call karke.

// Agar fetch me error hota hai to catch(err) chalega aur "this is the error" print karega.

// Finally, console.log("Happy Happy Happy"); ye message function ke andar sab operations ke baad print hota hai.

// Important points:
// Because of await, API calls sequentially execute — pehla API call complete hoga, tab dusra shuru hoga.

// "Happy Happy Happy" message tab print hoga jab try/catch block complete ho jata hai.

// Agar API call fail ho jaye to "this is the error" print hoga.

// fetch response object me ok status bhi hota hai,



// using axios to make this code also shorter  so we dont need to convert the response into json format through parse 
// we will get direct json format 


let url="https://catfact.ninja/fact";

async function getfact(){

    try{
    let res= await axios.get(url); // direct json formatt me fetch hoga
    console.log(res);
    console.log( res.data);
    console.log(" Json data fact: "+res.data.fact);
}
catch(err){
    console.log("Error is generated:"+err);
}

}

getfact();
