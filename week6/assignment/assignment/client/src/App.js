import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import Home from './components/Home.js'
import IssueHS from './components/IssueHS.js'
import IssueFA from './components/IssueFA.js'

export default function App(){
  const { token, logout} = useContext(UserContext)
 
  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to="/home"/> : <Auth />}
        />
        <ProtectedRoute 
          path="/profile"
          component = {Profile}
          redirectTo = '/'
          token={token}
        />

        <ProtectedRoute 
          path="/home"
          component = {Home}
          redirectTo = '/'
          token={token}
        />

        <ProtectedRoute 
          path="/public"
          component = {Public}
          redirectTo = '/'
          token={token}
        />

        <ProtectedRoute 
          path="/issueHS"
          component = {IssueHS}
          redirectTo = '/'
          token={token}
          />
        
        <ProtectedRoute 
          path="/issueFA"
          component = {IssueFA}
          redirectTo = '/'
          token={token}
          />
      </Switch>
    </div>
  )
}