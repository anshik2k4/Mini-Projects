let btn=document.querySelector("button");

btn.addEventListener("click", async()=>{
let country=document.querySelector("input").value;


let college= await getcollege(country);

getCountry(college);

});

 function getCountry(college ){

    let ul=document.querySelector("ul");
    ul.innerText="";
for(  col of college){
   let list= document.createElement("li");
    list.innerText=col.name;
    ul.appendChild(list);
    console.log(list.innerText);
}

}


let url="http://universities.hipolabs.com/search?name=";

async function getcollege(country){

    try{
    let res=await axios.get(url+country);
    console.log(res.data);
  return res.data;
}
catch(e){
   return e;
}
}

getcollege();
