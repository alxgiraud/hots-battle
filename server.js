var express = require('express');
var crawler = require('./crawler');
var scraper = require('./scraper');
var config = require('./config');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/api/match/random', function (req, res) {
    var options = config;
    
    var constants = {
        MIN_MATCH_ID: 68000000, //Currently the latest matchs (March 2016), must be updated if needed
        MAX_MATCH_ID: 68100000
    };

    function getPath(id) {
        return '/Player/MatchSummaryAjax?ReplayID=' + id;
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    options.path = getPath(randomIntFromInterval(constants.MIN_MATCH_ID, constants.MAX_MATCH_ID));

    function callbackCrawler(statusCode, result) {
        res.statusCode = statusCode;
        
        if (statusCode !== 200) {
            console.error('Error: ' + statusCode);
            console.error(result)
            console.error('Crawler failed, trying with another ID...');
            
            options.path = getPath(randomIntFromInterval(constants.MIN_MATCH_ID, constants.MAX_MATCH_ID));
            crawler.getHtml(options, callbackCrawler);
        } else {
            scraper.getJSON(result, function (json) {
                res.send(json);
            });
        }
    }

    crawler.getHtml(options, callbackCrawler);
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Running on port:' + port);
});
