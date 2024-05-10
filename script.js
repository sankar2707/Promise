const container = document.createElement("div");
container.className = "container";

const title = document.createElement("h1");
title.id = "title";
title.className="text-center";
title.textContent = "Restcountry and Weather";

const row = document.createElement("div");
row.className = "row";

container.append(title);
container.append(row);
document.body.append(container);

fetch("https://restcountries.com/v3.1/all")
  .then((x) => x.json())
  .then((y) => {
    console.log(y);
    for (i = 0; i < y.length; i++) {

const column = document.createElement("div");
column.classList.add("col-lg-4", "col-xl-4","m-2", "col-sm-6", "col-md-4");
column.style.width = "18rem";

const card = document.createElement("div");
card.classList.add("card","col-xl-4","col-lg-4","col-sm-6","h-100","m-2","col-md-4");
card.style.width = "18rem";

const cardBody = document.createElement("div");
cardBody.classList.add("card-body","flex-column","d-flex","justify-content-center","align-items-center");

const cardHeader = document.createElement("div");
cardHeader.classList.add("card-header", "w-100", "text-center");

const country = document.createElement("h4");
country.id = "countryName";
country.textContent = y[i].name.common;

cardHeader.append(country);

  
const flag = document.createElement("img");
flag.id = "flag";
flag.setAttribute("src", y[i].flags.png);
flag.classList.add("card-img-top");
flag.alt = "Flag";


const cardText = document.createElement("div");
cardText.classList.add("card-text");

const capital = document.createElement("p");
capital.innerHTML = `Capital: ${y[i].capital}`;

const region = document.createElement("p");
region.innerHTML = `Region: ${y[i].region}`;

const countryCode = document.createElement("p");
countryCode.innerHTML = `Country Code: ${y[i].cca3}`;

cardText.append(capital);
cardText.append(region);
cardText.append(countryCode);

 
const clickbtn = document.createElement("button");
clickbtn.classList.add("btn", "btn-primary", "button");
clickbtn.textContent = "Click for Weather";

clickbtn.onclick = (function (capital) {
return function () {
controlClick(capital);
          
};
})(y[i].capital);
function controlClick(city) {
        
const apiKey = "eb1c3a568d58f0c9854cfd72f5d5cc1c";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}`;

fetch(apiUrl)
.then((response) => response.json())
.then((data) => {
console.log(data);
let clickResultdiv = card.querySelector("#clickResult");
if (clickResultdiv) {
card.removeChild(clickResultdiv);
  } else {
 clickResultdiv = document.createElement("div");
clickResultdiv.setAttribute("id", "clickResult");
let temp = document.createElement("p");
 temp.classList.add("text-center");
 temp.innerHTML = `Temperature - ${Math.floor(
 data.main.temp - 272.15
   )} °C`;
 clickResultdiv.append(temp);
   let humidity = document.createElement("p");
humidity.classList.add("text-center");
humidity.innerHTML = `Humidity - ${data.main.humidity} %`;
clickResultdiv.append(humidity);

card.append(clickResultdiv);
}
})
.catch((error) => {
console.error("Error occured while fetching weather data:", error.message);
});
}
cardBody.append(cardHeader);
cardBody.append(flag);
cardBody.append(cardText);
cardBody.append(clickbtn);
card.append(cardBody);
column.append(card);
row.append(column);
}
});