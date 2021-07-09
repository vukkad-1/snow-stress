/*  
    Pushes 100 async requests practically at once.
    Response and processing time for each request is shown in console output.
    Shows how many of the sent requests will be dropped by Service Now, 
    with various error messages, or without any.
    Important! Also check how many requests have found their way into Service Now
    tables without any response being sent back.
*/

const config = require("./config.json");
const request = require("request");

var options = {
    method: "POST",
    url: config.url,
    headers: config.headers,
    body: config.body,
};

const lmt = 100;

function sender() {
    var errors_count = 0;
    var success_count = 0;
    var start_time = Date.now();
    console.log("start_time: ");
    console.log(start_time);

    var req_time;

    for (let i = 0; i < lmt; i++) {
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

            console.log(response.body);
            console.log(response.statusCode);
            console.log(response.statusMessage);
        });
    }
}

sender();
