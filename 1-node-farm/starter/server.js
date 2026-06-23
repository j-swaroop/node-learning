const http = require("http");
const url = require("url");
const fs = require("fs");

const getHtmlCard = require("./modules/replaceTemplate");

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataList = JSON.parse(data);

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  //   OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(404, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataList
      .map((product) => getHtmlCard(product, templateCard))
      .join("");

    const templatesResult = templateOverview.replace(
      "{%PRODUCT_CARD%}",
      cardsHtml,
    );
    res.end(templatesResult);

    // PRODUCT
  } else if (pathname === "/product") {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    const productObj = dataList[query.id];
    const output = getHtmlCard(productObj, templateProduct);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "some-headers": "Hello",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening");
});
