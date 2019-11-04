const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 3302;

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://teamtrees.org/';

var Counter;
setInterval(function () {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            Counter = $('.counter').data("count");
            //disabled to stop spam
            //console.log(Counter);
        })
        .catch(console.error);
return Counter;
}, 5000);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    
        res.render('index', {
            Counter: Counter,
        });
});
app.get('/update', (req, res) => {
 res.send({data: Counter});
});

app.use(express.static(path.join(__dirname, 'docs')));
app.listen(`${port}`);

console.log(`Server up and ready!\nServer on port ${port}`);
console.log(`To access me go to https://localhost:${port}`);
