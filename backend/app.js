const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', 'frontend');
app.listen(4000);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.status(404).render('404');
});