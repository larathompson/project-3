
import React from 'react'


const ReviewForm = ({ text, setText, rating, setRating }) => {
  return <section className='postReview'>
    <form>
      <div className="container">
        <label className="label">Text</label>
        <div className="control">
          <input
            name="text"
            className="input"
            onChange={(event) => setText(event.target.value)}
            type="text"
            placeholder="Review"
            value={text}
          />
        </div>
      </div>
      <div className="container">
        <label className="label">Rating</label>
        <div className="control">
          <input
            name="text"
            className="input"
            onChange={(event) => setRating(event.target.value)}
            type="number"
            placeholder="Review"
            value={rating}
          />
        </div>
      </div>
    </form>
  </section>
}

export default ReviewForm