const express = require('express');
const router = express.Router();
const Blog = require('../models/blog.js');

// blog-related request handlers/routes

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('Index', {title: 'Home', blogs: result})
        })
        .catch((err) => console.log(err));
});

router.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Blog'});
});

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err));
});

router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('singleBlog', {title: result.title, blog: result})
    })
    .catch((err) => console.log(err));
});

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/' })
    })
    .catch((err) => console.log(err));
});

module.exports = router;