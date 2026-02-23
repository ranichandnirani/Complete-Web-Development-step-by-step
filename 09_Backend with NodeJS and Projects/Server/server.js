const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

// creat a server

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);

    console.log(filePath);
    // extention name
    const extName = String(path.extname(filePath)).toLowerCase();

    // allow file type supporting
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',

    };
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    // fs read something from file and serve that 
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === "ENOENT") {
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("404: File Not Found");
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { "content-type": contentType});
            res.end(content, "utf-8");
        }
    });
});


server.listen(port, () => {
    console.log(`Server is listning on port ${port}`);
});