const request = require('request') // "Request" library

const clientId = '7ec26d7f65c148e1976be49c196b5d6e'
const clientSecret = '6db6b34e51164e278720ed1146222e11' 

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