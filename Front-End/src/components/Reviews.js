import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { UserContext } from '../UserContext'


const Reviews = () => {
  const [reviews, setReviewData] = useState([])

  const [filterReviews, setFilterReviews] = useState([])



  useEffect(() => {
    axios.get('/api/reviews')
      .then(review => {
        console.log(review)
        setReviewData(review.data)
        setFilterReviews(review.data)
        console.log(reviews)
      })
  }, [])


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




  return <section className="reviewsPage">
    <h1 className="reviewsPageTitle"> Reviews </h1>
    <nav className="reviewsPageSortMenu">
      {/* <h2 className="reviewsPageSortButton">Sort Reviews</h2> */}
      <select onChange={handleSort} className="reviewsPageSelectBar">
        <option value="highToLow" className="reviewsPageOption"> Highest to Lowest</option>
        <option value="lowToHigh" className="reviewsPageOption"> Lowest to Highest</option>
        <option value="oldest" className="reviewsPageOption"> Oldest </option>
        <option value="most-recent" className="reviewsPageOption"> Most Recent </option>
      </select>

    </nav>

    <main>
      <div className="reviewsPageReviews">
        {filterReviews.map((review, index) => {
          return <div key={index} className="reviewsPageSingleReview">
            {(review.film) && <Link to={`/movie/${review.film.original_title}/${review.film.id}`}>
              {/* {(review.film) && <h2 className="reviewsPageReviewh3" id="reviewPageFilmInfo"> {review.film.original_title}</h2>} */}
              {(review.film) && <img className="reviewsPageFilmPoster" id="reviewPageFilmInfo" src={`https://image.tmdb.org/t/p/w500/${review.film.poster_path}`} />}
            </Link>}
            <div className="reviewsPageBody">
              <div className="reviewsPageImportant">
                <h3 className="reviewsPageReviewh3" id="reviewsPageText"> “{review.text}” </h3>
                {/* <h3 className="reviewsPageReviewh3"> ★  {review.rating}</h3> */}
               <span> {[...Array(review.rating)].map((e, i) => {
              return <span key={i} className="reviewsPageReviewh3" id="singleMovieStars">★</span>
            })} </span>
              </div>
              <h3 className="reviewsPageReviewh3" id="reviewsPageUserName"> 👤 {review.user.username}, {moment(review.updatedAt).fromNow()}</h3>
              {/* <h3 className="reviewsPageReviewh3" id="reviewsPageTime"> ⌚ {moment(review.updatedAt).fromNow()}</h3> */}
            </div>
          </div>
        })}

      </div>
    </main>


  </section>

}

export default Reviews

