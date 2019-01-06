# Twitterstream
Tweet wall for specific hash tag made using Twitter streaming API

1. Clone the project 

2. <code>npm install</code>

3. open <code>index.js</code>

4. Place your access tokens and keys here

```
  var T = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  '',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });
```

5. <code> node index.js </code>
