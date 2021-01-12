const config = require("../../config.json");
const msgs = require("../../messages.json");


module.exports = {
  activeChannel: [],
  messages: function (message) {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
      const commandBody = message.content.slice(config.prefix.length);
      const args = commandBody.split(' ');
      const command = args.shift().toLowerCase();

      if (command === "start") {
        this.activeChannel.push(message.channel.name);
        message.reply(`Iniciando **${config.botname}** no canal <#${message.channel.id}>`);
      } else if (command === "stop") {
        this.activeChannel = this.activeChannel.filter(channel => channel != message.channel.name);
        message.reply(`Parando **${config.botname}** no canal <#${message.channel.id}>`);
      } else if (command === "messages") {
        message.reply(
          `Mensagens Listadas no **${config.botname}**: \n` +
          msgs.messages
            .map((message, index) => `${index + 1}. ${message}`)
            .join("\n")
        );
      } else if (command === "help") {
        var helpCommands = ['\n'];
        helpCommands.push(`Comandos **${config.botname}** - **${config.prefix}help**`);
        helpCommands.push(`**${config.prefix}start** - Inicia o **${config.botname}**`);
        helpCommands.push(`**${config.prefix}stop** - Finaliza o **${config.botname}**`);
        helpCommands.push(`**${config.prefix}messages** - Lista as Mensagens da **${config.botname}**`);
        helpCommands.push(`\nAcorde o bot em https://bot-betty-alameda-yaya.herokuapp.com/ `);
        message.reply(helpCommands.join('\n'));
      }
    } else if (this.activeChannel.indexOf(message.channel.name) > -1) {

      if (message.content.includes("nome")){
        var msg = msgs.messages.find(msg => msg.includes("também é betty")); // O meu também é betty
        msg && message.reply(msg);
      } else {
        var msg = msgs.messages[Math.floor(Math.random() * msgs.messages.length)];
        message.reply(msg);
      }

      const randomArbitrary = (min, max) => Math.random() * (max - min) + min;
      if (randomArbitrary(0, 100) > 75) {   
        var voiceChannel = message.member.voice.channel;
        voiceChannel.join().then(connection => {
          const dispatcher = connection.play('http://www.pixtar.com.br/sons/OFolgado.mp3');
          // const dispatcher = connection.play('./src/audio/OFolgado.mp3');
          dispatcher.on("finish", end => {
            voiceChannel.leave();
          });
        })
          .catch(err => console.log(err));
      }
    }
  }
};