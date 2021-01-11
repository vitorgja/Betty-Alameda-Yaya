require('dotenv').config();

const Discord = require("discord.js");
const config = require("./config.json");
const msgs = require("./messages.json");

const client = new Discord.Client();


// States Functions
const Ready = require('./src/states/ready'),
      Messages = require('./src/states/messages');

// States
client.on('ready', () => Ready.ready(client) );
client.on("message", (message) => Messages.messages(message) );

// Connection
client.login(process.env.BOT_TOKEN)
      .then(_ => console.log(`Iniciando ChatBOT - ${config.botname}`))
      .catch(err => console.error(`Falha no Engano! `, err.message)); 


// Advanced Zeh Technique (SCAM)
var express = require('express')

app = express()

app.get('/', function (req, res) {
  res.send(`Hello ${config.botname}, I'm waking up`)
})

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log(
    'Listening at http://%s:%s', 
    host == '::' ? 'localhost' : host, 
    port
  );

});