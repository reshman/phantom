
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const authRouter = require('./src/routes/auth.route');
const itemRouter = require('./src/routes/item.route');
const twilioRouter = require('./src/routes/twilio.route');
const pdfConverterRouter = require('./src/routes/pdf-converter.route');
const errorHandler = require('./src/middleware/error-handler');
const FacebookStrategy = require('passport-facebook-token');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./src/model/user.model')


mongoose.connect("mongodb://localhost:27017/phantom", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
  console.log("err", err)
})

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, '/public/uploads')))

app.set('views', path.join(__dirname, '/public/templates'));
app.set('view-engine', 'ejs')

app.use('/auth', authRouter);
app.use('/item', itemRouter);
app.use('/twilio', twilioRouter);
app.use('/convert', pdfConverterRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/item', (req, res) => {
  res.render('razorpay.ejs')
});

app.use(passport.initialize());
passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
},
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        const newUser = new User({ facebookId: profile.id, name: profile.displayName, email: profile._json.email });
        await newUser.save()
        cb(null, newUser);
      } else {
        cb(null, user);
      }
      
    } catch (e) {
      cb(e);
    }
    
  }
));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook-token', { session: false }),
  async function(req, res) {
    try {
      if (req.user) {
        const token = jwt.sign({ userId: req.user.facebookId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
          res.status(401).json({ message: 'Facebook authentication failed' });
      }
    } catch(e) {
      console.log("error")
      console.log(e)
    }

  });




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
