var Twit = require('twit');

var T = new Twit({
  consumer_key:         'yPs3eXbFOky5dg8QL5cvrpT6h', 
  consumer_secret:      'U9yBt5J5gMO3NDmBAGxTJtiDsPhufhdabiNt6cHnXAsZg4WKXB',
  access_token:         '4015132520-lXP5tTeqdOakd9asS8aDmmR5Kmll4k2m4tCnWtc',
  access_token_secret:  'TWrzqNcQ0APQA3REgbc6HqgLYU9J7SKNPQvOk2TdpM4W7'
});

function makeTweet() {
  var retweet;

  T.get('search/tweets', { q: '\"fucked by\" exam', count: 1 }, function(err, data, response) {
   // console.log(data);
  //  console.log(data.statuses[0].text);
    retweet = data.statuses[0].text;
   // console.log(retweet);
    retweet = retweet.replace("fucked", "rekt");


    T.post('statuses/update', { status: retweet }, function(err, data, response) {
      console.log(data);
    })
  })
}

function makeTweet2() {
  var retweet;

  T.get('search/tweets', { q: '\"raped by\" exam', count: 1 }, function(err, data, response) {
    //console.log(data);
    //console.log(data.statuses[0].text);
    retweet = data.statuses[0].text;
   // console.log(retweet);
    retweet = retweet.replace("raped", "destroyed");


    T.post('statuses/update', { status: retweet }, function(err, data, response) {
      console.log(data);
    })
  })
}

// every 2 minutes, make and tweet a safe complaint
// wrapped in a try/catch in case Twitter is unresponsive, don't really care about error
// handling. it just won't tweet.
setInterval(function() {
  try {
    makeTweet();
    makeTweet2();
  }
 catch (e) {
    console.log(e);
  }
},10000);