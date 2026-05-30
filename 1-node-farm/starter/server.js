const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is Overview");
  } else if (pathName === "/product") {
    res.end("This is product page");
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "some-headers": "Hello",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening");
});
