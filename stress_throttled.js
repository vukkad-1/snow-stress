/*  
    Pushes 40 async requests every 20 seconds, up to a total of 1000.
    Response and processing time for each request are shown in console output.
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

var main_itt_count = 0;
var total_success_count = 0;
var total_error_count = 0;
var start_time = Date.now();
console.log("start_time: " + start_time);

function sender() {
    var error_count = 0;
    var success_count = 0;
    var req_time;
    main_itt_count++;
    console.log("main_itt_count: " + main_itt_count);

    for (let i = 0; i < 50; i++) {

        request(options, function (error, response) {
            if (error) {
                error_count++;
                total_error_count++;
                console.log("error_count: " + error_count);
                console.log("total_error_count: " + total_error_count);
                throw new Error(error);
            } else {
                success_count++;
                total_success_count++;
                console.log("success_count: " + success_count);
                console.log("total_success_count: " + total_success_count);
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

if (main_itt_count < 25) {
    setInterval(sender, 20000);
} else {
    let end_time = Date.now();
    console.log("The whole operation timed:");
    console.log((end_time - start_time) / 1000);
}
