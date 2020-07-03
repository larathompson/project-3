import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SingleMovie = (props) => {

  const [soundtrackData, updateSoundtrackData] = useState([])
  const [reviewData, updateReviewData] = useState([])
  const [text, updateText] = useState('')

  useEffect(() => {
    const movieName = props.match.params.name
    const filmId = props.match.params.id

    axios.get(`https://api.spotify.com/v1/search?q=${movieName}soundtrack&type=playlist`,
      {
        headers: { 'Authorization': 'Bearer BQDQuY962_5WJ0ZSYv4FtelmeDZUntwzcVxKVoEJjcUml6RJ7OqRTu3XpQoMKeVQfASFyZUBVg8JOpbC1iM' }
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
  function handleComment(movieId) {
    // const token = localStorage.getItem('token')
    axios.post(`api/movie/reviews/${movieId}`)
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
        {text}
      </textarea>
      <div className="button">
        <button onClick={handleComment} className="button is-info">Submit</button>
      </div>
    </section>





  </section>

}

export default SingleMovie