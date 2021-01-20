const config = require("./config/config.json");
const request = require('request');

// Advanced Zeh Technique (SCAM)
var express = require('express');
var app = express();

function init() {

}
// route to Uptime server
app.get('/', function (req: any, res: any) {
  res.send(`Hello ${config.botname}, I'm waking up`)
})

// Start Server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address == '::' ? 'localhost' : server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

// Lambda to check hour in range
const dateInRange = (min: number, max: number) => {
  const hora = new Date().getHours();
  return  ( hora >= min && hora <= max );
};

// The 5 minutes make request to uptime server
setInterval( _ => {
  if( dateInRange(8, 18) ) {
    request('https://bot-betty-alameda-yaya.herokuapp.com/', function (error: any, response: any, body: any) {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body (', response.statusCode, '): ', body); // Print the HTML for the Google homepage.
    });
  }
}, 1000 * 60 * 15);
