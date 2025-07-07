"use stirct"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday" ];
let d = new Date() 
let d2 = (d.getDay() + 1) % 7
let d3 = (d.getDay() + 2) % 7
let today = days[d.getDay()]
let tomorrow = days[d2]
let afterTomorrow = days[d3]
let todaysDate =d.getDate() +" " +months[d.getMonth()]
// /////

let searchInput = document.querySelector(".input") //input-----



searchInput.addEventListener("keyup" ,async function(e){

let data = await dataGetter(e.target.value)
 
display(data)
})

//getting data
async function dataGetter(q) {
    const apiWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d3bfe440edf74c9895d121708250607&q=${q}&days=3`)
 if (apiWeather.ok &&  400 != apiWeather.status)
    {
        let dataIncome = await apiWeather.json()
        console.log(dataIncome);
      return dataIncome
 }else{return []}

}


function display(dataIncome) {
let test = "" ;
if (!dataIncome.location || !dataIncome.current || !dataIncome ){
test =  document.querySelector("section").innerHTML 

} 

else{
 test = `

      <div class="container ">
        <div class="row gap-0">
          <!-- 1 -->
          <div class="col-md-4 today">
            <div class="row py-1">
              <div class="d-flex justify-content-between">
                <p class="day">${today}</p>
                <p class="date">${todaysDate}</p>
              </div>
            </div>
            <div class="content-box">
              <p class="city">${dataIncome.location.name}</p>
              <h2 class="first-degree">${dataIncome.current.temp_c}<sup>o</sup>C</h2>
              <img   class="icon1" src="https:${dataIncome.current.condition.icon}" alt="" />
              <p class="weather-condition">${dataIncome.current.condition.text}</p>
              <p class="wind">7araket el ria7</p>
            </div>
          </div>
          <!-- 2 -->

          <div class="col-md-4 tomorrow">
            <div class="row py-1">
              <div class="d-flex justify-content-center">
                <p>${tomorrow}</p>
              </div>
            </div>
            <div class="content-box next ">
              <img  class="icons" src="https:${dataIncome.forecast.forecastday[1].day.condition.icon}" alt="" />
              <p class="next-degree">${dataIncome.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
              <p class="avg-degree">${dataIncome.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
              <p class="weather-condition1">${dataIncome.forecast.forecastday[1].day.condition.text}</p>
            </div>
          </div>
          <!-- 3 -->
          <div class="col-md-4 after-tomorrow">
            <div class="row py-1">
              <div class="d-flex justify-content-center">
                <p>${afterTomorrow}</p>
              </div>
            </div>
            <div class="content-box next">
              <img class="icons" src="https:${dataIncome.forecast.forecastday[2].day.condition.icon}" alt="" />
              <p class="next-degree">${dataIncome.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
              <p class="avg-degree">${dataIncome.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
              <p class="weather-condition1">${dataIncome.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>
        </div>
      </div>

`

}
    // console.log(test);
    document.querySelector("section").innerHTML = test 


}



window.addEventListener("DOMContentLoaded", async () => {
  let defaultData = await dataGetter("Cairo");
  display(defaultData);
});


