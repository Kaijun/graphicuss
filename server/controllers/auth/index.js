import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { authConfig } from '../../config'

// process the login form
export const login = (req, res, next) => {
  // fetch()
  console.log('heheheh')
  passport.authenticate('login', function (err, user, info) {
    if(user){
      // if user is found and password is right
      let u = {...user, password: undefined}
      // create a token
      let token = jwt.sign(u, authConfig.jwtSecret, {
        expiresIn: authConfig.expiresIn
      })
      res.cookie('token', token, { maxAge: authConfig.expiresIn, httpOnly: false });
      res.json(u)
    }
    else{
      res.status(404).json({message: info.message})
    }
  })(req, res, next)
}

// process the signup form
export const signup = (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    if(user){
      let u = {...user, password: undefined}
      let token = jwt.sign(u, authConfig.jwtSecret, {
        expiresIn: authConfig.expiresIn
      })
      res.cookie('token', token, { maxAge: authConfig.expiresIn, httpOnly: false })
      res.json(u)
    }
    else{
      res.status(404).json({message: info.message})
    }
  })(req, res, next)
}


export const logout = function(req, res) {
  res.cookie('token', '');
  res.send({message: 'You are successfully logged out.'})
}

// LOGOUT ==============================
export const isLoggedIn = (req, res) => {
  res.json(req.user);
}
