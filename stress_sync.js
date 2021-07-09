/*  
    Pushes 200 synchronous requests one after the other. 
    A request is sent only after the one before it is processed and responded on.
    Response and processing time for each request is shown in console output. 
    Shows how much time it would take to send 200 requests to Service Now if the 
    requests are sent in synchronous fashion.
*/

const config = require("./config.json");
const request = require("request");

var options = {
    method: "POST",
    url: config.url,
    headers: config.headers,
    body: config.body,
};

var errors_count = 0;
var success_count = 0;
var start_time = Date.now();
console.log("start_time: ");
console.log(start_time);

var req_time;
var cnt = 0;
const lmt = 200;

function sender() {
    request(options, function (error, response) {
        if (error) {
            errors_count++;
            console.log("errors_count: " + errors_count);
            throw new Error(error);
        } else {
            success_count++;
            console.log("success_count: " + success_count);
            req_time = Date.now();
            console.log("request timed:");
            console.log((req_time - start_time) / 1000);
        }
        cnt++;
        if (cnt < lmt) {
            sender();
        }
        console.log(response.body);
        console.log(response.statusCode);
        console.log(response.statusMessage);
    });
}

sender();
