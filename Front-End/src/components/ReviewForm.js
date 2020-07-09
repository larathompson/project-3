
import React from 'react'

import StarRating from './StarRating'


const ReviewForm = ({ text, setText, rating, setRating }) => {
  return <section className='postReview'>
    <form>
      <div className="container">
        <label className="review-label">Text</label>
        <div className="control">
          <input
            name="text"
            className="single-review-input"
            onChange={(event) => setText(event.target.value)}
            type="text"
            placeholder="Review"
            value={text}
          />
        </div>
      </div>


      <div className="container">
        <label className="review-label">Rating</label>
        <StarRating
          setRating={setRating}
          rating={rating}
        />
        {/* <div className="control">
          <input
            name="rating"
            //changed this
            min="1"
            max="5"
            className="input"
            onChange={(event) => setRating(event.target.value)}
            type="number"
            placeholder="Rating"
            value={rating}
          />
        </div> */}

      </div>

    </form>
  </section>
}

export default ReviewForm