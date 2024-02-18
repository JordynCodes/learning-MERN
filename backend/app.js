const express = require('express');
const path = require('path'); 

const app = express();
app.listen(4000);

const dir = path.join(__dirname, "../");

app.get('/', (req, res) =>{
    res.sendFile('./frontend/home.html', { root : dir });
});

app.get('/about', (req, res) =>{
    res.sendFile('./frontend/about.html', { root : dir });
});

app.use((req, res) => {
    res.status(404).sendFile('./frontend/404.html', { root : dir });

});