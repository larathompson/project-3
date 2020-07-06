const router = require('express').Router()
const reviewsController = require('./controllers/reviewsController')
const userController = require('./controllers/userController')
const secureRoute = require('./lib/secureRoute')

router.route('/reviews')
  .get(reviewsController.index)
  .post(secureRoute, reviewsController.create)

router.route('/review/:id')
  .get(reviewsController.getOneReview)
  .delete(secureRoute, reviewsController.remove)
  .put(secureRoute, reviewsController.update)

router.route('/movie/reviews/:filmId')
  .get(reviewsController.getMovieReviews)

router.route('/review/:id/comments')
  .post(secureRoute, reviewsController.createComment)

router.route('/review/:id/comment/:commentId')
  .delete(secureRoute, reviewsController.removeComment)
  .put(secureRoute, reviewsController.updateComment)

router.route('/register')
  .post(userController.register)
// .post(userController.generateToken)

router.route('/login')
  .post(userController.login)

// Creating a user profile 
router.route('/profile')
  // .post(secureRoute, userController.addFavourite)
  .get(secureRoute, userController.getProfile)
router.route('/favourites')
  .post(secureRoute, userController.addFavourite)

module.exports = router