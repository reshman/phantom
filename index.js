
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


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, '/public/uploads')))

app.set('views', path.join(__dirname, '/public/templates'));
app.set('view-engine', 'ejs')

app.use('/auth', authRouter);
app.use('/item', itemRouter);
app.use('/twilio', twilioRouter);
app.use('/convert', pdfConverterRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/item', (req, res) => {
  res.render('razorpay.ejs')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
