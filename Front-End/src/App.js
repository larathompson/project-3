import React, { useState, useMemo } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import { UserContext } from './UserContext'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Favourites from './components/Favourites'
import Reviews from './components/Reviews'
import Login from './components/Login'
import Register from './components/Register'
import SingleMovie from './components/SingleMovie'
import Latest from './components/Latest'


import './styles/style.scss'


const App = () => {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  
  return <HashRouter>
    <NavBar />
    <Switch>
      <UserContext.Provider value={value}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/reviews" component={Reviews} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path='/movie/:name/:id' component={SingleMovie} />
        <Route path="/profile" component={Favourites} />
        <Route path="/latest" component={Latest} />
      </UserContext.Provider>
    </Switch>
  </HashRouter>
}

export default App
