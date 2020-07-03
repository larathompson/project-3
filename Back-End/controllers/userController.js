const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'Kianna and Kianna only is the Git master '
function register(req, res) {
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.send(error))
}

function login(req, res) {
  console.log(req.body)
  User
    .findOne({ email: req.body.email })
    .then(user => {
      console.log(user)
      if (!user) return res.status(400).send({ message: 'User not found' })

      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '72h' } )
      res.status(202).send({ message: `Welcome back ${user.username}`, token })
    })
    .catch(error => res.send(error))
}

module.exports = {
  register,
  login
}