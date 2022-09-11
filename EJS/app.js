const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")

//middleware
app.use(express.static('public'));

app.get("/", (req, res) => {
    const languages = [
        {name:"Python", rating:9.5,papularity:9.7,trending:"super hot"},
        {name:"Java"  , rating:8.6,papularity:8.2,trending:"same"},
        {name:"C++"   , rating:6.6,papularity:7.7,trending:"same"},
        {name:"PHP"   , rating:2.5,papularity:4.7,trending:"decreasing"},
        {name:"JavaScript", rating:8.5,papularity:8.1,trending:"same"}
    ];        
    res.render("index.ejs", { languages });
});

app.get("/response", (req, res) =>{
    let {fullname, age} = req.query;
    console.log(req.query);
    res.render("response.ejs", {fullname, age});
})

app.get("/:name", (req, res) =>{
    let {name} = req.params;
    res.render("person.ejs", {name : name});
})



app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

