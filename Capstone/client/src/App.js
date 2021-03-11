import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Results from './components/Results.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import Home from './pages/Home.js'
import HateSpeech from './pages/HateSpeech.js'
export default function App(){
  const { token, logout} = useContext(UserContext)
 
  return (
    <div className="app">
      <Navbar/>
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to="/home"/> : <Auth />}
        />
        {/* <ProtectedRoute 
          path="/profile"
          component = {Public}
          redirectTo = '/'
          token={token}
        /> */}

        <ProtectedRoute 
          path="/home"
          component = {Home}
          redirectTo = '/'
          token={token}
        />

        <ProtectedRoute 
          path="/results"
          component = {Results}
          redirectTo = '/'
          token={token}
        />

        <ProtectedRoute 
          path="/hatespeech"
          component = {HateSpeech}
          redirectTo = '/'
          token={token}
          />
        
        {/* <ProtectedRoute 
          path="/issueFA"
          component = {IssueFA}
          redirectTo = '/'
          token={token}
          /> */}
      </Switch>
    </div>
  )
}