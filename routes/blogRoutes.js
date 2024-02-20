const express = require('express');
const router = express.Router();
const Blog = require('./../backend/models/blog.js');

// blog-related request handlers/routes

router.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => console.log(err));
});

router.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Blog'});
});

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/blogs'))
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
        res.json({ redirect: '/blogs' })
    })
    .catch((err) => console.log(err));
});

module.exports = router;