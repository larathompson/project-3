import React, { useEffect, useState } from 'react'
// import { ProgressPlugin } from 'webpack'
import axios from 'axios'

const [search, setSearch] = useState('')

const HomePage = () => {

  const API_KEY = '089c839eda3ed1ce04045e0b371dedeb'
  
  // const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
  }, [query])

  const getMovies = (() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false
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
    setQuery(search)
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
      <div className="movie">
        {movies.map((result, index) => {
          console.log(result)
          return <div key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}/>
  
          </div>
        })}
      </div>
    </section>
  </>

}

module.exports = { search }
export default HomePage