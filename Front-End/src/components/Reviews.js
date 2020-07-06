import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'


const Reviews = () => {
  const [reviews, setReviewData] = useState([])

  const [filterReviews, setFilterReviews] = useState([])


  useEffect(() => {
    axios.get('/api/reviews')
      .then(review => {
        setReviewData(review.data)
        setFilterReviews(review.data)
      
      })
  }, [])



  function handleSort(event) {
    console.log(event.target.value)
    const data = filterReviews.slice()
    if (event.target.value === 'oldest') {
      const old = data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
      setFilterReviews(old)
    } if (event.target.value === 'most-recent') {
      const recent = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      setFilterReviews(recent)
    } if (event.target.value === 'lowToHigh') {
      const low = data.sort((a, b) => a.rating - b.rating)
      setFilterReviews(low)
     
    } if (event.target.value === 'highToLow') {
      const high = data.sort((a, b) => b.rating - a.rating)
      setFilterReviews(high)
    }

  }
  return <section>
    <nav>
      Sort Reviews
    <select onChange={handleSort}>
        <option value="highToLow"> Highest to Lowest</option>
        <option value="lowToHigh"> Lowest to Highest</option>
        <option value="oldest"> Oldest </option>
        <option value="most-recent"> Most Recent </option>
      </select>

    </nav>

    <main>
      <div className='reviews'>
        {/* {console.log(reviews.user.username)} */}
        {filterReviews.map((review, index) => {
          return <div key={index} className='singleReview'>

            <h3> Username: {review.user.username}</h3>
            <h3> Review: {review.text}</h3>
            <h3> Rating: {review.rating}</h3>
            {/* <h3> {moment.format('review.createdAt')} </h3> */}
            <h3> Time: {moment(review.updatedAt).fromNow()}</h3>
          </div>
        })}

      </div>
    </main>


  </section>

}

export default Reviews