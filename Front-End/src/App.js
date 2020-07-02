import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

// import NavBar from './src/components/NavBar'
import HomePage from './components/HomePage'
// import SingleMovie from './src/components/SingleMovie'
// import Login from './src/components/Login'
// import Register from './src/components/Register'
// import Reviews from './src/components/Reviews'
// import Favourites from './src/components/Favourites'
import SingleMovie from './components/SingleMovie'


import './styles/style.scss'

const App = () => {
  return <HashRouter>
    {/* <NavBar /> */}
    <Switch>
      <Route exact path="/" component={HomePage} />
      {/* <Route path="/movies/:id" component={SingleMovie} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/favourites" component={Favourites} /> */}
      <Route path='/movie/:name/:id' component={SingleMovie} />
    </Switch>
  </HashRouter>
}

export default App
