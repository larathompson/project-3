const Reviews = require('../models/reviews')


//this function gets all the reviews
//populate is a function and it adds the user to the reviews
//  is the USER FROM THE SCHEMA??
function index(req, res) {
  Reviews
    .find()
    .populate('user')
    // .populate('comment')
    .then(reviews => {
      res.send(reviews)
    })
}

//req.parms searches the query path of the URL request
function getOneReview(req, res) {
  const id = req.params.id
  Reviews
    .findById(id)
    .populate('user')
    .then(review => {
      console.log(review)
      res.send(review)
    })
}

//gets  reviews of each movie
function getMovieReviews(req, res) {
  const filmId = req.params.filmId
  console.log(filmId)
  Reviews
    .find({ filmId })
    .populate('user')
    .then(reviews => {
      console.log(reviews)
      res.send(reviews)
    })
    .catch(error => res.send(error))
}

//Allows you to access the JSON data that was sent in the request. Generally used in POST/PUT requests
//the req.body allowss you to access the data sent in the request
function createMovieReview(req, res) {
  const review = req.body
  console.log(review)
  const filmId = req.params.filmId
  console.log('filmid' + filmId)
  req.body.user = req.currentUser
  Reviews
    .create(review)
    // .populate('comments.user')
    // .then(film => {
    //   if (!film) return res.status(404).send({ message: 'Not Found!' })
    //   review.text.push(review)
    //   return review.save()
    // })
    .then(review => res.status(200).send(review))
    .catch(err => res.send(err))

}


function create(req, res) {
  const review = req.body
  //not entirely sure about this ??
  review.user = req.currentUser
  Reviews
    .create(review)
    .then(review => {
      res.status(201).send(review)

    })
    .catch(error => res.send(error))

}

function remove(req, res) {
  const reviewId = req.params.id
  Reviews
    .findById(reviewId)
    .then(review => {
      const currentUserId = req.currentUser._id
      const userIdOnReview = review.user
      //checking they wrote the review
      if (!userIdOnReview.equals(currentUserId)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      review.deleteOne()
      res.status(202).send(req.currentUser)
    })
}

function update(req, res) {
  const reviewUpdate = req.body
  const id = req.params.id
  Reviews
    .findById(id)
    .populate('user')
    .then(review => {
      const currentUserId = req.currentUser._id
      const userIdOnReview = review.user
      if (!userIdOnReview.equals(currentUserId)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      review.set(reviewUpdate)
      review.save()
      res.status(202).send(review)
    })
}


// ! Comment controller logic

function createComment(req, res) {
  const comment = req.body
  req.body.user = req.currentUser
  Reviews
    .findById(req.params.id)
    .populate('comments.user')
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })

      review.comments.push(comment)
      return review.save()
    })
    .then(review => res.send(review))
    .catch(err => res.send(err))
}



function updateComment(req, res) {
  Reviews
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })

      const comment = review.comments.id(req.params.commentId)


      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }


      comment.set(req.body)
      return review.save()
    })
    .then(review => res.status(202).send(review))
    .catch(err => res.send(err))
}



function removeComment(req, res) {
  Reviews
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })

      const comment = review.comments.id(req.params.commentId)


      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }


      comment.remove()
      return review.save()
    })
    .then(review => res.status(202).send(review))
    .catch(err => res.send(err))
}

module.exports = {
  index,
  create,
  remove,
  update,
  createComment,
  removeComment,
  updateComment,
  getOneReview,
  getMovieReviews,
  createMovieReview
}



