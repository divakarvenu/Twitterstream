var Twit = require('twit');
const express = require('express');
const app = express();
const server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket) {

    T.get('search/tweets', { q: '#fun', count: 100 }, function(err, data, response) {
      var tweetArray=[];
        for (let index = 0; index < data.statuses.length; index++) {
            const tweet = data.statuses[index];
            var tweetbody = {
              'text': tweet.text,
              'userScreenName': "@" + tweet.user.screen_name,
              'userImage': tweet.user.profile_image_url_https,
              'userDescription': tweet.user.description,
            }
            try {
              if(tweet.entities.media[0].media_url_https) {
                tweetbody['image'] = tweet.entities.media[0].media_url_https;
              }
            } catch(err) { }
            tweetArray.push(tweetbody);
        }     
        io.emit('allTweet',tweetArray)
    })

    var stream = T.stream('statuses/filter', { track: '#fun', language: 'en' })

    stream.on('tweet', function (tweet) {
        io.emit('tweet',{ 'tweet': tweet });
    })
});
  var T = new Twit({
      consumer_key:         '',
      consumer_secret:      '',
      access_token:         '',
      access_token_secret:  '',
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
