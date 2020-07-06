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
        console.log(review.data)
      })
  }, [])



  function handleSort(event) {
    console.log(event.target.value)
    const data = filterReviews
    if (event.target.value === 'oldest') {
      console.log('olddddd')
      const old = data.slice().sort((a, b) => a.createdAt - b.createdAt)
      setFilterReviews(old)
    } if (event.target.value === 'most-recent') {
      console.log('newwww')
      const recent = data.slice().sort((a, b) => b.createdAt - a.createdAt)
      setFilterReviews(recent)
    } if (event.target.value === 'lowToHigh') {
      console.log('lowww')
      const low = data.slice().sort((a, b) => a.rating - b.rating)
      setFilterReviews(low)
      console.log(low)
    } if (event.target.value === 'highToLow') {
      console.log('hioghhh')
      const high = data.slice().sort((a, b) => b.rating - a.rating)
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

            <h3> {review.user.username}</h3>
            <h3> {review.text}</h3>
            <h3> {review.rating}</h3>
        <h3>{review.createdAt}</h3>
            {/* <h3> {moment.format('review.createdAt')} </h3> */}
          </div>
        })}

      </div>
    </main>


  </section>

}

export default Reviews