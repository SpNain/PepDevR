let fs = require("fs");

let obj = [{
    "Runs" : "10" ,
    "Balls" : "2"
}]

// let jsonObj = JSON.stringify(obj)
// fs.writeFileSync("./a.json" , jsonObj);


let jsonObj = JSON.parse(fs.readFileSync("./a.json"));
console.log(jsonObj);