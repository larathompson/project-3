
const port = process.env.PORT || 8000

const env = process.env.NODE_ENV || 'development'

const dbURI = env === 'production' // <- is this heroku, true or false?
  ? process.env.MONGODB_URI
  : `mongodb://localhost/moviedb-${env}`


const secret = 'Kianna and Kianna only is the Git master '

module.exports = { port, dbURI, secret }