var Twit = require('twit')
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function(socket) {
    var stream = T.stream('statuses/filter', { track: '#fun', language: 'en' })

    stream.on('tweet', function (tweet) {
        io.emit('tweet',{ 'tweet': tweet });
    })
});

var T = new Twit({
    consumer_key:         '1vlF5wme6BuyZgANV1LGffFrG',
    consumer_secret:      'd3v4fx1OoD5eN5vLujtED7MIySLyc46ciMRx8rDrQ3m1cUpY7t',
    access_token:         '1333236546-EoofSCeyW9hMfxHAcsrit6bbZcPq4NLAkGI1TOX',
    access_token_secret:  'zOs7RtUAShsgzbdRHknl5eYSGlnJs7xh6sueGS1C7B8xW',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})




app.listen(8080);

