require('dotenv').config();

const { Client } = require('pg');
const connectionString = process.env.PG_URI;
const client = new Client({
    ssl: {
        rejectUnauthorized: false,
    },
    connectionString: connectionString
});
client.connect();


module.exports = { 
    client,

    MESSAGE_GET:    'SELECT * FROM bot_betty_mensages where id = $1',
    MESSAGE_ALL:    'SELECT * FROM bot_betty_mensages',
    MESSAGE_ADD:    "INSERT INTO \"bot_betty_mensages\" (message, project) VALUES ($1, $2)",
    MESSAGE_REMOVE: "DELETE FROM bot_betty_mensages where id = $1 OR message ILIKE $2",
    MESSAGE_RANDOM: 'SELECT message FROM bot_betty_mensages ORDER BY RANDOM() LIMIT 1',

    STATUS_READY:  'SELECT * FROM bot_betty_status WHERE channelid = $1 OR created_at = DATE(substring(NOW()::VARCHAR FROM 1 FOR 10));',
    STATUS_ADD:    'INSERT INTO bot_betty_status (description, status, channel, channelid , channeltype ) values ($1, true, $2, $3, $4)',
 };

