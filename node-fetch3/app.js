import express from 'express';
import ejs from 'ejs';
import fetch from 'node-fetch';

const app = express();

// middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    // const response = await fetch('https://api.github.com/users/github');
    // const data = await response.json();
    // // console.log(data);
    // console.log(data);

    fetch('https://api.github.com/users/github').then((d) => d.json()).then((djs) => { // console.log(djs);

        res.render("index.ejs", {djs});
    });


});

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
