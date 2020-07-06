const request = require('request') // "Request" library

const clientId = process.env.SPOTIFY_KEY
const clientSecret =  process.env.SPOTIFY_SECRET

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token
    var options = {
      // ! ADD USERNAME 
      url: 'https://api.spotify.com/v1/users/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    }
    request.get(options, function(error, response, body) {
      console.log(body)
    })
  }
})