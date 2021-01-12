const request = require('request'),
      fs = require('fs');


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

    const channelName = 'geral';
    const channels = client.channels.cache.filter(channel => channel.name === channelName);
    
    if (channels) {
      const message = `Acordei Parças`;
      channels.map( channel => channel.send(message) );
    }

    this.messagOfTheDay(client)
  },

  messagOfTheDay: function(client) {
    /**
     * API Url to Trending https://api.giphy.com/v1/gifs/trending
     * API Url to Search https://api.giphy.com/v1/gifs/search
     */
    const URL_GIPHY = 'https://api.giphy.com/v1/gifs/search';
    const api_key = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g';
    const limit = 10;
    request
    .get(`${URL_GIPHY}?api_key=${api_key}&limit=${limit}&q=${getMsgSemana}`, function(err, response, body) {
      body = JSON.parse(body);
      
      if (body && body.data && body.data.length > 0) {

        // TODO: Get Random DATA
        const giff = body.data[0];

        const channelName = 'geral';
        const channels = client.channels.cache.filter(channel => channel.name === channelName)

        if (channels) {
          const message = `${giff.title} \n ${giff.images.original.url}`;
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