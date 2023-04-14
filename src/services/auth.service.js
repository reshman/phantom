

async function facebookAuthentication(){
  const passport = require('passport');
  const FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new FacebookStrategy({
    clientID: 'YOUR_APP_ID',
    clientSecret: 'YOUR_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
  }, (accessToken, refreshToken, profile, done) => {
    // This function will be called when a user successfully authenticates with Facebook.
    // You can add your own logic here to find or create a user in your database.

    // In this example, we'll just return the user's Facebook profile as is.
    return done(null, profile);
  }));
}

module.exports = {
  facebookAuthentication,
}