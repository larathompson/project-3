import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Auth from '../lib/auth'
import ReviewForm from './ReviewForm'
import { isLoggedIn } from '../lib/auth'



const SingleMovie = (props) => {

  const { userInfo, setUserInfo } = useContext(UserContext)

  const [soundtrackData, setSoundtrackData] = useState({})
  const [added, setAdded] = useState(false)
  const [movieData, setMovieData] = useState([])
  const [reviewData, setReviewData] = useState([])
  const [similarMovieData, updateSimilarMovieData] = useState([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(Number)
  const [edit, setEdit] = useState(false)
  const [updatedText, setUpdatedText] = useState('')
  const [updatedRating, setUpdatedRating] = useState(Number)


  //! Returning single movie data

  useEffect(() => {
    const movieName = props.match.params.name
    const filmId = props.match.params.id
    const API_KEY = process.env.MOVIE_KEY
    // '089c839eda3ed1ce04045e0b371dedeb'
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=1&include_adult=false
    `)
      .then(axiosResp => {
        setMovieData(axiosResp.data.results[0])
        if (userInfo) {
          //! Kianna  - this code is checking to see whether the specified movie already exists inside of the favouriteMovies array
          //! .some() returns a boolean value, used for ternary operator for add to favourites button.
          const exists = userInfo.favouriteMovies.some(movie => movie.filmId === axiosResp.data.results[0].id)
          setAdded(exists)
        }
      })
      .catch(err => console.log(err.response))

    axios.get(`https://api.spotify.com/v1/search?q=${movieName}soundtrack&type=playlist`,
      {
        headers: { 'Authorization': `Bearer ${process.env.SPOTIFY_KEY}` }
      })
      .then(axiosResp => {
        setSoundtrackData(axiosResp.data.playlists.items[0].id)
      })
      .catch(err => console.log(err.response))

    axios.get(`api/movie/reviews/${filmId}`)
      .then(axiosResp => {
        setReviewData(axiosResp.data)

      })

    axios.get(`https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${API_KEY}&language=en-US`)
      .then(axiosResp => {
        updateSimilarMovieData(axiosResp.data.results)
      })


  }, [userInfo, props.match])


  //! Pushing single movie to favourites(profile) page

  const favourite = () => {
    const data = {
      filmId: movieData.id,
      title: movieData.title,
      poster: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
    }
    axios.post('/api/favourites', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setUserInfo(res.data.user)
      })
      .catch(err => {
        props.history.push('/login')
        console.log(err.response)
      })
  }

  function handleComment(filmId) {
    const token = localStorage.getItem('token')
    axios.post(`api/movie/reviews/${filmId}`, { text: text, filmId: props.match.params.id, rating: rating }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((axiosResponse) => {
        setText('')
        setRating(Number)
        const reviews = [...reviewData]
        reviews.push(axiosResponse.data)
        setReviewData(reviews)
      })
  }

  //deleting a single comment 
  function handleDelete(event) {
    const token = localStorage.getItem('token')
    const reviewId = event.target.value
    axios.delete(`/api/review/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } })
  }

  // editing a single comment

  function handleEdit(event) {
    const token = localStorage.getItem('token')
    const reviewId = event.target.value
    axios.put(`/api/review/${reviewId}`, { text: updatedText, rating: updatedRating }, { headers: { Authorization: `Bearer ${token}` } })
      .then((comment) => {
        setUpdatedText('')
        setUpdatedRating(Number)
        const updatedReviews = reviewData.map((review, index) => {
          if (comment.data._id === review._id) {
            return comment.data
          } else {
            return review
          }

        })

        setReviewData([...updatedReviews])
        console.log(updatedReviews)

      })
  }



  //! Returning soundtrack and single movie data on page

  return <>
    <section>
      <div>
        <iframe src={`https://open.spotify.com/embed/playlist/${soundtrackData}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div>
        <h1>{movieData.title} </h1>
        <img src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} />
      </div>
      {added ? <button title="Disabled button" disabled>Added</button> : <button onClick={favourite}>Favourite ❤️</button>}
    </section>
    <section className='reviews'>
      {reviewData && reviewData.map((review, index) => {
        return <div key={index} className='singleReview'>
          <h1>{review.user.username}</h1>
          <p> {review.text}</p>
          <p>{review.createdAt} </p>
          <a href="javascript:window.location.reload(true)">
            {(isLoggedIn() && userInfo && userInfo.username === review.user.username) && <button onClick={handleDelete} value={review._id} className="button is-info">Delete </button>}
          </a>

          {(isLoggedIn() && userInfo && userInfo.username === review.user.username) && <button onClick={() => setEdit(review._id)} value={review._id} className="button is-info">Edit </button>}
          {review._id === edit && <ReviewForm
            text={updatedText}
            setText={setUpdatedText}
            rating={updatedRating}
            setRating={setUpdatedRating}
          />}
          {(isLoggedIn() && userInfo && userInfo.username === review.user.username) && <button onClick={handleEdit} value={review._id}>Submit</button>}
        </div>
      })}
    </section>

    <ReviewForm
      text={text}
      setText={setText}
      rating={rating}
      setRating={setRating}
    />

    <div className="button">
      <button onClick={handleComment} className="button is-info">Submit</button>

    </div>
    <h2>Similar Movies</h2>

    <div className="similarMovieList">
      {similarMovieData && similarMovieData.map((result, index) => {
        return <div key={index}>
          {/* <a href="javascript:window.location.reload(true)"> */}
          <Link to={`/movie/${result.title}/${result.id}`}>
            <img className="similarMovieItem" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
          </Link>
        </div>
      })}
    </div>
  </>
}


export default SingleMovie
