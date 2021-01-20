import { DMChannel, Message } from 'discord.js';

import * as config from '../config/config.json';
import * as msgs from '../../messages.json';

import * as DB from '../config/database';

export class Messages {
  activeChannel: string[] = [];
  message: Message;

  constructor(message: Message,  activeChannel: string[]) {
    this.message = message;
    this.activeChannel = activeChannel;
  }

  messages () {
    var channelName: never = (this.message.channel as any).name as never;
    
    if (this.message.author.bot) return;
    if (this.message.content.startsWith(config.prefix)) {

      // Commands
      this.commands();
    } else if (this.activeChannel.indexOf(channelName) > -1) {

      // Send Betty Messages
      this.sendMessage();

      // Random Voip "Oh Folgado"
      this.voipFolgado(true);
    }
  }

  commands() {
    const commandBody = this.message.content.slice(config.prefix.length);
    const args = commandBody.split(' ');
    const shift = args.shift();
    const command = shift ? shift.toLowerCase() : 'uncommand';

    switch (command) {
      case "start":     this.cmdStart();          break;
      case "stop":      this.cmdStop();           break;
      case "folgado":   this.cmdFolgado();        break;
      case "messages":  this.cmdMessages();       break;
      case "message":   this.cmdAddMessage(args); break;
      case "help":      this.cmdHelp();           break;
      default:                                    break;
    }
  }

  voipFolgado(random=false) {
    const randomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;
    if (!random || randomArbitrary(0, 100) > 75) {   
      var voiceChannel = this.message.member && this.message.member.voice.channel;
      voiceChannel && voiceChannel.join().then(connection => {
        const dispatcher = connection.play('http://www.pixtar.com.br/sons/OFolgado.mp3');
        // const dispatcher = connection.play('./src/audio/OFolgado.mp3');
        dispatcher.on("finish", (end: any) => {
          voiceChannel && voiceChannel.leave();
        });
      })
        .catch(err => console.log(err));
    }
  }

  sendMessage() {
    if (this.message.content.includes("nome")){      
      DB.client.query(DB.MESSAGE_GET, [9], this.callbackMessage); 
    } else {
      DB.client.query(DB.MESSAGE_RANDOM, [], this.callbackMessage);  
    }
  }

  cmdStart() {
    var channelName: string = (this.message.channel as any).name as string;
    
    this.activeChannel.push(channelName);
    this.message.reply(`Iniciando **${config.botname}** no canal <#${this.message.channel.id}>`);
  }
  cmdStop() {
    this.activeChannel = this.activeChannel.filter(channel => channel != (this.message.channel as any).name);
    this.message.reply(`Parando **${config.botname}** no canal <#${this.message.channel.id}>`);
  }
  cmdFolgado() {
    this.voipFolgado(false);
  }
  cmdMessages() {

    DB.client.query(DB.MESSAGE_ALL, [], (err: any, result: any) => {
      if (err) {  
        this.message.reply(
          `Mensagens Listadas no **${config.botname}**: \n` +
          msgs.messages
            .map((message, index) => `${index + 1}. ${message}`)
            .join("\n")
        );
        
        console.log('Erro na Query: ', err);
        return;
      } 
    
      if (result && result.rows) {
        const msg = result.rows[0].message

        this.message.reply(
          `Mensagens Listadas no **${config.botname}**: \n` +
          result.rows
            .map((msg: any) => `${msg.id}. ${msg.message}`)
            .join("\n")
        );
      }
    })

   
  }
  cmdAddMessage(args: string[]){
    const shift = args.shift();
    const command = shift ? shift.toLowerCase() : 'uncommand';

    const param = args.join(" ");
    if (param)
    switch (command) {
      case 'add': DB.client.query(DB.MESSAGE_ADD, [param, 'chat-betty'], this.callbackAddMessage);  break;
      case 'rm':  DB.client.query(DB.MESSAGE_REMOVE, [param], this.callbackRmMessage);   break;
      default:
        var helpCommands = ['\n'];
        helpCommands.push(`Comandos **${config.botname}** - **${config.prefix}message**`);
        helpCommands.push(`**${config.prefix}message add <Menssage>** - Add Menssage in **${config.botname}**`);
        helpCommands.push(`**${config.prefix}message rm <ID or Menssagem>** - Remove Menssage in **${config.botname}**`);
        this.message.reply(helpCommands.join('\n')); 
        break; 
    }
  }
  cmdHelp() {
    var helpCommands = ['\n'];
    helpCommands.push(`Comandos **${config.botname}** - **${config.prefix}help**`);
    helpCommands.push(`**${config.prefix}start** - Inicia o **${config.botname}**`);
    helpCommands.push(`**${config.prefix}stop** - Finaliza o **${config.botname}**`);
    helpCommands.push(`**${config.prefix}folgado** - **${config.botname}** join channel to voip "O Folgado" `);
    helpCommands.push(`**${config.prefix}messages** - Lista as Mensagens da **${config.botname}**`);
    helpCommands.push(`**${config.prefix}message add <Menssage>** - Add Menssage in **${config.botname}**`);
    helpCommands.push(`**${config.prefix}message rm <ID or Menssagem>** - Remove Menssage in **${config.botname}**`);
    helpCommands.push(`\nAcorde o bot em https://bot-betty-alameda-yaya.herokuapp.com/ `);
    this.message.author.send(helpCommands.join('\n'));
  }

  // Callbacks
  callbackMessage = (err: any, result: any) => {
    if (err) {
      const msg = msgs.messages[Math.floor(Math.random() * msgs.messages.length)];
      this.message.reply(msg);
      
      console.log('Erro na Query: ', err);
      return;
    } 
  
    if (result && result.rows && result.rows.length == 1) {
      const msg = result.rows[0].message

      this.message.reply('DB: ' + msg);
    }
  };
  callbackAddMessage = (err: any, result: any) => {
    if (err) {
      this.message.reply(`Mensagem não foi adicionada!`);
      
      console.log('Erro na Query: ', err);
      return;
    } 

    this.message.reply(`Mensagem adicionada!`);
  };
  callbackRmMessage = (err: any, result: any) => {
    if (err) {
      this.message.reply(`não foi possivel remover Mensagem!`);
      
      console.log('Erro na Query: ', err);
      return;
    } 

    this.message.reply(`Mensagem removida!`);
  };
};