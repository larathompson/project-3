import React from 'react'
import { Switch, Route, HashRouter } from  'react-router'

import NavBar from './components/NavBar'
import HomePage from './componenets/Home'
import SingleMovie from './components/SingleMovie'
import Login from './components/Login'
import Register from './components/Register'
import Reviews from './components/Reviews'
import Favourites from './components/Favourites'

import './styles/style.scss'

const App = () => {
  return <HashRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies/:id" component={SingleMovie} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/favourites" component={Favourites} />
    </Switch>
  </HashRouter>
}

export default App
