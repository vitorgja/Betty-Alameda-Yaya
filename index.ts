import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import { QueryResult} from 'pg';

import * as DB from './src/config/database';
import * as config from './src/config/config.json';

import * as Ready from './src/states/ready';
import { Messages } from './src/states/messages';

dotenv.config();
require('dotenv').config();
// const Discord = require("discord.js");

const client = new Discord.Client();


let activeChannel: string[] = [];

// States
client.on('ready', () => Ready.ready(client) );
client.on("message", (message: Discord.Message) => {
  let msg = new Messages(message, activeChannel);
  msg.messages();

  activeChannel = msg.activeChannel;
});

// Connection
client.login(process.env.BOT_TOKEN)
      .then((_: any) => console.log(`Iniciando ChatBOT - ${config.botname}`))
      .catch((err: any) => console.error(`Falha no Engano! `, err.message)); 


