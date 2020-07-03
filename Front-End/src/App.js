import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Reviews from './components/Reviews'
import Login from './components/Login'
import Register from './components/Register'
// import Favourites from './src/components/Favourites'
import SingleMovie from './components/SingleMovie'


import './styles/style.scss'

const App = () => {
  return <HashRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/reviews" component={Reviews} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      {/* <Route path="/movies/:id" component={SingleMovie} />
      <Route path="/favourites" component={Favourites} /> */}
      <Route path='/movie/:name/:id' component={SingleMovie} />
    </Switch>
  </HashRouter>
}

export default App
