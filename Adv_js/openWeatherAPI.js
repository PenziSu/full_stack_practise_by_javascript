console.log("Hello This is OpenWeather API.");

const myKey = "8a1c582f736a92618cb96c3c43b317e6";
const myCity = "Taichung";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${myKey}`

async function getWeather() {
    let w = await fetch(url);
    let wj = await w.json();
    console.log(wj);
}

getWeather();
