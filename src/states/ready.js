const request = require('request'),
      fs = require('fs');


const getMsgSemana = (function(date) {
  switch (date.getDay()) {
    case 1: return 'Segundou';
    case 2: return 'Terçou';
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

    console.log("Tst")

    const channelName = 'geral';
    const channel = client.channels.cache.find(channel => channel.name === channelName)

    // const channelID = '468838715377057802' // geral
    // const channel = client.channels.cache.get(channelID)    

    if (channel) {
      const message = `Betty & Serjão`
      channel.send(message)
    }

    this.messagOfTheDay(client)
  },

  messagOfTheDay: function(client) {

    // const URL_GIPHY = 'https://api.giphy.com/v1/gifs/trending';
    const URL_GIPHY = 'https://api.giphy.com/v1/gifs/search';
    const api_key = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g';
    const limit = 1;
    const q = 'day'
    request
    .get(`${URL_GIPHY}?api_key=${api_key}&limit=${limit}&q=${getMsgSemana}`,function(err, response, body) {
      body = JSON.parse(body);
      
      if (body && body.data && body.data.length > 0) {
        const giff = body.data[0];

        const channelName = 'geral';
        const channel = client.channels.cache.find(channel => channel.name === channelName)

        if (channel) {
          const message = `${giff.title} \n ${giff.images.original.url}`
          channel.send(message)
        }
      } else {
        console.log('Hoje não tem Giphy \n search: ${getMsgSemana}')
      }
    })
    .on('error', function(err) {
      console.error('Problema na conexão com o Giphy')
    })
  }
};