import Discord from 'discord.js';
import * as config from './config/config.json';
import { Ready } from './states/ready';
import { Messages } from './states/messages';

const client = new Discord.Client();
let activeChannel: string[] = [];

// States
client.on('ready', () => new Ready().ready(client));
client.on('message', (message: Discord.Message) => {
  let msg = new Messages(message, activeChannel);
  msg.messages();

  activeChannel = msg.activeChannel;
});

// Connection
client
  .login(process.env.BOT_TOKEN)
  .then((_: any) => console.log(`Iniciando ChatBOT - ${config.botname}`))
  .catch((err: any) => console.error(`Falha no Engano! `, err.message));
