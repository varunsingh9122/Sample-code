const redis = require('redis')

// const client = redis.createClient({
//   port: 6379,
//   host: '127.0.0.1',
//   // url : '127.0.0.1:6379'
// })

const client = redis.createClient('6379', "localhost", {
  retry_strategy: (options) => {
      const {error, total_retry_time, attempt} = options;
      if (error && error.code === "ECONNREFUSED") {
          log(error.code); // take actions or throw exception
      }
      if (total_retry_time > 1000 * 15) { //in ms i.e. 15 sec
          log('Retry time exhausted'); // take actions or throw exception
      }
      if (options.attempt > 10) {
          log('10 attempts done'); // take actions or throw exception
      }
      console.log("Attempting connection");
      // reconnect after
      return Math.min(options.attempt * 100, 3000); //in ms
  },
});

client.on('connect', () => {
  console.log('Client connected to redis...')
})

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
  console.log(err.message)
})

client.on('end', () => {
  console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
  client.quit()
})

module.exports = client