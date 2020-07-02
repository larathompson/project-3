import React, { useEffect, useState } from 'react'
// import { ProgressPlugin } from 'webpack'
import axios from 'axios'

const HomePage = () => {

  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // getMovies()
  }, [query])

  // const getMovies = 


  const updateSearch = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    // 
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

    </section>
  </>

}

export default HomePage