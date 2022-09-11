const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
            res.writeHead(200, {"Content-Type":"text/html"});
            res.write(data)
            res.end();
        });
    } else{
        let parsedURL = url.parse(req.url);
        res.write("Hello, " + parsedURL.pathname);
        res.end();
    }
});

server.listen(3501, () =>{
    console.log("Server is running on port 3501.");
})