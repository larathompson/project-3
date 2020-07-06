import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Auth from '../lib/auth'
//! Is this needed?
import { isLoggedIn } from '../lib/auth'

const SingleMovie = (props) => {

  const { userInfo, setUserInfo } = useContext(UserContext)
  const [soundtrackData, setSoundtrackData] = useState({})
  const [added, setAdded] = useState(false)
  const [movieData, setMovieData] = useState([])
  const [reviewData, updateReviewData] = useState([])
  const [similarMovieData, updateSimilarMovieData] = useState([])
  const [text, setText] = useState('')
  // const [post, setPost] = useState({})

  //! Returning single movie data

  useEffect(() => {
    const movieName = props.match.params.name
    const filmId = props.match.params.id
    const API_KEY = '089c839eda3ed1ce04045e0b371dedeb'

    axios.get(`https://api.spotify.com/v1/search?q=${movieName}soundtrack&type=playlist`,
      {
        headers: { 'Authorization': 'Bearer BQCwNx0aIOoGFcUNFiDqK2ZwizazjvhHJZhIYUI2A6QkUrqWzTfKukdKDsU4bgKcjBJJPGWqlhQJt0gnB6w' }
      })
      .then(axiosResp => {
        console.log(axiosResp)
        setSoundtrackData(axiosResp.data.playlists.items[0].id)
      })
      .catch(err => console.log(err))

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=1&include_adult=false
      `)
      .then(axiosResp => {
        setMovieData(axiosResp.data.results[0])
        if (userInfo) {
          const haveAdded = userInfo.favouriteMovies.some((rest) => {
            return rest._id === axiosResp.data.results[0]._id
          })
          setAdded(haveAdded)
        }
      })
      .catch(err => console.log(err))

    axios.get(`api/movie/reviews/${filmId}`)
      .then(axiosResp => {
        console.log(axiosResp.data)
        updateReviewData(axiosResp.data)

      })

    axios.get(`https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${API_KEY}&language=en-US`)
      .then(axiosResp => {
        console.log(axiosResp.data)
        updateSimilarMovieData(axiosResp.data.results)
      })


  }, [userInfo])

  //! Pushing single movie to favourites(profile) page

  const favourite = () => {
    const update = userInfo.favouriteMovies
    //! is undefined, so can't push...
    // console.log(update)
    update.push(movieData)
    axios.post('/api/favourites', { title: movieData.title }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setUserInfo(res.data.user)
      })
      .catch(err => {
        props.history.push('/login')
        console.log(err)
      })
  }

  function handleComment(filmId) {
    console.log(filmId)

    const token = localStorage.getItem('token')
    console.log(text)
    axios.post(`api/movie/reviews/${filmId}`, { text: text, filmId: props.match.params.id, rating: 3 }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((axiosResponse) => {
        setText('')
        const reviews = [...reviewData]
        reviews.push(axiosResponse.data)
        console.log(reviews)
        updateReviewData(reviews)
      })
  }

  //! Returning soundtrack and single movie data on page

  return <>
    <section>
      {console.log('Hello', userInfo)}
      <div>
        <iframe src={`https://open.spotify.com/embed/playlist/${soundtrackData}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div>
        <h1>{movieData.title} </h1>
        <img src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} />
      </div>
      {/* <pre>{JSON.stringify(user), null, 2}</pre> */}
      <button onClick={favourite}>Favourite ❤️</button>
    </section>
    <section className='reviews'>
      {reviewData.map((review, index) => {
        return <div key={index} className='singleReview'>
          <h1>{review.user.username}</h1>
          <p> {review.text}</p>
          <p>{review.createdAt} </p>
        </div>
      })}
    </section>


    <section className='postReview'>
      <textarea
        className="textarea"
        placeholder="Add a comment..."
        onChange={(event) => setText(event.target.value)}
        value={text}
      >

        {console.log(text)}
      </textarea>
      <div className="button">
        <button onClick={handleComment} className="button is-info">Submit</button>
      </div>
    </section>


    <h2>Similar Movies</h2>

    <div className="similarMovieList">
      {similarMovieData.map((result, index) => {
        return <div key={index}>
          <Link to={`/movie/${result.title}/${result.id}`}>
            <img className="similarMovieItem" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
          </Link>
        </div>
      })}
    </div>

  </>

}


export default SingleMovie