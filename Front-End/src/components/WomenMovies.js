import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const WomenMovies = (props) => {

  const API_KEY = process.env.MOVIE_KEY

  const [movies, setMovies] = useState([])


  const womenList = (() => {
    axios.get(`https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`)
      .then(movie => {
        console.log('movies:', movie.data.items)
        // const obj = movie.data.items
        // const entries = Object.entries(obj)
        // console.log(typeof(entries))
        setMovies(movie.data.items)
        
        
        
      })
  })



  useEffect(() => {
    womenList()
  }, [])

  return <>
    <section className="women-section">
      <h1 className="tracking-in-expand">AWARD-WINNING FILMS MADE BY WOMEN</h1>
      <div>
        {movies.map((movie, index) => {
          return <div key={index}>
            <Link to={`/movie/${movie.title}/${movie.id}`}>
              <img className="scale-in-hor-center" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            </Link>
          </div>
        })}
      </div>
    </section>
  </>

}

export default WomenMovies