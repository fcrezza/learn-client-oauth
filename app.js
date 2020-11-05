const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const reactViews = require('express-react-views');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

app.get('/', async (req, res) => {
  const {bearer} = req.cookies;

  if (bearer) {
    try {
      const resp = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${bearer}`
        }
      });
      res.render('index', {
        data: resp.data
      });
    } catch (err) {
      res.render('index', {
        error: err
      });
    }
    return;
  }

  res.render('index');
});

app.get('/login', (req, res) => {
  const {error} = req.query;

  res.render('login', {
    error: Number(error)
  });
});

app.get('/login/oauth', (req, res) => {
  if ('error' in req.query) {
    return res.redirect('/login?error=1');
  }

  const {code} = req.query;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      accept: 'application/json'
    }
  })
    .then(resp => {
      res.cookie('bearer', resp.data.access_token, {
        maxAge: 180000,
        httpOnly: true
      });
      res.redirect('/');
    })
    .catch(err => res.send('upsss something went wrong: ' + err));
});

app.get('/logout', (req, res) => {
  res.clearCookie('bearer', {
    httpOnly: true,
    maxAge: 180000
  });
  res.redirect('/');
});

module.exports = app;
