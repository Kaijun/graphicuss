// console.log(a)
import express from 'express'
import path from 'path'
import mongoose from  'mongoose'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import morgan from 'morgan'
//logger
import passportConf from './config/passport'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// import flash from 'connect-flash'
import session from 'express-session'
import historyApiFallback from 'express-history-api-fallback'
import {dbConfig} from './config/index'
import {apiRoutes, routes} from './config/routes'

const SERVER_PORT = 3001

const app = express()

// Log Middleware for all incoming requests
if(app.get('env') === 'development'){
  app.use(morgan('dev'))
}

//path: /dist/static
let rootPath = path.join(__dirname,'static')
app.use(express.static(rootPath))
// Setting Up historyApiFallback for un-tracking API URL. (this middleware is used for enabling History API of HTML5 within Single Page App)
app.use(historyApiFallback('index.html', {root: rootPath}))

//Setting up View Engine
app.set('view engine', 'ejs'); // set up ejs for templating

//Setting up Database
mongoose.connect(dbConfig.url); // connect to our database

// Set up middlewares
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })) // get information from html forms
app.use(bodyParser.json()) // get information from json request
// app.use(flash()) // get information from html forms

// Set up passport
app.use(session({
  secret: 'whenicanfinishitexactly?' ,
  cookie: { maxAge: Number.MAX_SAFE_INTEGER },
  resave: false,
  saveUninitialized: false
})); // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
passportConf(passport)

// Setting up Routers:
app.use(apiRoutes, routes)


// app.get('/api/test', (req, res) => {
//   res.send('The APIs works!')
// })

app.listen(SERVER_PORT, () => {
  console.log(`API Server listening on port ${SERVER_PORT}!`)
})

export default app
