import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Auth from '../lib/auth'


const Favourites = () => {
  const [movieData, setMovieData] = useState([])
  // const [info, setInfo] = useState({})

  const { userInfo, setUserInfo } = useContext(UserContext)
  { console.log(userInfo) }

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const newData = res.data
        setMovieData(newData)
      })
      .catch(error => console.log(error))
  }, [userInfo])



  const deleteFavourite = () => {
    // const filmId = userInfo.favouriteMovies.filter(movie => )
    console.log(filmId)
  }


  // const favourite = () => {
  //   const data = {
  //     filmId: movieData.id,
  //     title: movieData.title,
  //     poster: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
  //   }
  //   axios.post('/api/favourites', data, {
  //     headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //   })
  //     .then(res => {
  //       //! is returning the entire user - back end is giving the user
  //       //! remember to check what the data is returning/ is what you expect it to be
  //       setUserInfo(res.data)
  //       console.log('Hello', res.data)
  //     })
  //     .catch(err => {
  //       props.history.push('/login')
  //       console.log(err.response)
  //     })
  // }

  return <>
    <h1>Hello</h1>
    {movieData.userInfo && <h2>
      Welcome, {movieData.userInfo.username}!
    </h2>}
    {/* //! first time load page user info undefined, so need to make sure it exists. */}
    <div>{userInfo && userInfo.favouriteMovies.map((movie, index) => {
      return <div key={index}>
        <h1>{movie.title}</h1>
        <img src={movie.poster} />
        <button onClick={deleteFavourite}>Delete</button>
      </div>
    })}
    </div>
  </>


}

export default Favourites