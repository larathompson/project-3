const mongoose = require('mongoose')
const User = require('./models/user')

mongoose.connect(
  'mongodb://localhost/coffeedb',
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
      .then(users => {
        console.log(`${users.length}users have been created !`)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        mongoose.connection.close()
      })
  }
)