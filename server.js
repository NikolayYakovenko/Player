/* eslint-disable */
var path = require('path');
var express = require('express');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Listening on port %s. Open http://localhost:%s/', port, port);
});
