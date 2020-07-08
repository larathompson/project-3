import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
// import { movieData } from './singleMovie'
import { UserContext } from '../UserContext'


const Reviews = () => {
  const [reviews, setReviewData] = useState([])

  const [filterReviews, setFilterReviews] = useState([])

  // const [movieData, setMovieData] = useState([])

  // const [filmInfo, updatefilmInfo] = useState([])
  // const API_KEY = process.env.MOVIE_KEY


  useEffect(() => {
    axios.get('/api/reviews')
      .then(review => {
        console.log(review)
        setReviewData(review.data)
        setFilterReviews(review.data)
      })

    // //added in from here 
    // axios.get(`https://api.themoviedb.org/3/movie/${filterReviews.filmId}/similar?api_key=${API_KEY}&language=en-US`)
    //   .then(axiosResp => {
    //     console.log(axiosResp)
    //     updatefilmInfo(axiosResp.data.results)
    //   })
  }, [])


  // function getFilmInfo() {
  //   filterReviews.map((review, index) => {
  //     axios.get(`https://api.themoviedb.org/3/movie/${review.filmId}/?api_key=${API_KEY}&language=en-US`)
  //       .then(axiosResp => {
  //         console.log(axiosResp)
  //         updatefilmInfo(axiosResp.data.results)
  //       })
  //   })
  // }



  function handleSort(event) {
    console.log(filterReviews)
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




  return <section className='reviewsPage'>
    <h1 className='reviewsTitle'> Reviews </h1>
    <nav className='sortMenu'>
      <h2 className='sortButton'>Sort Reviews</h2>
      <select onChange={handleSort} className='selectBar'>
        <option value="highToLow" className='option'> Highest to Lowest</option>
        <option value="lowToHigh" className='option'> Lowest to Highest</option>
        <option value="oldest" className='option'> Oldest </option>
        <option value="most-recent" className='option'> Most Recent </option>
      </select>

    </nav>

    <main>
      <div className='reviews'>
        {filterReviews.map((review, index) => {
          return <div key={index} className='singleReview'>

            <h3 className='reviewh3'> 👤 {review.user.username}</h3>
            <h3 className='reviewh3'> 💬{review.text}</h3>
            <h3 className='reviewh3'> ⭐ {review.rating}</h3>
            <h3 className='reviewh3'> ⏰{moment(review.updatedAt).fromNow()}</h3>

          </div>
        })}

      </div>
    </main>


  </section>

}

export default Reviews