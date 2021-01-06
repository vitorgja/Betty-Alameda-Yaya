require('dotenv').config();

const Discord = require("discord.js");
const config = require("./config.json");
const msgs = require("./messages.json");

const client = new Discord.Client();

let activeChannel = [];

client.on('ready', () => {
  client.user.setActivity('https://bot-betty-alameda-yaya.herokuapp.com/', {type: 'WATCHING'});
});

client.on("message", function (message) {
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    const commandBody = message.content.slice(config.prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "start") {
      activeChannel.push(message.channel.name);
      message.reply(`Iniciando ${config.botname} em ${message.channel.name}`);
    } else if (command === "stop") {
      activeChannel = activeChannel.filter(channel => channel == message.channel.name);
      message.reply(`Parando ${config.botname} em ${message.channel.name}`);
    } else if (command === "help") {
      var helpCommands = ['\n'];
      helpCommands.push(`Comandos ${config.botname} - ${config.prefix}help`);
      helpCommands.push(`${config.prefix}start - Inicia o ${config.botname}`);
      helpCommands.push(`${config.prefix}stop - Finaliza o ${config.botname}`);
      helpCommands.push(`\nAcorde o bot em https://bot-betty-alameda-yaya.herokuapp.com/ `);
      message.reply(helpCommands.join('\n'));
    }
  } else if (activeChannel.indexOf(message.channel.name) > -1) {
    var msg = msgs.messages[Math.floor(Math.random() * msgs.messages.length)];
    message.reply(msg);
  }
});

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

  console.log('Listening at http://%s:%s', host, port);

});