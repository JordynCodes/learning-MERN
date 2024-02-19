const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', 'frontend');
app.listen(4000);

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