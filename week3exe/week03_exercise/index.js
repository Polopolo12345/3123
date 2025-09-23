var http = require("http");
var employee = require("./Employee.js");
const { json } = require("stream/consumers");
console.log("Lab 03 -  NodeJs");

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method != 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url == '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
            return;
        }

        if (req.url == '/employee') {
            //TODO - Display all details for employees in JSON format
            res.end(JSON.stringify(employee));
            return;
        }   

        if (req.url == '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            var name = employee.map(e => `${e.firstName} ${e.lastName}`).sort();
            res.end(JSON.stringify(name));
            return;
        }

        if (req.url == '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            let salary = employee.reduce((sum, e) => sum + e.Salary, 0);
            res.end(JSON.stringify({total_salary: salary }));
            return;
        }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})