const fs = require("fs");

// // Blocking - Synchronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `Testing the write file ${textIn}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// NON-blocking - Asynchronous
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("File written");
      });
    });
  });
});
