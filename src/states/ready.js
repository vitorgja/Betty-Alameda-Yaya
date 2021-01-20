const request = require('request'),
      fs = require('fs');

const env = process.env.NODE_ENV || 'development',
      channelDefault = env  != 'development' ? 'geral' : 'dev-betty';

const getMsgSemana = (function(date) {
  switch (date.getDay()) {
    case 1: return 'Segundou';
    case 2: return 'Tercou';
    case 3: return 'Quartou';
    case 4: return 'Quintou';
    case 5: return 'Sextou';
    case 6: return 'Sabadou';
    default: return 'Quintou';
  }
})(new Date());

module.exports = {
  ready: function (client) {
    client.user.setActivity('https://bot-betty-alameda-yaya.herokuapp.com/', { type: 'WATCHING' });

    const channels = client.channels
                           .cache
                           .filter(channel => channel.name === channelDefault);



    
    // if (channels) {
    //   const message = `Acordei Parças`;
    //   channels.map( channel => channel.send(message) );
    // }

    this.messagOfTheDay(client)


    client.channels.cache.filter(msg => msg.name.includes('geral') ).map(msg => {
      console.log( "msg: ", msg.messages.cache );
    });
  },

  messagOfTheDay: function(client) {
    /**
     * API Url to Trending https://api.giphy.com/v1/gifs/trending
     * API Url to Gifs Search https://api.giphy.com/v1/gifs/search
     * API Url to Stickers Search https://api.giphy.com/v1/stickers/search
     */
    const URL_GIPHY = 'https://api.giphy.com/v1/stickers/search';
    const api_key = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g';
    const limit = 10;
    request
    .get(`${URL_GIPHY}?api_key=${api_key}&limit=${limit}&q=${getMsgSemana}`, function(err, response, body) {
      body = JSON.parse(body);
      
      if (body && body.data && body.data.length > 0) {

        // TODO: Get Random DATA
        const giff = body.data[0];

        const channels = client.channels
                               .cache
                               .filter(channel => channel.name === channelDefault)

        if (channels) {
          const message = {
            content: `${giff.title}`,
            files: [giff.images.original.url]
          }
          channels.map( channel => channel.send(message) );
        }
      } else {
        console.log(`Hoje não tem Giphy \n search: ${getMsgSemana}`);
      }
    })
    .on('error', function(err) {
      console.error('Problema na conexão com o Giphy')
    })
  }
};