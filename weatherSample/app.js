const express = require("express");
const app = express();
const ejs = require("ejs");
// const https = require("https");
const fetch = require("node-fetch");

const myKey = "8a1c582f736a92618cb96c3c43b317e6";

function KtoC(k) {
    return(k - 272.15).toFixed(2);
}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/:city", async (req, res) => {
    let {city} = req.params;
    console.log(`Client quering the City:${city}`);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`
    // let d = await fetch(url);
    // let dj = await d.json();
    // console.log(dj);

    // https Method to get API info
    // https.get(url, (response) => {
    //     console.log("statusCode", response.statusCode);
    //     console.log("headers", response.headers);
    //     response.on("data", (d) => {
    //         let djs = JSON.parse(d);
    //         let tempC = KtoC(djs.main.temp)
    //         res.render("weather.ejs", {djs, tempC});
    //     });
    // }).on("error", (e) => {
    //     console.log(e);
    // });

    // node-fetch Method to get API info
    // fetch(url).then((d) => d.json()).then((djs) => {
    //     let {temp} = djs.main;
    //     console.log(temp);
    //     let tempC = KtoC(djs.main.temp);
    //     res.render("weather.ejs", {djs, tempC});
    // });

    let d = await fetch(url);
    let djs = await d.json();
    let {temp} = djs.main;
    let tempC = KtoC(temp);
    res.render("weather.ejs", {djs, tempC});

})


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})
