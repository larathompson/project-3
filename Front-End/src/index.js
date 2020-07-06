import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('root'))

// const express = require('express')
// const router = express.Router()

// const SpotifyWebApi = require('spotify-web-api-node')
// const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']

// require('dotenv').config()

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_API_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   redirectUri: process.env.CALLBACK_URL
// })

// /* GET homepage */

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' })
// })

// router.get('/login', (req, res) => {
//   const html = spotifyApi.createAuthorizeURL(scopes)
//   console.log(html)
//   res.send(html + '&show_dialog=true')
// })

// router.get('/callback', async (req, res) => {
//   const { code } = req.query
//   console.log(code)
//   try {
//     const data = await spotifyApi.authorizationCodeGrant(code)
//     const { accessToken, refreshToken } = data.body
//     spotifyApi.setAccessToken(accessToken)
//     spotifyApi.setRefreshToken(refreshToken)

//     res.redirect('http://localhost:8000/api/')
//   } catch (err) {
//     res.redirect('/#/error/invalid token')
//   }
// })

// module.exports = router 