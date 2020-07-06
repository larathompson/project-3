import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomePage = (props) => {

  const API_KEY = '089c839eda3ed1ce04045e0b371dedeb'

  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])


  const popularMovies = (() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(movie => {
        setMovies(movie.data.results)
      })
  })

  useEffect(() => {
    popularMovies()
  }, [])

  const getMovies = (() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false
    `)
      .then(movie => {
        console.log(movie.data)
        setMovies(movie.data.results)
      })
  })

  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault()
    getMovies()
    setSearch('')
  }

  return <>
    <section className="home-container">
      <div className="hero-body">
        <form onSubmit={getSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="movieList">
        {movies.map((result, index) => {
          console.log(result)
          return <div key={index}>
            <Link to={`/movie/${result.title}/${result.id}`}>
              <img className="movieItem" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} />
            </Link>
          </div>
        })}
      </div>
    </section>
  </>
}

export default HomePage