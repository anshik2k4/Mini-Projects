let container=document.querySelector(".container");
let exchange=document.querySelector(".Exchange-rate");
let input1 =document.querySelector(".input1");
let input2 =document.querySelector(".input2");
let Country1=document.querySelector(".Country1");
let Country2=document.querySelector(".Country2");
let imgsize1=document.querySelector(".imgsize1");
let imgsize2=document.querySelector(".imgsize2");
let body=document.querySelector("body");


 //for Country 1
for(let code in countryList){
    let countrycode=countryList[code];
    let newoption=document.createElement("option");
     newoption.innerText=code;
     newoption.value=code;
       if(newoption.value==="INR"){
             newoption.selected=true;
        }
        Country1.appendChild(newoption);



          let newoption2=document.createElement("option");
     newoption2.innerText=code;
     newoption2.value=code;
      if(newoption2.value==="USD"){
             newoption2.selected=true;
        }
        Country2.appendChild(newoption2);
}


        async function getconversion(base_currency,current_currency){
            let baseurl=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_3fbZcwWgYvVWPYoNKVfTDdU8nyNWeGerMbOYn26w&base_currency=${base_currency}&currencies=${current_currency}`;
            let response= await fetch(baseurl);
            let data= await response.json();
            return data.data[current_currency];
        }

     async function updateconversion(){
          let base_currency=Country1.value;
          let current_currency=Country2.value;

          if(input1.value===""){
            return false;
          }

          let rate= await getconversion(base_currency,current_currency);
           let amount =parseFloat(input1.value);
          let convertedAmount=(rate*amount).toFixed(4);
          input2.value=convertedAmount;

           exchange.innerText=`Exchange Rate 1 ${base_currency} = ${rate.toFixed(4)} ${current_currency}`;

     }


    Country1.addEventListener("change", async function(){
        let selected=this.value;
            changeflag(countryList[selected]);

           await updateconversion();
});


 function changeflag(countrycode){
     let imgsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
     imgsize1.setAttribute("src", imgsrc);
 }

changeflag("IN");


    Country2.addEventListener("change", async function(){
        let selected=this.value;
            changeflag2(countryList[selected]);
            await updateconversion();
});

 function changeflag2(countrycode){
     let imgsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
     imgsize2.setAttribute("src", imgsrc);
 }

 changeflag2("US");

 input1.addEventListener("input", async function(){
     await updateconversion();
 } );


//  Some of conversion will not be done because we are using free appi key which has limited services for us
// like INR,AUD,ILS,PHP,EURO,USD etc we can convert between them beacuse they are  in the features
// Other we are done form our side,,, no logic or implementation is wrong 






 







































