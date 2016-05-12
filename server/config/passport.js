import {Strategy as LocalStrategy} from 'passport-local'

// load up the user model
import User from '../models/User';

// load the auth variables

const passportConf= (passport) => {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    console.log(id)
    User.findById(id, function(err, user) {
        console.log(user)
        done(err, user);
    });
  });


  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    (req, email, password, done) => {
      if (email)
        email = email.toLowerCase().trim(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

      // asynchronous
      process.nextTick(() => {
        User.findOne({ 'email' :  email }).select('+password').then((user) => {
          // if no user is found, return the message
          if (!user || !user.validPassword(password)){
              return done(null, false, {message: 'Username or password is not valid.'});
          }
          // all is well, return user
          else{
              user = user.toObject()
              req.user = user
              return done(null, user);
          }
        }, (err) => {
          console.log(err)
          if (err)
            return done(err)
        })
      })
    }))

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    (req, email, password, done) => {
      if (email)
        email = email.toLowerCase().trim(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

      // asynchronous
      process.nextTick(() => {
          // if the user is not already logged in:
        if (!req.user) {
          User.findOne({ 'email': email }).then((user) => {
            // check to see if theres already a user with that email
            if (user) {
              return done(null, false, {message: 'That email is already taken.'});
            } else {

                // create the user
                let newUser = new User();
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.username = req.body.username;
                console.log(newUser)
                newUser.save((err) => {
                  console.log(err)
                  if (err) return done(err);
                  newUser = newUser.toObject()
                  console.log(newUser)
                  req.user = newUser
                  return done(null, newUser);
                });
              }

            }, (err) => {
              if (err)
                return done(err)
            });
          // if the user is logged in but has no local account...
        } else if ( !req.user.email ) {
              // ...presumably they're trying to connect a local account
              // BUT let's check if the email used to connect a local account is being used by another user
              User.findOne({ 'email' :  email }).then((user) => {
                if (user) {
                  return done(null, false, {message: 'That email is already taken.'});
                      // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                } else {
                  useremail = email;
                  userpassword = user.generateHash(password);
                  user.save((err) =>{
                    if (err)
                      return done(err);
                    user = user.toObject()
                    req.user = user
                    return done(null,user);
                  });
                }
              }, (err) => {
                if (err)
                  return done(err);
              });
            } else {
              // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
              return done(null, req.user);
            }
          });
  }));

}

export default passportConf
