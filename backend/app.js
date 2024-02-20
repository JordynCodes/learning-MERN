// setting up app and db connection

const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');
const dbURI = require('./URI.js');

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', 'frontend');
mongoose.connect(dbURI.dbURI)
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// middleware

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

// req handlers

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => console.log(err));
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Blog'});
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/blogs'))
        .catch((err) => console.log(err));
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('singleBlog', {title: result.title, blog: result})
    })
    .catch((err) => console.log(err));
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});