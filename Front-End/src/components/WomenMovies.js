import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()


const WomenMovies = (props) => {

  const API_KEY = process.env.MOVIE_KEY

  const [movies, setMovies] = useState([])


  const womenList = (() => {
    axios.get(`https://api.themoviedb.org/3/list/5233088?api_key=${API_KEY}&language=en-US&page=1`)
      .then(movie => {
        setMovies(movie.data.items)
      })
  })

  useEffect(() => {
    womenList()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleScroll(event) {
    // new piece of state to reveal animation, true/false once past certain distance 
    console.log('scrolled!')
  }


  return <>
    <section className="women-section">
      <h1 className="tracking-in-expand">AWARD-WINNING FILMS MADE BY WOMEN</h1>

      <div className="women-movie-container">

        {movies.map((movie, index) => {
          return <>
            <div className="women-poster-container" data-aos="flip-left" aos-duration="600" key={index}>
              <Link to={`/movie/${movie.title}/${movie.id}`}>
                <div>
                  <img className="women-movie-poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie-poster" />
                </div>
              </Link>
              <div className="bio-container" data-aos="new-animation">
                <p><span>RELEASE DATE:</span><br/>{`${movie.release_date}`}</p>
                <p><span>OVERVIEW:</span> <br/>{`${movie.overview}`}</p>
              </div>


            </div>
          </>
        })}
      </div>
    </section>
  </>

}

export default WomenMovies