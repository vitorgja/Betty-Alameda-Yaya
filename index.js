require('dotenv').config();

const Discord = require("discord.js");
const config = require("./config.json");
const msgs = require("./messages.json");

const client = new Discord.Client();
let ativo = false;

client.on('ready', () => {
  client.user.setActivity('https://git.io/d.js-heroku', {type: 'WATCHING'});
});

client.on("message", function (message) {
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    const commandBody = message.content.slice(config.prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "start") {
      ativo = true;
      message.reply(`Iniciando ${config.botname}`);
    } else if (command === "stop") {
      ativo = false;
      message.reply(`Parando ${config.botname}`);
    } else if (command === "help") {
      var helpCommands = [];
      helpCommands.push(`Comandos ${config.botname} - ${config.prefix}help`);
      helpCommands.push(`${config.prefix}start - Inicia o ${config.botname}`);
      helpCommands.push(`${config.prefix}stop - Finaliza o ${config.botname}`);
      message.reply(helpCommands.join('\n'));
    }
  } else if (ativo) {
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
  res.send('Hello World!')
})

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});