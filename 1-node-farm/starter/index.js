const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `Testing the write file ${textIn}`;

fs.writeFileSync("./txt/output.txt", textOut);
