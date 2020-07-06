import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const WomenMovies = (props) => {

  const API_KEY = '089c839eda3ed1ce04045e0b371dedeb'
  
  const [movies, setMovies] = useState([])


  const ourMovieList = (() => {
    axios.get(`https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`)
      .then(movie => {
        setMovies(movie.data.items)
      })
  })

  useEffect(() => {
    ourMovieList()
  }, [])

  return <>
    <section>
      <div className="carousel">
        <div className="carousel-images">
          {movies.map((result, index) => {
            console.log(result)
            return <div key={index}>
              <Link to={`/movie/${result.title}/${result.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>
  </>
}

export default WomenMovies