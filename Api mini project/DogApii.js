let para=document.querySelector(".para");
let btn=document.querySelector("button");
let body=document.querySelector("body");
let image=document.createElement("img");
body.appendChild(image);

btn.addEventListener("click", async ()=>{
let link= await getDogImages(); // aync isilyee taaki phle link aa jaay phir next work hoga 
image.setAttribute("src",link);
console.log(link);

});

let url="https://dog.ceo/api/breeds/image/random";

async function getDogImages(){
    try {

        let fetching= await fetch(url);
//  let res=await axios.get(url);
let res= await fetching.json();

 return res.message;
//  return res.data.message; // isse hume direct image link milegi 
    }
    catch(e){
        return e;
    }
}

