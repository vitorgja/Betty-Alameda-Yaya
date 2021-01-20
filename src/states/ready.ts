import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as request from 'request';
import { NumberHelper } from '../helpers/number.helper';
import * as DB from '../config/database';

const env = process.env.NODE_ENV || 'development',
  channelDefault = env != 'development' ? 'geral' : 'dev-betty';

const getMsgSemana = (function (date) {
  switch (date.getDay()) {
    case 1:
      return 'Segundou';
    case 2:
      return 'Tercou';
    case 3:
      return 'Quartou';
    case 4:
      return 'Quintou';
    case 5:
      return 'Sextou';
    case 6:
      return 'Sabadou';
    default:
      return 'Quintou';
  }
})(new Date());

export class Ready {
  ready (client: Discord.Client) {
    client &&
      client.user &&
      client.user.setActivity('https://bot-betty-alameda-yaya.herokuapp.com/', {
        type: 'WATCHING'
      });

    const channels = client.channels.cache.filter((channel: any) =>
      channel.name.includes(channelDefault)
    );

    channels.forEach(channel => {
      DB.client.query(
        DB.STATUS_READY,
        [channel.id],
        (err: any, result: any) => {
          if (err) return;

          if (result && result.rows && result.rows.length == 0) {
            this.messagOfTheDay(channel);
            channels.forEach((channel: any) => {
              DB.client.query(DB.STATUS_ADD, [
                `Message to Day: ${getMsgSemana}`,
                channel.name,
                channel.id,
                channel.type
              ]);
            });
          }
        }
      );
    });

    // client.channels.cache.filter(msg => msg.name.includes('geral') ).map(msg => {
    //   console.log( "msg: ", msg.messages.cache );
    // });
  }

  messagOfTheDay (channel: any) {
    /**
     * API Url to Trending https://api.giphy.com/v1/gifs/trending
     * API Url to Gifs Search https://api.giphy.com/v1/gifs/search
     * API Url to Stickers Search https://api.giphy.com/v1/stickers/search
     */
    const URL_GIPHY = 'https://api.giphy.com/v1/stickers/search';
    const api_key = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g';
    const limit = 10;
    request
      .get(
        `${URL_GIPHY}?api_key=${api_key}&limit=${limit}&q=${getMsgSemana}`,
        function (err: any, response: any, body: any) {
          body = JSON.parse(body);

          if (body && body.data && body.data.length >= 0) {
            const index = NumberHelper.randomInRange(0, body.data.length - 1);
            const giff: GiphySticker = body.data[index] as GiphySticker;

            const message = {
              content: `${giff.title}`,
              files: [giff.images.original.url]
            };
            channel.send(message);
          } else {
            console.log(`Hoje não tem Giphy \n- search: ${getMsgSemana}`);
          }
        }
      )
      .on('error', function (err: Error) {
        console.error('Problema na conexão com o Giphy');
      });
  }
}

interface GiphySticker {
  title: string;
  images: any;
}

module.exports = { Ready };
