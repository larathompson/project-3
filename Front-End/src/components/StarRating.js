import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({ setRating, rating }) => {
  // const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        return <label key={i}>
          <input type="radio" name="rating" value={ratingValue}
            onClick={() => setRating(ratingValue)}

          />
          <FaStar className="star"
            color={ratingValue <= (hover || rating) ? '#ffc107 ' : '#e4e5e9'}
            size={20}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      })}
      {/* <p> The rating is: {rating} </p> */}

    </div>
  )

}

export default StarRating