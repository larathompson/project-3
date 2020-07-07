import React, { useState, useContext, useEffect } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import { UserContext } from './UserContext'

import Auth, { isLoggedIn } from './lib/auth'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Favourites from './components/Favourites'
import WomenMovies from './components/WomenMovies'
import Reviews from './components/Reviews'
import Login from './components/Login'
import Register from './components/Register'
import SingleMovie from './components/SingleMovie'
import Latest from './components/Latest'


import axios from 'axios'
import './styles/style.scss'



const App = () => {
  const [userInfo, setUserInfo] = useState(null)
  // const value = useContext(UserContext)
  // console.log(value)
  // const value = useMemo(() => ({ userInfo, setUserInfo }), [userInfo, setUserInfo])
  // console.log('This is the', value)
  useEffect(() => {
    if (isLoggedIn()) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(res => {
          setUserInfo(res.data)
        })
    }
  }, [])

  return <HashRouter>
    <NavBar />
    <Switch>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/reviews" component={Reviews} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path='/movie/:name/:id' component={SingleMovie} />
        <Route path="/profile" component={Favourites} />
        <Route path="/latest" component={Latest} />
        <Route path="/women" component={WomenMovies} />
      </UserContext.Provider>
    </Switch>
  </HashRouter>
}

export default App
