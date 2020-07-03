import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  { isLoggedIn } from '../lib/auth'

const SingleMovie = (props) => {

  const [soundtrackData, updateSoundtrackData] = useState([])
  const [reviewData, updateReviewData] = useState([])
  const [text, setText] = useState('')
  const [post, setPost] = useState({})

  useEffect(() => {
    const movieName = props.match.params.name
    const filmId = props.match.params.id

    axios.get(`https://api.spotify.com/v1/search?q=${movieName}soundtrack&type=playlist`,
      {
        headers: { 'Authorization': 'Bearer BQDD-pWlaGV5OrXAnY6lPyewtDoV1OLHUnJiaYtiGkkuE8INhLnJtkLdyYrD0giXWOOncJcW0fx1PpVgH6w' }
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

  }, [])


  //POSTING REVIEW PART
  function handleComment(filmId) {
    console.log(filmId)
    
    const token = localStorage.getItem('token')
    console.log(text)
    axios.post(`api/movie/reviews/${filmId}`,  { text: text, filmId: props.match.params.id, rating: 3 } , {
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

  </section>

}

export default SingleMovie