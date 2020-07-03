import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

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

  // return <>
  //   <div className='reviews'>
  //     {reviews.map((review, index) => {
  //       return <div key={index} className='singleReview'>
  //         <h3> {review.user.username}</h3>
  //         <h3> {review.text}</h3>
  //         <h3> {review.rating}</h3>
  //       </div>
  //     })}
  //   </div>
  // </>


  function handleRatingSort(event) {
    //ascending
    console.log(event.target.value)
    const data = filterReviews
    if (event.target.value === 'lowToHigh') {
      data.sort((a, b) => a.rating - b.rating)
    } else if (event.target.value === 'highToLow') {
      data.sort((a, b) => b.rating - a.rating)
    }
    setFilterReviews(data)
  }

  function handleDateSort(event) {
    console.log(event.target.value)
  }

  return <section>
    <nav>
      rating
    <select onChange={handleRatingSort}>
        <option value="highToLow"> Highest to Lowest</option>
        <option value="lowToHigh"> Lowest to Highest</option>
      </select>
date added
    <select onChange={handleDateSort}>
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
          </div>
        })}

      </div>
    </main>


  </section>

}

export default Reviews