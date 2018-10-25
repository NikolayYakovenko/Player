const path = require('path');
const express = require('express');
const morgan = require('morgan');
const request = require('request');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;
const SEARCH_URL = 'https://itunes.apple.com/search';

// Enable gzip compression
app.use(compression());

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'dist')));

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/search', (req, res) => {
    const params = req.query;
    const url = `${SEARCH_URL}?term=${params.term}&limit=${params.limit}`;

    request(
        url,
        { json: true },
        (error, response, body) => {
            if (error) {
                res.json({ error });
            }
            res.json(body);
        }
    );
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Listening on port %s. Open http://localhost:%s/', port, port);
});
