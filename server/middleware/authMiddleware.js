import jwt from 'jsonwebtoken'
import {authConfig} from '../config'

export const loadUser = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  // decode token
  if (token) {
    // verifies secret
    jwt.verify(token, authConfig.jwtSecret, function(err, decoded) {
      if (err) {
        req.user = null
      } else {
        // store the user in req for other routes!
        req.user = decoded
      }
      return next()
    })
  } else {
    req.user = null
    return next()
  }
}

export const isLoggedIn = (req, res, next) => {
  if(!req.user){
    return res.status(401).json({
        success: false,
        message: 'You need to login at first!'
    });
  }
  return next()
}
