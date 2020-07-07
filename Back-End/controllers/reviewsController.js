const Reviews = require('../models/reviews')



function index(req, res) {
  Reviews
    .find()
    .populate('user')
    // .populate('comment')
    .then(reviews => {
      res.send(reviews)
    })
}

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
//added this 
function createMovieReview(req, res) {
  const review = req.body
  console.log('hello' + review)
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

// function deleteMovieReview(req, res) {
//   const reviewId = req.params._id
//   // const filmId = req.params.filmId
//   req.body.user = req.currentUser
//   Reviews
//     .findById(reviewId)
//     .then(review => {
//       const currentUserId = req.currentUser._id
//       const userIdOnReview = review.user
//       if (!userIdOnReview.equals(currentUserId)) {
//         return res.status(401).send({ message: 'Unauthorized' })
//       }
//       review.deleteOne()
//       res.status(202).send(review)
//     })

// }


function create(req, res) {
  const review = req.body
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
      if (!userIdOnReview.equals(currentUserId)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      review.deleteOne()
      res.status(202).send(review)
    })
}

function update(req, res) {
  const reviewUpdate = req.body
  const id = req.params.id
  Reviews
    .findById(id)
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



