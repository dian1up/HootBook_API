require('dotenv').config()
const redis = require('redis')
const client = redis.createClient({url:process.env.REDISCLOUD_URL})
client.on("error", err => {
    console.log("Error " + err);
});
module.exports=client