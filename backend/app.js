// setting up app and db connection

const express = require('express');
const mongoose = require('mongoose');
const dbURI = require('./URI.js');
const blogRoutes = require('./routes/blogRoutes.js');

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', 'frontend');

mongoose.connect(dbURI.dbURI)
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// middleware

app.use('/frontend/public', express.static('frontend/public'));
app.use(express.urlencoded({ extended: true }));

// routes

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes

app.use(blogRoutes);

// 404 route

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});