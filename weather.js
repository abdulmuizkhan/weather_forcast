//////////////////////// fetch api data //////////////////////////////////////

const apikey = "3265874a2c77ae4a04bb96236a642d2f";
// const apikeynew="q9VcanMsx5sXK3WifVqUOHtiF76Q1wmn";
const apikeynew="O1RSJryYCJc4cnJGgPw3zPNOo8OAN8f7";
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const url1=(city) =>
     `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikeynew}&q=${city}&language=en-us&details=true`;

const weatherurl=(code)=> 
       `https://dataservice.accuweather.com/currentconditions/v1/${code}?apikey=${apikeynew}&details=true`;

const forcasturl=(code)=>
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${code}?apikey=${apikeynew}&details=true`
 

async function getWeatherByLocation(city) {
     const resp = await fetch(url(city));
     const respData = await resp.json();
     console.log(respData);
     

     const resp1 = await fetch(url1(city));
     const respData1 = await resp1.json();
     console.log(respData1);

     const resp2 = await fetch(weatherurl(respData1[0].Key));
     const respData2 = await resp2.json();
     console.log(respData2);
     
     const forcast = await fetch(forcasturl(respData1[0].Key));
     const forcastdata = await forcast.json();
     console.log(forcastdata);

     addWeatherToPage(respData,respData1,respData2,forcastdata);
 }
 getWeatherByLocation("Akola");

 function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
 /////////////////////////////// add data to page//////////////////////////////////////////
 function addWeatherToPage(data,data1,data2,data3) {
     const temp = Math.floor(data.main.temp-273.15);
     const tem=document.querySelectorAll(".temp");
     const locode=data1[0].Key;
     tem[0].innerHTML=temp+"°C";
     tem[1].innerHTML=temp+"°C";
     tem[2].innerHTML=temp+"°C";
     const loci=document.querySelectorAll(".info");
     const loc=document.querySelectorAll(".icon");
     const con=document.querySelectorAll(".cond");

     for(var i=0;i<3;i++){loc[i].innerHTML = `
         <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
     `;
     con[i].innerHTML=`
     <small>${data.weather[0].main}</small>
     `; 
     loci[i].innerHTML=`
       ${data1[0].EnglishName},${data1[0].AdministrativeArea.EnglishName}
     `;   
  }
////////////////////////////////////////////////
  const wind=document.querySelector('#wind');
      wind.innerHTML=`
         Wind Speed:<br> ${data2[0].Wind.Speed.Metric.Value} ${data2[0].Wind.Speed.Metric.Unit}
      ` ;
      const feel=document.querySelector('#feel');
      feel.innerHTML=`
         Feels Like: ${data2[0].RealFeelTemperature.Metric.Value} °${data2[0].RealFeelTemperature.Metric.Unit}
      `;
      const humid=document.querySelector('#humidity');
      humid.innerHTML=`
      Relative  Humidity:${data2[0].RelativeHumidity}
      ` ;
      const vis=document.querySelector('#vis');
      vis.innerHTML=`
      Visibility:${data2[0].Visibility.Metric.Value} ${data2[0].Visibility.Metric.Unit}
      ` ;
////////////////////////////////////////
  const element=document.querySelectorAll(".nico");
  for(var i=0;i<3;i++){
   if(data3.DailyForecasts[i+2].Day.Icon<10){element[i].innerHTML=`
   <img src="https://developer.accuweather.com/sites/default/files/0${data3.DailyForecasts[i+2].Day.Icon}-s.png" />
   `;}
   else{
       element[i].innerHTML=`
       <img src="https://developer.accuweather.com/sites/default/files/${data3.DailyForecasts[i+2].Day.Icon}-s.png" />
       `;
   }
}

const ntemp=document.querySelectorAll(".ntemp");
for(var i=0;i<3;i++){
 ntemp[i].innerHTML=`
 ${parseInt(((data3.DailyForecasts[i+2].Temperature.Maximum.Value)-32)*5/9)}° C
 `;

}


 
     // cleanup
    
 }
 const form = document.getElementById("form");
 form.addEventListener("submit", (e) => {
     e.preventDefault();
      console.log("submitted")
     const city = search.value;
 
     if (city) {
         getWeatherByLocation(city);
     }
 });

//////////////////////////// Day and date ////////////////////////////////////////////////////////////

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day=["Sun","Mon","Tus","Wed","Thur","Fri","Sat"];
const d = new Date();
document.querySelector(".date").innerHTML=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
function display(){
    var refresh=1000; 
    mytime=setTimeout('displaytime()',refresh)
    }
function displaytime(){
    const x = new Date();
    var hour=x.getHours();
    var min=x.getMinutes();
    var sec=x.getSeconds();
    var suf="AM";
    if(hour>=12) {suf="PM";hour=hour-12;}
    if(min<10) min='0'+min;
    if(sec<10) sec='0'+sec;
document.querySelector(".time").innerHTML=hour+":"+min+":"+sec+" "+suf;
display();
}
displaytime();
document.querySelector("#day2").innerHTML=day[d.getDay()];
var pre=d.getDay()-1;
var next=d.getDay()+1;
if(pre==-1) pre=6;
document.querySelector("#day1").innerHTML=day[pre];
var ele=document.querySelectorAll(".day");
for(var i=0;i<ele.length;i++){
    if(next==7) next=0;
    ele[i].innerHTML=day[next];
    next++;
}

/////////////// box hover//////////////////////////////////////////////////////////////////////////////////

{var bx=document.querySelectorAll(".box");
bx[1].addEventListener('mouseover',function(){
     bx[1].style.height='320px';
     bx[1].style.width='210px';
     bx[1].style.background="white";
     bx[2].style.height='300px';
     bx[2].style.width='190px';
     bx[2].style.backgroundColor="rgb(255, 255, 255,0.6)";
    
});
bx[1].addEventListener('mouseout',function(){
     bx[1].style.height='300px';
     bx[1].style.width='190px';
     bx[1].style.background="";
     bx[2].style.height='320px';
     bx[2].style.width='210px';
     bx[2].style.background="white";

     
});
bx[3].addEventListener('mouseover',function(){
     bx[3].style.height='320px';
     bx[3].style.width='210px';
     bx[3].style.background="white";
     bx[2].style.height='300px';
     bx[2].style.width='190px';
     bx[2].style.backgroundColor="rgb(255, 255, 255,0.6)";
     
});
bx[3].addEventListener('mouseout',function(){
     bx[3].style.height='300px';
     bx[3].style.width='190px';
     bx[3].style.background="";
     bx[2].style.height='320px';
     bx[2].style.width='210px';
     bx[2].style.background="white";
     
});
}

////////////////////////////// city and temp////////////////////////////////////////////////
