import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { isLoggedIn } from '../lib/auth'

const SingleMovie = (props) => {

  const [soundtrackData, updateSoundtrackData] = useState([])
  const [reviewData, updateReviewData] = useState([])
  const [movieData, updateMovieData] = useState({})
  const [similarMovieData, updateSimilarMovieData] = useState([])
  const [text, setText] = useState('')
  const [post, setPost] = useState({})

  const API_KEY = '089c839eda3ed1ce04045e0b371dedeb'

  useEffect(() => {
    const movieName = props.match.params.name
    const filmId = props.match.params.id

    axios.get(`https://api.spotify.com/v1/search?q=${movieName}soundtrack&type=playlist`,
      {
        headers: { 'Authorization': 'Bearer BQCM-28M8WablkQHPMl7vnC2DrReFfHEATTU5nE357kv0QQhNaRd2FRDWma7cTCFGf_FQjHV4t5D_6OaOrg' }
      })

      .then(axiosResp => {
        console.log(axiosResp.data.playlists.items[0].id)
        updateSoundtrackData(axiosResp.data.playlists.items[0].id)
      })

    axios.get(`api/movie/reviews/${filmId}`)
      .then(axiosResp => {
        console.log(axiosResp.data)
        updateReviewData(axiosResp.data)

      })

    axios.get(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}&language=en-US`)
      .then(axiosResp => {
        console.log(axiosResp.data)
        updateMovieData(axiosResp.data)
      })

    axios.get(`https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${API_KEY}&language=en-US`)
      .then(axiosResp => {
        console.log(axiosResp.data)
        updateSimilarMovieData(axiosResp.data.results)
      })

  }, [])


  //POSTING REVIEW PART
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


  return <section>

    <div>
      <img className="poster" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} />
      <p>{movieData.overview}</p>
    </div>

    <div>
      <iframe src={`https://open.spotify.com/embed/playlist/${soundtrackData}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>

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
        return <div  key={index}>
          <img className="similarMovieItem" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
        </div>
      })}
    </div>

  </section>





}

export default SingleMovie