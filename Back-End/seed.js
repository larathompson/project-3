const mongoose = require('mongoose')
const User = require('./models/user')
const Reviews = require('./models/reviews')
// const { default: Reviews } = require('../Front-End/src/components/Reviews')


//it says there is a throw error and the module cant be found !
mongoose.connect(
  'mongodb://localhost/moviedb',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)

    console.log('Mongoose connected!')
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'raquel',
            email: 'raquel@raquel.com',
            password: 'raquel',
            passwordConfirmation: 'raquel'
          },
          {
            username: 'kianna',
            email: 'kianna@kianna.com',
            password: 'kianna',
            passwordConfirmation: 'kianna'
          },
          {
            username: 'shaikh',
            email: 'shaikh@shaikh.com',
            password: 'shaikh',
            passwordConfirmation: 'shaikh'
          },
          {
            username: 'lara',
            email: 'lara@lara.com',
            password: 'lara',
            passwordConfirmation: 'lara'
          }
        ])
      })
      // .then(users => {
      //   return Reviews.create([
      //     {
      //       text: 'Great soundtrack! ',
      //       user: users[3],
      //       rating: 5,
      //       filmId: '64690'
      //     },
      //     {
      //       text: 'Shit! ',
      //       user: users[1],
      //       rating: 1,
      //       filmId: '64690'
      //     },
      //     {
      //       text: 'Distinctly average!' ,
      //       user: users[1],
      //       rating: 3,
      //       filmId: '1018'
      //     }
      //   ])
      // })
      .then(reviews => {
        console.log(`${reviews.length} reviews have been created !`)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)