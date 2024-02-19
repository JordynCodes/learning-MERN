const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', 'frontend');
const dbURI = 'mongodb+srv://codingwithjordyn:4qk2LnPqnug5u9OG@learning-mern.aqkcpuk.mongodb.net/learning-mern?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

app.use('/public', express.static('public'));

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about new blog',
        body: 'more about new blog'
    })

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Blog number 1', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
        {title: 'Blog number 2', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
        {title: 'Blog number 3', snippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'},
    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'}, );
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Blog'}, );
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404'}, );
});